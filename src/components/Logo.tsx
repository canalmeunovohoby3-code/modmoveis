import './Logo.css'

interface LogoProps {
  /** Versão reduzida, usada em espaços estreitos. */
  compact?: boolean
  className?: string
}

/** Marca da empresa. O nome acessível vem do `alt` da imagem. */
export function Logo({ compact = false, className }: LogoProps) {
  return (
    <a
      className={['logo', compact && 'logo--compact', className].filter(Boolean).join(' ')}
      href="#topo"
    >
      <img
        className="logo__img"
        src="/logo.svg"
        alt="M O D Móveis Planejados & Decoração"
        width={332}
        height={120}
        decoding="async"
      />
    </a>
  )
}
