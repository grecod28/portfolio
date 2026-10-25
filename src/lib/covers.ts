import type { ImageMetadata } from 'astro';
import umbrachat from '../assets/images/projects/umbrachat.png';
import knowmeet from '../assets/images/projects/knowmeet.png';
import k2 from '../assets/images/projects/k2.png';

/**
 * Capturas de los proyectos. La clave es el campo `cover` del frontmatter.
 * Los proyectos sin captura devuelven `undefined` y se muestra un TODO.
 */
const COVERS: Record<string, ImageMetadata> = {
	umbrachat,
	knowmeet,
	k2,
};

export function getCover(key: string): ImageMetadata | undefined {
	return key ? COVERS[key] : undefined;
}
