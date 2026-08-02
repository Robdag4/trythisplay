import { c as createComponent, m as maybeRenderHead, a as renderTemplate } from './astro/server_ukkwF2dm.mjs';
import 'piccolore';
import 'clsx';
import { S as SITE } from './BaseLayout_CkKY5QST.mjs';

const $$UpdatedBadge = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span class="inline-flex items-center gap-1.5 border border-brand-red/50 bg-brand-red/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-brand-red"> <span class="h-1.5 w-1.5 bg-brand-red" aria-hidden="true"></span>
Updated for ${SITE.maddenVersion} </span>`;
}, "/home/rob/.openclaw/workspace/trythisplay/src/components/ui/UpdatedBadge.astro", void 0);

export { $$UpdatedBadge as $ };
