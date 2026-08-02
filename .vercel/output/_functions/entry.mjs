import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_MH5wa1Yo.mjs';
import { manifest } from './manifest_t_veI2yx.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image/index.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/account.astro.mjs');
const _page3 = () => import('./pages/admin/creators.astro.mjs');
const _page4 = () => import('./pages/admin/orders.astro.mjs');
const _page5 = () => import('./pages/admin/products.astro.mjs');
const _page6 = () => import('./pages/admin/submissions/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/submissions.astro.mjs');
const _page8 = () => import('./pages/admin.astro.mjs');
const _page9 = () => import('./pages/api/auth/login.astro.mjs');
const _page10 = () => import('./pages/api/auth/logout.astro.mjs');
const _page11 = () => import('./pages/api/auth/oauth.astro.mjs');
const _page12 = () => import('./pages/api/checkout.astro.mjs');
const _page13 = () => import('./pages/api/creator/lessons/_lessonid_/draft-setup.astro.mjs');
const _page14 = () => import('./pages/api/creator/uploads.astro.mjs');
const _page15 = () => import('./pages/api/progress.astro.mjs');
const _page16 = () => import('./pages/api/webhooks/mux.astro.mjs');
const _page17 = () => import('./pages/api/webhooks/stripe.astro.mjs');
const _page18 = () => import('./pages/auth/callback.astro.mjs');
const _page19 = () => import('./pages/checkout/success.astro.mjs');
const _page20 = () => import('./pages/contact.astro.mjs');
const _page21 = () => import('./pages/creator/accept/_token_.astro.mjs');
const _page22 = () => import('./pages/creator/products/new.astro.mjs');
const _page23 = () => import('./pages/creator/products/_id_/lessons/_lessonid_.astro.mjs');
const _page24 = () => import('./pages/creator/products/_id_/lessons.astro.mjs');
const _page25 = () => import('./pages/creator/products/_id_/preview.astro.mjs');
const _page26 = () => import('./pages/creator/products/_id_/submit.astro.mjs');
const _page27 = () => import('./pages/creator/products/_id_.astro.mjs');
const _page28 = () => import('./pages/creator.astro.mjs');
const _page29 = () => import('./pages/creators/apply.astro.mjs');
const _page30 = () => import('./pages/creators/_slug_.astro.mjs');
const _page31 = () => import('./pages/creators.astro.mjs');
const _page32 = () => import('./pages/defense.astro.mjs');
const _page33 = () => import('./pages/ebooks/_slug_.astro.mjs');
const _page34 = () => import('./pages/ebooks.astro.mjs');
const _page35 = () => import('./pages/formations/_slug_.astro.mjs');
const _page36 = () => import('./pages/formations.astro.mjs');
const _page37 = () => import('./pages/franchise/competitive.astro.mjs');
const _page38 = () => import('./pages/franchise/simulation.astro.mjs');
const _page39 = () => import('./pages/franchise.astro.mjs');
const _page40 = () => import('./pages/guides/_slug_.astro.mjs');
const _page41 = () => import('./pages/guides.astro.mjs');
const _page42 = () => import('./pages/library/_slug_.astro.mjs');
const _page43 = () => import('./pages/library.astro.mjs');
const _page44 = () => import('./pages/login.astro.mjs');
const _page45 = () => import('./pages/offense.astro.mjs');
const _page46 = () => import('./pages/playbooks/_slug_.astro.mjs');
const _page47 = () => import('./pages/playbooks.astro.mjs');
const _page48 = () => import('./pages/team.astro.mjs');
const _page49 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/account/index.astro", _page2],
    ["src/pages/admin/creators/index.astro", _page3],
    ["src/pages/admin/orders/index.astro", _page4],
    ["src/pages/admin/products/index.astro", _page5],
    ["src/pages/admin/submissions/[id]/index.astro", _page6],
    ["src/pages/admin/submissions/index.astro", _page7],
    ["src/pages/admin/index.astro", _page8],
    ["src/pages/api/auth/login.ts", _page9],
    ["src/pages/api/auth/logout.ts", _page10],
    ["src/pages/api/auth/oauth.ts", _page11],
    ["src/pages/api/checkout.ts", _page12],
    ["src/pages/api/creator/lessons/[lessonId]/draft-setup.ts", _page13],
    ["src/pages/api/creator/uploads.ts", _page14],
    ["src/pages/api/progress.ts", _page15],
    ["src/pages/api/webhooks/mux.ts", _page16],
    ["src/pages/api/webhooks/stripe.ts", _page17],
    ["src/pages/auth/callback/index.ts", _page18],
    ["src/pages/checkout/success.astro", _page19],
    ["src/pages/contact/index.astro", _page20],
    ["src/pages/creator/accept/[token]/index.astro", _page21],
    ["src/pages/creator/products/new/index.astro", _page22],
    ["src/pages/creator/products/[id]/lessons/[lessonId]/index.astro", _page23],
    ["src/pages/creator/products/[id]/lessons/index.ts", _page24],
    ["src/pages/creator/products/[id]/preview/index.astro", _page25],
    ["src/pages/creator/products/[id]/submit/index.ts", _page26],
    ["src/pages/creator/products/[id]/index.astro", _page27],
    ["src/pages/creator/index.astro", _page28],
    ["src/pages/creators/apply/index.astro", _page29],
    ["src/pages/creators/[slug].astro", _page30],
    ["src/pages/creators/index.astro", _page31],
    ["src/pages/defense/index.astro", _page32],
    ["src/pages/ebooks/[slug].astro", _page33],
    ["src/pages/ebooks/index.astro", _page34],
    ["src/pages/formations/[slug].astro", _page35],
    ["src/pages/formations/index.astro", _page36],
    ["src/pages/franchise/competitive.astro", _page37],
    ["src/pages/franchise/simulation.astro", _page38],
    ["src/pages/franchise/index.astro", _page39],
    ["src/pages/guides/[slug].astro", _page40],
    ["src/pages/guides/index.astro", _page41],
    ["src/pages/library/[slug].astro", _page42],
    ["src/pages/library/index.astro", _page43],
    ["src/pages/login.astro", _page44],
    ["src/pages/offense/index.astro", _page45],
    ["src/pages/playbooks/[slug].astro", _page46],
    ["src/pages/playbooks/index.astro", _page47],
    ["src/pages/team/index.astro", _page48],
    ["src/pages/index.astro", _page49]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "9ba19f7f-b9d5-4f70-96b8-b9ebb71a6cd2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
