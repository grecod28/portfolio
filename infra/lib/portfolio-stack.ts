import { CfnOutput, Duration, Stack } from 'aws-cdk-lib';
import type { StackProps } from 'aws-cdk-lib';
import {
	CachePolicy,
	CacheCookieBehavior,
	CacheQueryStringBehavior,
	HeadersFrameOption,
	HeadersReferrerPolicy,
	ResponseHeadersPolicy,
	ViewerProtocolPolicy,
} from 'aws-cdk-lib/aws-cloudfront';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { AstroAWS } from '@astro-aws/constructs';
import type { Construct } from 'constructs';

const siteDomain = process.env.SITE_DOMAIN;
const certificateArn = process.env.CERTIFICATE_ARN;

const contentSecurityPolicy = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline'",
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data:",
	"font-src 'self'",
	"connect-src 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
	"base-uri 'self'",
	'upgrade-insecure-requests',
].join('; ');

export class PortfolioStack extends Stack {
	constructor(scope: Construct, id: string, props?: StackProps) {
		super(scope, id, props);

		const securityHeaders = new ResponseHeadersPolicy(this, 'SecurityHeaders', {
			securityHeadersBehavior: {
				contentSecurityPolicy: {
					contentSecurityPolicy,
					override: true,
				},
				strictTransportSecurity: {
					accessControlMaxAge: Duration.days(365),
					includeSubdomains: true,
					preload: true,
					override: true,
				},
				contentTypeOptions: { override: true },
				frameOptions: { frameOption: HeadersFrameOption.DENY, override: true },
				referrerPolicy: {
					referrerPolicy: HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
					override: true,
				},
			},
			customHeadersBehavior: {
				customHeaders: [
					{
						header: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=()',
						override: true,
					},
					{
						header: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
						override: true,
					},
				],
			},
		});

		const staticCache = new CachePolicy(this, 'StaticCache', {
			defaultTtl: Duration.days(1),
			minTtl: Duration.minutes(1),
			maxTtl: Duration.days(365),
			cookieBehavior: CacheCookieBehavior.none(),
			queryStringBehavior: CacheQueryStringBehavior.none(),
		});

		const site = new AstroAWS(this, 'Site', {
			outDir: process.env.SITE_DIST_DIR ?? 'dist',
			cdk: {
				cloudfrontDistribution: {
					...(siteDomain && certificateArn
						? {
								domainNames: [siteDomain],
								certificate: Certificate.fromCertificateArn(this, 'Certificate', certificateArn),
							}
						: {}),
					defaultBehavior: {
						cachePolicy: staticCache,
						responseHeadersPolicy: securityHeaders,
						viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
					},
				},
				lambdaFunction: {
					environment: {
						CONTACT_WEBHOOK_URL: process.env.CONTACT_WEBHOOK_URL ?? '',
					},
					memorySize: 512,
					timeout: Duration.seconds(15),
				},
			},
		});

		new CfnOutput(this, 'DistributionUrl', {
			value: `https://${site.cdk.cloudfrontDistribution.distributionDomainName}`,
			description: 'CloudFront URL',
		});

		if (siteDomain) {
			new CfnOutput(this, 'SiteUrl', {
				value: `https://${siteDomain}`,
				description: 'Custom domain URL',
			});
		}
	}
}
