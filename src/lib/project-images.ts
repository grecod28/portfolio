import type { ImageMetadata } from 'astro';
import umbrachat from '../assets/images/projects/umbrachat.png';
import knowmeet from '../assets/images/projects/knowmeet.png';
import k2 from '../assets/images/projects/k2.png';
import umbrachatArchitecture from '../assets/images/projects/umbrachat_arquitectura.png';

/**
 * Imágenes de los proyectos. La clave es el campo `cover` o `architecture`
 * del frontmatter.
 */
const COVERS: Record<string, ImageMetadata> = {
	umbrachat,
	knowmeet,
	k2,
};

const ARCHITECTURES: Record<string, ImageMetadata> = {
	umbrachat_arquitectura: umbrachatArchitecture,
};

export function getCover(key: string): ImageMetadata | undefined {
	return key ? COVERS[key] : undefined;
}

export function getArchitecture(key: string): ImageMetadata | undefined {
	return key ? ARCHITECTURES[key] : undefined;
}
