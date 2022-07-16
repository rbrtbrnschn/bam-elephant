import { useEffect } from "react";
import ReactTooltip from "react-tooltip";

/**
 * hook rebuilding `ReactTooltip` so it can graps `data-tip`s that have
 * been dynamically rendered after
 * the `ReactTooltip` has been built.
 */
export function useUpdatedTooltip() {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);
}
