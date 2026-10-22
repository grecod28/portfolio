import { App } from 'aws-cdk-lib';
import { PortfolioStack } from '../lib/portfolio-stack.js';

const app = new App();

new PortfolioStack(app, 'PortfolioStack', {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION ?? 'eu-west-1',
	},
});

app.synth();
