import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import type { MouseEvent } from "react";

type Props = {
  active: boolean;                   // estado (favorito o no)
  onToggle: () => void;              // callback al click
  size?: number;                     // tamaño del ícono (px)
  className?: string;                // clases extra para el <button>
  stopPropagation?: boolean;         // true si quieres evitar clicks del padre (listas clickeables)
  ariaLabelOn?: string;              // a11y label cuando está activo
  ariaLabelOff?: string;             // a11y label cuando está inactivo
};

export default function FavoriteButton({
  active,
  onToggle,
  size = 24,
  className = "btn btn-ghost btn-circle",
  stopPropagation = false,
  ariaLabelOn = "Quitar de favoritos",
  ariaLabelOff = "Agregar a favoritos",
}: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (stopPropagation) e.stopPropagation();
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      aria-pressed={active}
      aria-label={active ? ariaLabelOn : ariaLabelOff}
      title={active ? ariaLabelOn : ariaLabelOff}
    >
      {active ? (
        <StarSolid style={{ width: size, height: size }} className="text-yellow-500" />
      ) : (
        <StarOutline style={{ width: size, height: size }} className="text-gray-500" />
      )}
    </button>
  );
}