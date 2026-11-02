import { i as __toESM } from "./rolldown-runtime-DbVrKiKs.js";
import { t as require_react } from "./react-eZXm9bZy.js";
import { t as require_react_dom } from "./react-dom-CVQvCoTz.js";
import { t as require_jsx_runtime } from "./jsx-runtime-hYFZm98l.js";
import { $t as $23f2114a1b82827e$export$4282f70798064fe0, Bt as $390e54f620492c70$export$f680877a34711e37, Ct as $caaf0dd3060ed57c$export$9a302a45f65d0572, D as SlotProvider, F as classNames, It as $bbaa08b3cd72f041$export$9d1611c77c2fe928, J as tokenSchema, L as css, M as FocusRing, Mt as $48a7d519b337145d$export$4eaf04e54aa8eed6, Nt as $1969ac565cfec8d0$export$de79e2c695e052f3, Pt as $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7, Qt as $a4e76a5424781910$export$e08e3b67e392101e, St as $caaf0dd3060ed57c$export$95185d699e05d4d7, Ut as $c4867b2f328c2698$export$e5c5a5f917a5871c, Xt as $2add3ce32c6007eb$export$e1865c3bedcd822b, Y as transition, Z as useIsMobileDevice, Zt as $2add3ce32c6007eb$export$fedb369cb70207f1, an as $d447af545b77c9f1$export$f21a1ffae260145a, en as $23f2114a1b82827e$export$b4f377a2b6254582, et as useStyleProps, gt as $8f5a2122b0992be3$export$8397ddfc504fdb9a, h as isReactText, ht as $8f5a2122b0992be3$export$630ff653c5ada6a9, in as $d447af545b77c9f1$export$b204af158042fbac, j as ClassList, jt as $3b8b240c1bf84ab9$export$bebd5a1431fec25d, k as forwardRefWithAs, mt as $8e9d2fae0ecb9001$export$457c3d6518dd4c6f, nn as $23f2114a1b82827e$export$e58f029f0fbfdb29, nt as $2c9edc598a03d523$export$420e68273165f4ec, o as Text, on as c, ot as assert, q as toDataAttributes, tn as $23f2114a1b82827e$export$cd4e5573fbe2b576, tt as $0c4a58759813079a$export$4e328f61c538687f, vt as $8f5a2122b0992be3$export$b9b3dfddab17db27, w as ClearSlots, xt as $caaf0dd3060ed57c$export$7e924b3091a3bd18, y as usePrevious, zt as $390e54f620492c70$export$b4cc09c592e8fdb8 } from "./keystar-ui-typography-C-wQCOMj.js";
import { At as $e8ac3c3f5d4bae7f$export$d6875122194c7b44, C as FieldPrimitive, Ct as $f282e36c29c025e8$export$f9d5c8beee7d008d, D as Divider, Ft as $58196c8d6a1f38fc$export$1c3ebcada18427bf, H as useFieldButton, It as $a46cf152bb926da5$export$a9b970dcc4ae71a9, K as ProgressCircle, Mt as $600b3cf69ae46262$export$90fc3a17d93f704c, Nt as $fe16bffc7a557bf0$export$7f54fc3180508a52, O as Flex, Ot as $121970af65029459$export$f8aeda7b10753fa1, Pt as $901761b40e390936$export$2bb74740c4e19def, R as ClearButton, St as $f192c2f16961cbe0$export$80f3e147d781571c, W as Icon, X as $e969f22b6713ca4a$export$ae780daf29e6d456, Z as $ac4318a9c075bb9f$export$ea18c227d4417cc3, _t as $0beb20c9744a2065$export$8467354a121f1b9f, a as validateTextFieldProps, at as $0d47b37c475c5231$export$3351871ee4b288b8, bt as $535772f9d2c1f38d$export$2d6ec8fc375ceafa, et as useProvider, f as Tray, gt as $191c9b6d48a0a4e2$export$294aa081a6c6f55d, i as TextFieldPrimitive, it as $970072cf4b13fde3$export$683480f191c0e3ea, jt as $3274bf1495747a7b$export$5add1d006293d136, kt as $cf2482eff2eeeec2$export$f12b703ca79dfbb1, lt as $fd2148440a13ec26$export$fc1a364ae1f3ff10, m as $081058010ef8962e$export$2317d149ed6f78c4, mt as $03e8ab2d84d7657a$export$4338b53315abf666, ot as $054f71d2330da2e3$export$712718f7aec83d5, rt as $f11fb0bcf1b2687a$export$61c6a8c84e605fb6, st as $fd2148440a13ec26$export$a763b9476acd3eb, t as $13150e6629d46e45$export$d55e7ee900f34e93, tt as useProviderProps, u as Popover, ut as $3e6197669829fe11$export$40bfa8c7b0832715, v as chevronDownIcon, vt as $bb39c0fc1c19b34c$export$16792effe837dba3, wt as $d27d541f9569d26d$export$45712eceda6fad21, yt as $535772f9d2c1f38d$export$20e40289641fbbb6, z as FieldButton } from "./useDialog-DHBulEq_.js";
//#region node_modules/react-stately/dist/private/collections/Item.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function $05678f3aee5e7d1a$var$Item(props) {
	return null;
}
$05678f3aee5e7d1a$var$Item.getCollectionNode = function* getCollectionNode(props, context) {
	let { childItems, title, children } = props;
	let rendered = props.title || props.children;
	let textValue = props.textValue || (typeof rendered === "string" ? rendered : "") || props["aria-label"] || "";
	if (!textValue && !context?.suppressTextValueWarning && true) console.warn("<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop.");
	yield {
		type: "item",
		props,
		rendered,
		textValue,
		"aria-label": props["aria-label"],
		hasChildNodes: $05678f3aee5e7d1a$var$hasChildItems(props),
		*childNodes() {
			if (childItems) for (let child of childItems) yield {
				type: "item",
				value: child
			};
			else if (title) {
				let items = [];
				import_react.Children.forEach(children, (child) => {
					items.push({
						type: "item",
						element: child
					});
				});
				yield* items;
			}
		}
	};
};
function $05678f3aee5e7d1a$var$hasChildItems(props) {
	if (props.hasChildItems != null) return props.hasChildItems;
	if (props.childItems) return true;
	if (props.title && import_react.Children.count(props.children) > 0) return true;
	return false;
}
var $05678f3aee5e7d1a$export$6d08773d2e66f8f2 = $05678f3aee5e7d1a$var$Item;
//#endregion
//#region node_modules/react-stately/dist/private/collections/Section.mjs
function $246727c32dbcf285$var$Section(props) {
	return null;
}
$246727c32dbcf285$var$Section.getCollectionNode = function* getCollectionNode(props) {
	let { children, title, items } = props;
	yield {
		type: "section",
		props,
		hasChildNodes: true,
		rendered: title,
		"aria-label": props["aria-label"],
		*childNodes() {
			if (typeof children === "function") {
				if (!items) throw new Error("props.children was a function but props.items is missing");
				for (let item of items) yield {
					type: "item",
					value: item,
					renderer: children
				};
			} else {
				let items = [];
				import_react.Children.forEach(children, (child) => {
					items.push({
						type: "item",
						element: child
					});
				});
				yield* items;
			}
		}
	};
};
var $246727c32dbcf285$export$6e2c8f0811a474ce = $246727c32dbcf285$var$Section;
//#endregion
//#region node_modules/react-aria/dist/private/focus/virtualFocus.mjs
function $b72f3f7b3b5f42c6$export$76e4e37e5339496d(to) {
	let from = $b72f3f7b3b5f42c6$export$759df0d867455a91($d447af545b77c9f1$export$b204af158042fbac(to));
	if (from !== to) {
		if (from) $b72f3f7b3b5f42c6$export$6c5dc7e81d2cc29a(from, to);
		if (to) $b72f3f7b3b5f42c6$export$2b35b76d2e30e129(to, from);
	}
}
function $b72f3f7b3b5f42c6$export$6c5dc7e81d2cc29a(from, to) {
	from.dispatchEvent(new FocusEvent("blur", { relatedTarget: to }));
	from.dispatchEvent(new FocusEvent("focusout", {
		bubbles: true,
		relatedTarget: to
	}));
}
function $b72f3f7b3b5f42c6$export$2b35b76d2e30e129(to, from) {
	to.dispatchEvent(new FocusEvent("focus", { relatedTarget: from }));
	to.dispatchEvent(new FocusEvent("focusin", {
		bubbles: true,
		relatedTarget: from
	}));
}
function $b72f3f7b3b5f42c6$export$759df0d867455a91(document) {
	let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(document);
	let activeDescendant = activeElement?.getAttribute("aria-activedescendant");
	if (activeDescendant) return document.getElementById(activeDescendant) || activeElement;
	return activeElement;
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/utils.mjs
var $cd088b5c0d7b27b4$export$3585ede4d035bf14 = /* @__PURE__ */ new WeakMap();
function $cd088b5c0d7b27b4$var$normalizeKey(key) {
	if (typeof key === "string") return key.replace(/\s*/g, "");
	return "" + key;
}
function $cd088b5c0d7b27b4$export$9145995848b05025(state, itemKey) {
	let data = $cd088b5c0d7b27b4$export$3585ede4d035bf14.get(state);
	if (!data) throw new Error("Unknown list");
	return `${data.id}-option-${$cd088b5c0d7b27b4$var$normalizeKey(itemKey)}`;
}
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/ar-AE.mjs
var $44e96378ed9cec6d$exports = {};
$44e96378ed9cec6d$exports = {
	"buttonLabel": `\u{639}\u{631}\u{636} \u{627}\u{644}\u{645}\u{642}\u{62A}\u{631}\u{62D}\u{627}\u{62A}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{62E}\u{64A}\u{627}\u{631}`,
		other: () => `${formatter.number(args.optionCount)} \u{62E}\u{64A}\u{627}\u{631}\u{627}\u{62A}`
	})} \u{645}\u{62A}\u{627}\u{62D}\u{629}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{627}\u{644}\u{645}\u{62C}\u{645}\u{648}\u{639}\u{629} \u{627}\u{644}\u{645}\u{62F}\u{62E}\u{644}\u{629} ${args.groupTitle}, \u{645}\u{639} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{62E}\u{64A}\u{627}\u{631}`,
			other: () => `${formatter.number(args.groupCount)} \u{62E}\u{64A}\u{627}\u{631}\u{627}\u{62A}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{645}\u{62D}\u{62F}\u{62F}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{645}\u{642}\u{62A}\u{631}\u{62D}\u{627}\u{62A}`,
	"selectedAnnouncement": (args) => `${args.optionText}\u{60C} \u{645}\u{62D}\u{62F}\u{62F}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/bg-BG.mjs
var $4f2abbace6d15464$exports = {};
$4f2abbace6d15464$exports = {
	"buttonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{436}\u{438} \u{43F}\u{440}\u{435}\u{434}\u{43B}\u{43E}\u{436}\u{435}\u{43D}\u{438}\u{44F}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{43E}\u{43F}\u{446}\u{438}\u{44F}`,
		other: () => `${formatter.number(args.optionCount)} \u{43E}\u{43F}\u{446}\u{438}\u{438}`
	})} \u{43D}\u{430} \u{440}\u{430}\u{437}\u{43F}\u{43E}\u{43B}\u{43E}\u{436}\u{435}\u{43D}\u{438}\u{435}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{412}\u{44A}\u{432}\u{435}\u{434}\u{435}\u{43D}\u{430} \u{433}\u{440}\u{443}\u{43F}\u{430} ${args.groupTitle}, \u{441} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{43E}\u{43F}\u{446}\u{438}\u{44F}`,
			other: () => `${formatter.number(args.groupCount)} \u{43E}\u{43F}\u{446}\u{438}\u{438}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{41F}\u{440}\u{435}\u{434}\u{43B}\u{43E}\u{436}\u{435}\u{43D}\u{438}\u{44F}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{438}\u{437}\u{431}\u{440}\u{430}\u{43D}\u{438}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/cs-CZ.mjs
var $c1cf508a70425b11$exports = {};
$c1cf508a70425b11$exports = {
	"buttonLabel": `Zobrazit doporu\u{10D}en\xed`,
	"countAnnouncement": (args, formatter) => `K dispozici ${formatter.plural(args.optionCount, {
		one: () => `je ${formatter.number(args.optionCount)} mo\u{17E}nost`,
		other: () => `jsou/je ${formatter.number(args.optionCount)} mo\u{17E}nosti/-\xed`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Zadan\xe1 skupina \u{201E}${args.groupTitle}\u{201C} ${formatter.plural(args.groupCount, {
			one: () => `s ${formatter.number(args.groupCount)} mo\u{17E}nost\xed`,
			other: () => `se ${formatter.number(args.groupCount)} mo\u{17E}nostmi`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: ` (vybr\xe1no)`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `N\xe1vrhy`,
	"selectedAnnouncement": (args) => `${args.optionText}, vybr\xe1no`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/da-DK.mjs
var $c6334dc4bef16229$exports = {};
$c6334dc4bef16229$exports = {
	"buttonLabel": `Vis forslag`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} mulighed tilg\xe6ngelig`,
		other: () => `${formatter.number(args.optionCount)} muligheder tilg\xe6ngelige`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Angivet gruppe ${args.groupTitle}, med ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} mulighed`,
			other: () => `${formatter.number(args.groupCount)} muligheder`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, valgt`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Forslag`,
	"selectedAnnouncement": (args) => `${args.optionText}, valgt`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/de-DE.mjs
var $3c1f280212fbe3e1$exports = {};
$3c1f280212fbe3e1$exports = {
	"buttonLabel": `Empfehlungen anzeigen`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} Option`,
		other: () => `${formatter.number(args.optionCount)} Optionen`
	})} verf\xfcgbar.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Eingetretene Gruppe ${args.groupTitle}, mit ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} Option`,
			other: () => `${formatter.number(args.groupCount)} Optionen`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, ausgew\xe4hlt`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Empfehlungen`,
	"selectedAnnouncement": (args) => `${args.optionText}, ausgew\xe4hlt`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/el-GR.mjs
var $57ce5bfb234b266c$exports = {};
$57ce5bfb234b266c$exports = {
	"buttonLabel": `\u{3A0}\u{3C1}\u{3BF}\u{3B2}\u{3BF}\u{3BB}\u{3AE} \u{3C0}\u{3C1}\u{3BF}\u{3C4}\u{3AC}\u{3C3}\u{3B5}\u{3C9}\u{3BD}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AE}`,
		other: () => `${formatter.number(args.optionCount)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AD}\u{3C2} `
	})} \u{3B4}\u{3B9}\u{3B1}\u{3B8}\u{3AD}\u{3C3}\u{3B9}\u{3BC}\u{3B5}\u{3C2}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{395}\u{3B9}\u{3C3}\u{3B1}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3B7} \u{3BF}\u{3BC}\u{3AC}\u{3B4}\u{3B1} ${args.groupTitle}, \u{3BC}\u{3B5} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AE}`,
			other: () => `${formatter.number(args.groupCount)} \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3BF}\u{3B3}\u{3AD}\u{3C2}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3B5}\u{3B3}\u{3BC}\u{3AD}\u{3BD}\u{3BF}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{3A0}\u{3C1}\u{3BF}\u{3C4}\u{3AC}\u{3C3}\u{3B5}\u{3B9}\u{3C2}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{3B5}\u{3C0}\u{3B9}\u{3BB}\u{3AD}\u{3C7}\u{3B8}\u{3B7}\u{3BA}\u{3B5}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/en-US.mjs
var $2bdcc92d206ae897$exports = {};
$2bdcc92d206ae897$exports = {
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Entered group ${args.groupTitle}, with ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} option`,
			other: () => `${formatter.number(args.groupCount)} options`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, selected`,
		other: ``
	}, args.isSelected)}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} option`,
		other: () => `${formatter.number(args.optionCount)} options`
	})} available.`,
	"selectedAnnouncement": (args) => `${args.optionText}, selected`,
	"buttonLabel": `Show suggestions`,
	"listboxLabel": `Suggestions`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/es-ES.mjs
var $05b3b7ff042563de$exports = {};
$05b3b7ff042563de$exports = {
	"buttonLabel": `Mostrar sugerencias`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opci\xf3n`,
		other: () => `${formatter.number(args.optionCount)} opciones`
	})} disponible(s).`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Se ha unido al grupo ${args.groupTitle}, con ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opci\xf3n`,
			other: () => `${formatter.number(args.groupCount)} opciones`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, seleccionado`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Sugerencias`,
	"selectedAnnouncement": (args) => `${args.optionText}, seleccionado`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/et-EE.mjs
var $5ae036907590ca8d$exports = {};
$5ae036907590ca8d$exports = {
	"buttonLabel": `Kuva soovitused`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} valik`,
		other: () => `${formatter.number(args.optionCount)} valikud`
	})} saadaval.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Sisestatud r\xfchm ${args.groupTitle}, valikuga ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} valik`,
			other: () => `${formatter.number(args.groupCount)} valikud`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, valitud`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Soovitused`,
	"selectedAnnouncement": (args) => `${args.optionText}, valitud`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/fi-FI.mjs
var $f1b3c1991f38986b$exports = {};
$f1b3c1991f38986b$exports = {
	"buttonLabel": `N\xe4yt\xe4 ehdotukset`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} vaihtoehto`,
		other: () => `${formatter.number(args.optionCount)} vaihtoehdot`
	})} saatavilla.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Mentiin ryhm\xe4\xe4n ${args.groupTitle}, ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} vaihtoehdon`,
			other: () => `${formatter.number(args.groupCount)} vaihtoehdon`
		})} kanssa.`,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, valittu`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Ehdotukset`,
	"selectedAnnouncement": (args) => `${args.optionText}, valittu`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/fr-FR.mjs
var $7013cb8c11464d70$exports = {};
$7013cb8c11464d70$exports = {
	"buttonLabel": `Afficher les suggestions`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} option`,
		other: () => `${formatter.number(args.optionCount)} options`
	})} disponible(s).`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Groupe ${args.groupTitle} rejoint, avec ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} option`,
			other: () => `${formatter.number(args.groupCount)} options`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, s\xe9lectionn\xe9(s)`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Suggestions`,
	"selectedAnnouncement": (args) => `${args.optionText}, s\xe9lectionn\xe9`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/he-IL.mjs
var $072bbd14cdc5486c$exports = {};
$072bbd14cdc5486c$exports = {
	"buttonLabel": `\u{5D4}\u{5E6}\u{5D2} \u{5D4}\u{5E6}\u{5E2}\u{5D5}\u{5EA}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `\u{5D0}\u{5E4}\u{5E9}\u{5E8}\u{5D5}\u{5EA} ${formatter.number(args.optionCount)}`,
		other: () => `${formatter.number(args.optionCount)} \u{5D0}\u{5E4}\u{5E9}\u{5E8}\u{5D5}\u{5D9}\u{5D5}\u{5EA}`
	})} \u{5D1}\u{5DE}\u{5E6}\u{5D1} \u{5D6}\u{5DE}\u{5D9}\u{5DF}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{5E0}\u{5DB}\u{5E0}\u{5E1} \u{5DC}\u{5E7}\u{5D1}\u{5D5}\u{5E6}\u{5D4} ${args.groupTitle}, \u{5E2}\u{5DD} ${formatter.plural(args.groupCount, {
			one: () => `\u{5D0}\u{5E4}\u{5E9}\u{5E8}\u{5D5}\u{5EA} ${formatter.number(args.groupCount)}`,
			other: () => `${formatter.number(args.groupCount)} \u{5D0}\u{5E4}\u{5E9}\u{5E8}\u{5D5}\u{5D9}\u{5D5}\u{5EA}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{5E0}\u{5D1}\u{5D7}\u{5E8}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{5D4}\u{5E6}\u{5E2}\u{5D5}\u{5EA}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{5E0}\u{5D1}\u{5D7}\u{5E8}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/hr-HR.mjs
var $0f316c1985a6fee3$exports = {};
$0f316c1985a6fee3$exports = {
	"buttonLabel": `Prika\u{17E}i prijedloge`,
	"countAnnouncement": (args, formatter) => `Dostupno jo\u{161}: ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opcija`,
		other: () => `${formatter.number(args.optionCount)} opcije/a`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Unesena skupina ${args.groupTitle}, s ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opcijom`,
			other: () => `${formatter.number(args.groupCount)} opcije/a`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, odabranih`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Prijedlozi`,
	"selectedAnnouncement": (args) => `${args.optionText}, odabrano`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/hu-HU.mjs
var $ac61c1e7905e0d09$exports = {};
$ac61c1e7905e0d09$exports = {
	"buttonLabel": `Javaslatok megjelen\xedt\xe9se`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} lehet\u{151}s\xe9g`,
		other: () => `${formatter.number(args.optionCount)} lehet\u{151}s\xe9g`
	})} \xe1ll rendelkez\xe9sre.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Bel\xe9pett a(z) ${args.groupTitle} csoportba, amely ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} lehet\u{151}s\xe9get`,
			other: () => `${formatter.number(args.groupCount)} lehet\u{151}s\xe9get`
		})} tartalmaz. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, kijel\xf6lve`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Javaslatok`,
	"selectedAnnouncement": (args) => `${args.optionText}, kijel\xf6lve`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/it-IT.mjs
var $ecca75177af99ba0$exports = {};
$ecca75177af99ba0$exports = {
	"buttonLabel": `Mostra suggerimenti`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opzione disponibile`,
		other: () => `${formatter.number(args.optionCount)} opzioni disponibili`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Ingresso nel gruppo ${args.groupTitle}, con ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opzione`,
			other: () => `${formatter.number(args.groupCount)} opzioni`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, selezionato`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Suggerimenti`,
	"selectedAnnouncement": (args) => `${args.optionText}, selezionato`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/ja-JP.mjs
var $8160c4de84c67861$exports = {};
$8160c4de84c67861$exports = {
	"buttonLabel": `\u{5019}\u{88DC}\u{3092}\u{8868}\u{793A}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{500B}\u{306E}\u{30AA}\u{30D7}\u{30B7}\u{30E7}\u{30F3}`,
		other: () => `${formatter.number(args.optionCount)} \u{500B}\u{306E}\u{30AA}\u{30D7}\u{30B7}\u{30E7}\u{30F3}`
	})}\u{3092}\u{5229}\u{7528}\u{3067}\u{304D}\u{307E}\u{3059}\u{3002}`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{5165}\u{529B}\u{3055}\u{308C}\u{305F}\u{30B0}\u{30EB}\u{30FC}\u{30D7} ${args.groupTitle}\u{3001}${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{500B}\u{306E}\u{30AA}\u{30D7}\u{30B7}\u{30E7}\u{30F3}`,
			other: () => `${formatter.number(args.groupCount)} \u{500B}\u{306E}\u{30AA}\u{30D7}\u{30B7}\u{30E7}\u{30F3}`
		})}\u{3092}\u{542B}\u{3080}\u{3002}`,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `\u{3001}\u{9078}\u{629E}\u{6E08}\u{307F}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{5019}\u{88DC}`,
	"selectedAnnouncement": (args) => `${args.optionText}\u{3001}\u{9078}\u{629E}\u{6E08}\u{307F}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/ko-KR.mjs
var $1ef3deffd88c8b37$exports = {};
$1ef3deffd88c8b37$exports = {
	"buttonLabel": `\u{C81C}\u{C548} \u{C0AC}\u{D56D} \u{D45C}\u{C2DC}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)}\u{AC1C} \u{C635}\u{C158}`,
		other: () => `${formatter.number(args.optionCount)}\u{AC1C} \u{C635}\u{C158}`
	})}\u{C744} \u{C0AC}\u{C6A9}\u{D560} \u{C218} \u{C788}\u{C2B5}\u{B2C8}\u{B2E4}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{C785}\u{B825}\u{D55C} \u{ADF8}\u{B8F9} ${args.groupTitle}, ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)}\u{AC1C} \u{C635}\u{C158}`,
			other: () => `${formatter.number(args.groupCount)}\u{AC1C} \u{C635}\u{C158}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{C120}\u{D0DD}\u{B428}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{C81C}\u{C548}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{C120}\u{D0DD}\u{B428}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/lt-LT.mjs
var $78699a5d964b2618$exports = {};
$78699a5d964b2618$exports = {
	"buttonLabel": `Rodyti pasi\u{16B}lymus`,
	"countAnnouncement": (args, formatter) => `Yra ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} parinktis`,
		other: () => `${formatter.number(args.optionCount)} parinktys (-i\u{173})`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{12E}vesta grup\u{117} ${args.groupTitle}, su ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} parinktimi`,
			other: () => `${formatter.number(args.groupCount)} parinktimis (-i\u{173})`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, pasirinkta`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Pasi\u{16B}lymai`,
	"selectedAnnouncement": (args) => `${args.optionText}, pasirinkta`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/lv-LV.mjs
var $f37ba73ed1338143$exports = {};
$f37ba73ed1338143$exports = {
	"buttonLabel": `R\u{101}d\u{12B}t ieteikumus`,
	"countAnnouncement": (args, formatter) => `Pieejamo opciju skaits: ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opcija`,
		other: () => `${formatter.number(args.optionCount)} opcijas`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Ievad\u{12B}ta grupa ${args.groupTitle}, ar ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opciju`,
			other: () => `${formatter.number(args.groupCount)} opcij\u{101}m`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, atlas\u{12B}ta`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Ieteikumi`,
	"selectedAnnouncement": (args) => `${args.optionText}, atlas\u{12B}ta`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/nb-NO.mjs
var $8a4e7bb0d7414172$exports = {};
$8a4e7bb0d7414172$exports = {
	"buttonLabel": `Vis forslag`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} alternativ`,
		other: () => `${formatter.number(args.optionCount)} alternativer`
	})} finnes.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Angitt gruppe ${args.groupTitle}, med ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} alternativ`,
			other: () => `${formatter.number(args.groupCount)} alternativer`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, valgt`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Forslag`,
	"selectedAnnouncement": (args) => `${args.optionText}, valgt`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/nl-NL.mjs
var $04d4b254da39a220$exports = {};
$04d4b254da39a220$exports = {
	"buttonLabel": `Suggesties weergeven`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} optie`,
		other: () => `${formatter.number(args.optionCount)} opties`
	})} beschikbaar.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Groep ${args.groupTitle} ingevoerd met ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} optie`,
			other: () => `${formatter.number(args.groupCount)} opties`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, geselecteerd`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Suggesties`,
	"selectedAnnouncement": (args) => `${args.optionText}, geselecteerd`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/pl-PL.mjs
var $02691f952c80dd24$exports = {};
$02691f952c80dd24$exports = {
	"buttonLabel": `Wy\u{15B}wietlaj sugestie`,
	"countAnnouncement": (args, formatter) => `dost\u{119}pna/dost\u{119}pne(-nych) ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opcja`,
		other: () => `${formatter.number(args.optionCount)} opcje(-i)`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Do\u{142}\u{105}czono do grupy ${args.groupTitle}, z ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opcj\u{105}`,
			other: () => `${formatter.number(args.groupCount)} opcjami`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, wybrano`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Sugestie`,
	"selectedAnnouncement": (args) => `${args.optionText}, wybrano`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/pt-BR.mjs
var $8fb4dd430e8c7c3f$exports = {};
$8fb4dd430e8c7c3f$exports = {
	"buttonLabel": `Mostrar sugest\xf5es`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} op\xe7\xe3o`,
		other: () => `${formatter.number(args.optionCount)} op\xe7\xf5es`
	})} dispon\xedvel.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Grupo inserido ${args.groupTitle}, com ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} op\xe7\xe3o`,
			other: () => `${formatter.number(args.groupCount)} op\xe7\xf5es`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, selecionado`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Sugest\xf5es`,
	"selectedAnnouncement": (args) => `${args.optionText}, selecionado`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/pt-PT.mjs
var $29daefa4936adb59$exports = {};
$29daefa4936adb59$exports = {
	"buttonLabel": `Apresentar sugest\xf5es`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} op\xe7\xe3o`,
		other: () => `${formatter.number(args.optionCount)} op\xe7\xf5es`
	})} dispon\xedvel.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Grupo introduzido ${args.groupTitle}, com ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} op\xe7\xe3o`,
			other: () => `${formatter.number(args.groupCount)} op\xe7\xf5es`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, selecionado`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Sugest\xf5es`,
	"selectedAnnouncement": (args) => `${args.optionText}, selecionado`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/ro-RO.mjs
var $52a6b561e1fc9d26$exports = {};
$52a6b561e1fc9d26$exports = {
	"buttonLabel": `Afi\u{219}are sugestii`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} op\u{21B}iune`,
		other: () => `${formatter.number(args.optionCount)} op\u{21B}iuni`
	})} disponibile.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Grup ${args.groupTitle} introdus, cu ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} op\u{21B}iune`,
			other: () => `${formatter.number(args.groupCount)} op\u{21B}iuni`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, selectat`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Sugestii`,
	"selectedAnnouncement": (args) => `${args.optionText}, selectat`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/ru-RU.mjs
var $85a2d784d06219cd$exports = {};
$85a2d784d06219cd$exports = {
	"buttonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{44C} \u{43F}\u{440}\u{435}\u{434}\u{43B}\u{43E}\u{436}\u{435}\u{43D}\u{438}\u{44F}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}`,
		other: () => `${formatter.number(args.optionCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}\u{43E}\u{432}`
	})} \u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{43E}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{412}\u{432}\u{435}\u{434}\u{435}\u{43D}\u{43D}\u{430}\u{44F} \u{433}\u{440}\u{443}\u{43F}\u{43F}\u{430} ${args.groupTitle}, \u{441} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}\u{43E}\u{43C}`,
			other: () => `${formatter.number(args.groupCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}\u{430}\u{43C}\u{438}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43D}\u{44B}\u{43C}\u{438}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{41F}\u{440}\u{435}\u{434}\u{43B}\u{43E}\u{436}\u{435}\u{43D}\u{438}\u{44F}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{432}\u{44B}\u{431}\u{440}\u{430}\u{43D}\u{43E}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/sk-SK.mjs
var $47782c12572523a2$exports = {};
$47782c12572523a2$exports = {
	"buttonLabel": `Zobrazi\u{165} n\xe1vrhy`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} mo\u{17E}nos\u{165}`,
		other: () => `${formatter.number(args.optionCount)} mo\u{17E}nosti/-\xed`
	})} k dispoz\xedcii.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Zadan\xe1 skupina ${args.groupTitle}, s ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} mo\u{17E}nos\u{165}ou`,
			other: () => `${formatter.number(args.groupCount)} mo\u{17E}nos\u{165}ami`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, vybrat\xe9`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `N\xe1vrhy`,
	"selectedAnnouncement": (args) => `${args.optionText}, vybrat\xe9`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/sl-SI.mjs
var $dc4a97a17026f14d$exports = {};
$dc4a97a17026f14d$exports = {
	"buttonLabel": `Prika\u{17E}i predloge`,
	"countAnnouncement": (args, formatter) => `Na voljo je ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opcija`,
		other: () => `${formatter.number(args.optionCount)} opcije`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Vnesena skupina ${args.groupTitle}, z ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opcija`,
			other: () => `${formatter.number(args.groupCount)} opcije`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, izbrano`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Predlogi`,
	"selectedAnnouncement": (args) => `${args.optionText}, izbrano`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/sr-SP.mjs
var $35792d4e62f2d9ad$exports = {};
$35792d4e62f2d9ad$exports = {
	"buttonLabel": `Prika\u{17E}i predloge`,
	"countAnnouncement": (args, formatter) => `Dostupno jo\u{161}: ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} opcija`,
		other: () => `${formatter.number(args.optionCount)} opcije/a`
	})}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Unesena grupa ${args.groupTitle}, s ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} opcijom`,
			other: () => `${formatter.number(args.groupCount)} optione/a`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, izabranih`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `Predlozi`,
	"selectedAnnouncement": (args) => `${args.optionText}, izabrano`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/sv-SE.mjs
var $7fe78eec23a31941$exports = {};
$7fe78eec23a31941$exports = {
	"buttonLabel": `Visa f\xf6rslag`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} alternativ`,
		other: () => `${formatter.number(args.optionCount)} alternativ`
	})} tillg\xe4ngliga.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Ingick i gruppen ${args.groupTitle} med ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} alternativ`,
			other: () => `${formatter.number(args.groupCount)} alternativ`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, valda`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `F\xf6rslag`,
	"selectedAnnouncement": (args) => `${args.optionText}, valda`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/tr-TR.mjs
var $d89776e39290e23c$exports = {};
$d89776e39290e23c$exports = {
	"buttonLabel": `\xd6nerileri g\xf6ster`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} se\xe7enek`,
		other: () => `${formatter.number(args.optionCount)} se\xe7enekler`
	})} kullan\u{131}labilir.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `Girilen grup ${args.groupTitle}, ile ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} se\xe7enek`,
			other: () => `${formatter.number(args.groupCount)} se\xe7enekler`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, se\xe7ildi`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\xd6neriler`,
	"selectedAnnouncement": (args) => `${args.optionText}, se\xe7ildi`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/uk-UA.mjs
var $26dde2206a78f3a6$exports = {};
$26dde2206a78f3a6$exports = {
	"buttonLabel": `\u{41F}\u{43E}\u{43A}\u{430}\u{437}\u{430}\u{442}\u{438} \u{43F}\u{440}\u{43E}\u{43F}\u{43E}\u{437}\u{438}\u{446}\u{456}\u{457}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}`,
		other: () => `${formatter.number(args.optionCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}\u{438}(-\u{456}\u{432})`
	})} \u{434}\u{43E}\u{441}\u{442}\u{443}\u{43F}\u{43D}\u{43E}.`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{412}\u{432}\u{435}\u{434}\u{435}\u{43D}\u{430} \u{433}\u{440}\u{443}\u{43F}\u{430} ${args.groupTitle}, \u{437} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}`,
			other: () => `${formatter.number(args.groupCount)} \u{43F}\u{430}\u{440}\u{430}\u{43C}\u{435}\u{442}\u{440}\u{438}(-\u{456}\u{432})`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{41F}\u{440}\u{43E}\u{43F}\u{43E}\u{437}\u{438}\u{446}\u{456}\u{457}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{432}\u{438}\u{431}\u{440}\u{430}\u{43D}\u{43E}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/zh-CN.mjs
var $5262194bce8d1b94$exports = {};
$5262194bce8d1b94$exports = {
	"buttonLabel": `\u{663E}\u{793A}\u{5EFA}\u{8BAE}`,
	"countAnnouncement": (args, formatter) => `\u{6709} ${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{4E2A}\u{9009}\u{9879}`,
		other: () => `${formatter.number(args.optionCount)} \u{4E2A}\u{9009}\u{9879}`
	})}\u{53EF}\u{7528}\u{3002}`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{8FDB}\u{5165}\u{4E86} ${args.groupTitle} \u{7EC4}\u{FF0C}\u{5176}\u{4E2D}\u{6709} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{4E2A}\u{9009}\u{9879}`,
			other: () => `${formatter.number(args.groupCount)} \u{4E2A}\u{9009}\u{9879}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{5DF2}\u{9009}\u{62E9}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{5EFA}\u{8BAE}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{5DF2}\u{9009}\u{62E9}`
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/combobox/zh-TW.mjs
var $8ef2b23f73d70bf1$exports = {};
$8ef2b23f73d70bf1$exports = {
	"buttonLabel": `\u{986F}\u{793A}\u{5EFA}\u{8B70}`,
	"countAnnouncement": (args, formatter) => `${formatter.plural(args.optionCount, {
		one: () => `${formatter.number(args.optionCount)} \u{9078}\u{9805}`,
		other: () => `${formatter.number(args.optionCount)} \u{9078}\u{9805}`
	})} \u{53EF}\u{7528}\u{3002}`,
	"focusAnnouncement": (args, formatter) => `${formatter.select({
		true: () => `\u{8F38}\u{5165}\u{7684}\u{7FA4}\u{7D44} ${args.groupTitle}, \u{6709} ${formatter.plural(args.groupCount, {
			one: () => `${formatter.number(args.groupCount)} \u{9078}\u{9805}`,
			other: () => `${formatter.number(args.groupCount)} \u{9078}\u{9805}`
		})}. `,
		other: ``
	}, args.isGroupChange)}${args.optionText}${formatter.select({
		true: `, \u{5DF2}\u{9078}\u{53D6}`,
		other: ``
	}, args.isSelected)}`,
	"listboxLabel": `\u{5EFA}\u{8B70}`,
	"selectedAnnouncement": (args) => `${args.optionText}, \u{5DF2}\u{9078}\u{53D6}`
};
//#endregion
//#region node_modules/react-aria/dist/private/combobox/intlStrings.mjs
var $4fbc67f91f577596$exports = {};
$4fbc67f91f577596$exports = {
	"ar-AE": $44e96378ed9cec6d$exports,
	"bg-BG": $4f2abbace6d15464$exports,
	"cs-CZ": $c1cf508a70425b11$exports,
	"da-DK": $c6334dc4bef16229$exports,
	"de-DE": $3c1f280212fbe3e1$exports,
	"el-GR": $57ce5bfb234b266c$exports,
	"en-US": $2bdcc92d206ae897$exports,
	"es-ES": $05b3b7ff042563de$exports,
	"et-EE": $5ae036907590ca8d$exports,
	"fi-FI": $f1b3c1991f38986b$exports,
	"fr-FR": $7013cb8c11464d70$exports,
	"he-IL": $072bbd14cdc5486c$exports,
	"hr-HR": $0f316c1985a6fee3$exports,
	"hu-HU": $ac61c1e7905e0d09$exports,
	"it-IT": $ecca75177af99ba0$exports,
	"ja-JP": $8160c4de84c67861$exports,
	"ko-KR": $1ef3deffd88c8b37$exports,
	"lt-LT": $78699a5d964b2618$exports,
	"lv-LV": $f37ba73ed1338143$exports,
	"nb-NO": $8a4e7bb0d7414172$exports,
	"nl-NL": $04d4b254da39a220$exports,
	"pl-PL": $02691f952c80dd24$exports,
	"pt-BR": $8fb4dd430e8c7c3f$exports,
	"pt-PT": $29daefa4936adb59$exports,
	"ro-RO": $52a6b561e1fc9d26$exports,
	"ru-RU": $85a2d784d06219cd$exports,
	"sk-SK": $47782c12572523a2$exports,
	"sl-SI": $dc4a97a17026f14d$exports,
	"sr-SP": $35792d4e62f2d9ad$exports,
	"sv-SE": $7fe78eec23a31941$exports,
	"tr-TR": $d89776e39290e23c$exports,
	"uk-UA": $26dde2206a78f3a6$exports,
	"zh-CN": $5262194bce8d1b94$exports,
	"zh-TW": $8ef2b23f73d70bf1$exports
};
//#endregion
//#region node_modules/react-aria/dist/private/selection/utils.mjs
function $22bbea12c2567021$export$d3e3bd3e26688c04(e) {
	return $2add3ce32c6007eb$export$e1865c3bedcd822b() ? e.altKey : e.ctrlKey;
}
function $22bbea12c2567021$export$c3d8340acf92597f(collectionRef, key) {
	let selector = `[data-key="${CSS.escape(String(key))}"]`;
	let collection = collectionRef.current?.dataset.collection;
	if (collection) selector = `[data-collection="${CSS.escape(collection)}"]${selector}`;
	return collectionRef.current?.querySelector(selector);
}
var $22bbea12c2567021$var$collectionMap = /* @__PURE__ */ new WeakMap();
function $22bbea12c2567021$export$881eb0d9f3605d9d(collection) {
	let id = $390e54f620492c70$export$f680877a34711e37();
	$22bbea12c2567021$var$collectionMap.set(collection, id);
	return id;
}
function $22bbea12c2567021$export$6aeb1680a0ae8741(collection) {
	return $22bbea12c2567021$var$collectionMap.get(collection);
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/DOMLayoutDelegate.mjs
var $a83747cc3f035330$export$8f5ed9ff9f511381 = class {
	constructor(ref) {
		this.ref = ref;
	}
	getItemRect(key) {
		let container = this.ref.current;
		if (!container) return null;
		let item = key != null ? $22bbea12c2567021$export$c3d8340acf92597f(this.ref, key) : null;
		if (!item) return null;
		let containerRect = container.getBoundingClientRect();
		let itemRect = item.getBoundingClientRect();
		return {
			x: itemRect.left - containerRect.left - container.clientLeft + container.scrollLeft,
			y: itemRect.top - containerRect.top - container.clientTop + container.scrollTop,
			width: itemRect.width,
			height: itemRect.height
		};
	}
	getContentSize() {
		let container = this.ref.current;
		return {
			width: container?.scrollWidth ?? 0,
			height: container?.scrollHeight ?? 0
		};
	}
	getVisibleRect() {
		let container = this.ref.current;
		return {
			x: container?.scrollLeft ?? 0,
			y: container?.scrollTop ?? 0,
			width: container?.clientWidth ?? 0,
			height: container?.clientHeight ?? 0
		};
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/selection/ListKeyboardDelegate.mjs
var $ae8f8d98b2b18f2f$export$a05409b8bb224a5a = class {
	constructor(...args) {
		if (args.length === 1) {
			let opts = args[0];
			this.collection = opts.collection;
			this.ref = opts.ref;
			this.collator = opts.collator;
			this.disabledKeys = opts.disabledKeys || /* @__PURE__ */ new Set();
			this.disabledBehavior = opts.disabledBehavior || "all";
			this.orientation = opts.orientation || "vertical";
			this.direction = opts.direction;
			this.layout = opts.layout || "stack";
			this.layoutDelegate = opts.layoutDelegate || new $a83747cc3f035330$export$8f5ed9ff9f511381(opts.ref);
		} else {
			this.collection = args[0];
			this.disabledKeys = args[1];
			this.ref = args[2];
			this.collator = args[3];
			this.layout = "stack";
			this.orientation = "vertical";
			this.disabledBehavior = "all";
			this.layoutDelegate = new $a83747cc3f035330$export$8f5ed9ff9f511381(this.ref);
		}
		if (this.layout === "stack" && this.orientation === "vertical") {
			this.getKeyLeftOf = void 0;
			this.getKeyRightOf = void 0;
		}
	}
	isDisabled(item) {
		return this.disabledBehavior === "all" && (item.props?.isDisabled || this.disabledKeys.has(item.key)) && item.props?.disabledBehavior !== "selection";
	}
	findNextNonDisabled(key, getNext, includeDisabled = false) {
		let nextKey = key;
		while (nextKey != null) {
			let item = this.collection.getItem(nextKey);
			if (item?.type === "item" && (includeDisabled || !this.isDisabled(item))) return nextKey;
			nextKey = getNext(nextKey);
		}
		return null;
	}
	getNextKey(key, options) {
		let nextKey = key;
		nextKey = this.collection.getKeyAfter(nextKey);
		return this.findNextNonDisabled(nextKey, (key) => this.collection.getKeyAfter(key), options?.includeDisabled);
	}
	getPreviousKey(key, options) {
		let nextKey = key;
		nextKey = this.collection.getKeyBefore(nextKey);
		return this.findNextNonDisabled(nextKey, (key) => this.collection.getKeyBefore(key), options?.includeDisabled);
	}
	findKey(key, nextKey, shouldSkip) {
		let tempKey = key;
		let itemRect = this.layoutDelegate.getItemRect(tempKey);
		if (!itemRect || tempKey == null) return null;
		let prevRect = itemRect;
		do {
			tempKey = nextKey(tempKey);
			if (tempKey == null) break;
			itemRect = this.layoutDelegate.getItemRect(tempKey);
		} while (itemRect && shouldSkip(prevRect, itemRect) && tempKey != null);
		return tempKey;
	}
	isSameRow(prevRect, itemRect) {
		return prevRect.y === itemRect.y || prevRect.x !== itemRect.x;
	}
	isSameColumn(prevRect, itemRect) {
		return prevRect.x === itemRect.x || prevRect.y !== itemRect.y;
	}
	isReversed(key) {
		let nextKey = this.getNextKey(key);
		let currentEl = $22bbea12c2567021$export$c3d8340acf92597f(this.ref, key);
		if (nextKey != null) {
			let nextEl = $22bbea12c2567021$export$c3d8340acf92597f(this.ref, nextKey);
			if (!currentEl || !nextEl) return false;
			return currentEl.getBoundingClientRect().top > nextEl.getBoundingClientRect().top;
		}
		let prevKey = this.getPreviousKey(key);
		if (prevKey != null) {
			let prevEl = $22bbea12c2567021$export$c3d8340acf92597f(this.ref, prevKey);
			if (!currentEl || !prevEl) return false;
			return prevEl.getBoundingClientRect().top > currentEl.getBoundingClientRect().top;
		}
		return false;
	}
	getKeyBelow(key, options) {
		if (this.layout === "grid" && this.orientation === "vertical") return this.findKey(key, (key) => this.getNextKey(key, options), this.isSameRow);
		else if (this.orientation === "vertical") return this.isReversed(key) ? this.getPreviousKey(key, options) : this.getNextKey(key, options);
		else return this.getNextKey(key, options);
	}
	getKeyAbove(key, options) {
		if (this.layout === "grid" && this.orientation === "vertical") return this.findKey(key, (key) => this.getPreviousKey(key, options), this.isSameRow);
		else if (this.orientation === "vertical") return this.isReversed(key) ? this.getNextKey(key, options) : this.getPreviousKey(key, options);
		else return this.getPreviousKey(key, options);
	}
	getNextColumn(key, right, options) {
		return right ? this.getPreviousKey(key, options) : this.getNextKey(key, options);
	}
	getKeyRightOf(key, options) {
		let layoutDelegateMethod = this.direction === "ltr" ? "getKeyRightOf" : "getKeyLeftOf";
		if (this.layoutDelegate[layoutDelegateMethod]) {
			key = this.layoutDelegate[layoutDelegateMethod](key);
			return this.findNextNonDisabled(key, (key) => this.layoutDelegate[layoutDelegateMethod](key), options?.includeDisabled);
		}
		if (this.layout === "grid") {
			if (this.orientation === "vertical") return this.getNextColumn(key, this.direction === "rtl", options);
			else return this.findKey(key, (key) => this.getNextColumn(key, this.direction === "rtl", options), this.isSameColumn);
		} else if (this.orientation === "horizontal") return this.getNextColumn(key, this.direction === "rtl", options);
		return null;
	}
	getKeyLeftOf(key, options) {
		let layoutDelegateMethod = this.direction === "ltr" ? "getKeyLeftOf" : "getKeyRightOf";
		if (this.layoutDelegate[layoutDelegateMethod]) {
			key = this.layoutDelegate[layoutDelegateMethod](key);
			return this.findNextNonDisabled(key, (key) => this.layoutDelegate[layoutDelegateMethod](key), options?.includeDisabled);
		}
		if (this.layout === "grid") {
			if (this.orientation === "vertical") return this.getNextColumn(key, this.direction === "ltr", options);
			else return this.findKey(key, (key) => this.getNextColumn(key, this.direction === "ltr", options), this.isSameColumn);
		} else if (this.orientation === "horizontal") return this.getNextColumn(key, this.direction === "ltr", options);
		return null;
	}
	getFirstKey() {
		let key = this.collection.getFirstKey();
		return this.findNextNonDisabled(key, (key) => this.collection.getKeyAfter(key));
	}
	getLastKey() {
		let key = this.collection.getLastKey();
		return this.findNextNonDisabled(key, (key) => this.collection.getKeyBefore(key));
	}
	getKeyPageAbove(key) {
		let menu = this.ref.current;
		let itemRect = this.layoutDelegate.getItemRect(key);
		if (!itemRect) return null;
		let reversed = this.isReversed(key);
		if (menu && !$901761b40e390936$export$2bb74740c4e19def(menu)) return this.getFirstKey();
		let nextKey = key;
		if (this.orientation === "horizontal") {
			let pageX = Math.max(0, itemRect.x + itemRect.width - this.layoutDelegate.getVisibleRect().width);
			while (itemRect && itemRect.x > pageX && nextKey != null) {
				nextKey = this.getKeyAbove(nextKey);
				itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
			}
		} else {
			let visibleRect = this.layoutDelegate.getVisibleRect();
			let pageY = reversed ? itemRect.y - visibleRect.height : Math.max(0, itemRect.y + itemRect.height - visibleRect.height);
			while (itemRect && itemRect.y > pageY && nextKey != null) {
				nextKey = this.getKeyAbove(nextKey);
				itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
			}
		}
		return nextKey ?? (reversed ? this.getLastKey() : this.getFirstKey());
	}
	getKeyPageBelow(key) {
		let menu = this.ref.current;
		let itemRect = this.layoutDelegate.getItemRect(key);
		if (!itemRect) return null;
		let reversed = this.isReversed(key);
		if (menu && !$901761b40e390936$export$2bb74740c4e19def(menu)) return this.getLastKey();
		let nextKey = key;
		if (this.orientation === "horizontal") {
			let pageX = Math.min(this.layoutDelegate.getContentSize().width, itemRect.x - itemRect.width + this.layoutDelegate.getVisibleRect().width);
			while (itemRect && itemRect.x < pageX && nextKey != null) {
				nextKey = this.getKeyBelow(nextKey);
				itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
			}
		} else {
			let pageY = Math.min(this.layoutDelegate.getContentSize().height, itemRect.y - itemRect.height + this.layoutDelegate.getVisibleRect().height);
			while (itemRect && itemRect.y < pageY && nextKey != null) {
				nextKey = this.getKeyBelow(nextKey);
				itemRect = nextKey == null ? null : this.layoutDelegate.getItemRect(nextKey);
			}
		}
		return nextKey ?? (reversed ? this.getFirstKey() : this.getLastKey());
	}
	getKeyForSearch(search, fromKey) {
		if (!this.collator) return null;
		let collection = this.collection;
		let key = fromKey || this.getFirstKey();
		while (key != null) {
			let item = collection.getItem(key);
			if (!item) return null;
			let substring = item.textValue.slice(0, search.length);
			if (item.textValue && this.collator.compare(substring, search) === 0) return key;
			key = this.getNextKey(key);
		}
		return null;
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ar-AE.mjs
var $50608029e06fcc45$exports = {};
$50608029e06fcc45$exports = { "longPressMessage": `\u{627}\u{636}\u{63A}\u{637} \u{645}\u{637}\u{648}\u{644}\u{627}\u{64B} \u{623}\u{648} \u{627}\u{636}\u{63A}\u{637} \u{639}\u{644}\u{649} Alt + \u{627}\u{644}\u{633}\u{647}\u{645} \u{644}\u{623}\u{633}\u{641}\u{644} \u{644}\u{641}\u{62A}\u{62D} \u{627}\u{644}\u{642}\u{627}\u{626}\u{645}\u{629}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/bg-BG.mjs
var $0ce6c09c3e669100$exports = {};
$0ce6c09c3e669100$exports = { "longPressMessage": `\u{41D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} \u{43F}\u{440}\u{43E}\u{434}\u{44A}\u{43B}\u{436}\u{438}\u{442}\u{435}\u{43B}\u{43D}\u{43E} \u{438}\u{43B}\u{438} \u{43D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{435}\u{442}\u{435} Alt+ \u{441}\u{442}\u{440}\u{435}\u{43B}\u{43A}\u{430} \u{43D}\u{430}\u{434}\u{43E}\u{43B}\u{443}, \u{437}\u{430} \u{434}\u{430} \u{43E}\u{442}\u{432}\u{43E}\u{440}\u{438}\u{442}\u{435} \u{43C}\u{435}\u{43D}\u{44E}\u{442}\u{43E}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/cs-CZ.mjs
var $a9daab48d18bec17$exports = {};
$a9daab48d18bec17$exports = { "longPressMessage": `Dlouh\xfdm stiskem nebo stisknut\xedm kl\xe1ves Alt + \u{161}ipka dol\u{16F} otev\u{159}ete nab\xeddku` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/da-DK.mjs
var $a7897057abd4dedc$exports = {};
$a7897057abd4dedc$exports = { "longPressMessage": `Langt tryk eller tryk p\xe5 Alt + pil ned for at \xe5bne menuen` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/de-DE.mjs
var $a48782afe17e416a$exports = {};
$a48782afe17e416a$exports = { "longPressMessage": `Dr\xfccken Sie lange oder dr\xfccken Sie Alt + Nach-unten, um das Men\xfc zu \xf6ffnen` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/el-GR.mjs
var $b4a078a1f4803013$exports = {};
$b4a078a1f4803013$exports = { "longPressMessage": `\u{3A0}\u{3B9}\u{3AD}\u{3C3}\u{3C4}\u{3B5} \u{3C0}\u{3B1}\u{3C1}\u{3B1}\u{3C4}\u{3B5}\u{3C4}\u{3B1}\u{3BC}\u{3AD}\u{3BD}\u{3B1} \u{3AE} \u{3C0}\u{3B1}\u{3C4}\u{3AE}\u{3C3}\u{3C4}\u{3B5} Alt + \u{3BA}\u{3AC}\u{3C4}\u{3C9} \u{3B2}\u{3AD}\u{3BB}\u{3BF}\u{3C2} \u{3B3}\u{3B9}\u{3B1} \u{3BD}\u{3B1} \u{3B1}\u{3BD}\u{3BF}\u{3AF}\u{3BE}\u{3B5}\u{3C4}\u{3B5} \u{3C4}\u{3BF} \u{3BC}\u{3B5}\u{3BD}\u{3BF}\u{3CD}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/en-US.mjs
var $788d77bcaab07d29$exports = {};
$788d77bcaab07d29$exports = { "longPressMessage": `Long press or press Alt + ArrowDown to open menu` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/es-ES.mjs
var $8fc1e38f2f738334$exports = {};
$8fc1e38f2f738334$exports = { "longPressMessage": `Mantenga pulsado o pulse Alt + flecha abajo para abrir el men\xfa` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/et-EE.mjs
var $0c79cbd512713d63$exports = {};
$0c79cbd512713d63$exports = { "longPressMessage": `Men\xfc\xfc avamiseks vajutage pikalt v\xf5i vajutage klahve Alt + allanool` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/fi-FI.mjs
var $6e578cb07f661d0f$exports = {};
$6e578cb07f661d0f$exports = { "longPressMessage": `Avaa valikko painamalla pohjassa tai n\xe4pp\xe4inyhdistelm\xe4ll\xe4 Alt + Alanuoli` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/fr-FR.mjs
var $44177fdbbad1a686$exports = {};
$44177fdbbad1a686$exports = { "longPressMessage": `Appuyez de mani\xe8re prolong\xe9e ou appuyez sur Alt\xa0+\xa0Fl\xe8che vers le bas pour ouvrir le menu.` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/he-IL.mjs
var $990dfee85fc94a6a$exports = {};
$990dfee85fc94a6a$exports = { "longPressMessage": `\u{5DC}\u{5D7}\u{5E5} \u{5DC}\u{5D7}\u{5D9}\u{5E6}\u{5D4} \u{5D0}\u{5E8}\u{5D5}\u{5DB}\u{5D4} \u{5D0}\u{5D5} \u{5D4}\u{5E7}\u{5E9} Alt + ArrowDown \u{5DB}\u{5D3}\u{5D9} \u{5DC}\u{5E4}\u{5EA}\u{5D5}\u{5D7} \u{5D0}\u{5EA} \u{5D4}\u{5EA}\u{5E4}\u{5E8}\u{5D9}\u{5D8}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/hr-HR.mjs
var $10d7c2a1d55e74cf$exports = {};
$10d7c2a1d55e74cf$exports = { "longPressMessage": `Dugo pritisnite ili pritisnite Alt + strelicu prema dolje za otvaranje izbornika` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/hu-HU.mjs
var $d3182189bfd1bf3b$exports = {};
$d3182189bfd1bf3b$exports = { "longPressMessage": `Nyomja meg hosszan, vagy nyomja meg az Alt + lefele ny\xedl gombot a men\xfc megnyit\xe1s\xe1hoz` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/it-IT.mjs
var $fbfac0c9f82929a4$exports = {};
$fbfac0c9f82929a4$exports = { "longPressMessage": `Premi a lungo o premi Alt + Freccia gi\xf9 per aprire il menu` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ja-JP.mjs
var $18b8fa80cdc50d05$exports = {};
$18b8fa80cdc50d05$exports = { "longPressMessage": `\u{9577}\u{62BC}\u{3057}\u{307E}\u{305F}\u{306F} Alt+\u{4E0B}\u{77E2}\u{5370}\u{30AD}\u{30FC}\u{3067}\u{30E1}\u{30CB}\u{30E5}\u{30FC}\u{3092}\u{958B}\u{304F}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ko-KR.mjs
var $a8f49035a51fdb32$exports = {};
$a8f49035a51fdb32$exports = { "longPressMessage": `\u{AE38}\u{AC8C} \u{B204}\u{B974}\u{AC70}\u{B098} Alt + \u{C544}\u{B798}\u{CABD} \u{D654}\u{C0B4}\u{D45C}\u{B97C} \u{B20C}\u{B7EC} \u{BA54}\u{B274} \u{C5F4}\u{AE30}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/lt-LT.mjs
var $06546dd9bbf0f542$exports = {};
$06546dd9bbf0f542$exports = { "longPressMessage": `Nor\u{117}dami atidaryti meniu, nuspaud\u{119} palaikykite arba paspauskite \u{201E}Alt + ArrowDown\u{201C}.` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/lv-LV.mjs
var $9a7348e0caa19677$exports = {};
$9a7348e0caa19677$exports = { "longPressMessage": `Lai atv\u{113}rtu izv\u{113}lni, turiet nospiestu vai nospiediet tausti\u{146}u kombin\u{101}ciju Alt + lejupv\u{113}rst\u{101} bulti\u{146}a` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/nb-NO.mjs
var $e16c55913ae3971e$exports = {};
$e16c55913ae3971e$exports = { "longPressMessage": `Langt trykk eller trykk Alt + PilNed for \xe5 \xe5pne menyen` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/nl-NL.mjs
var $d92f6e92c51016e2$exports = {};
$d92f6e92c51016e2$exports = { "longPressMessage": `Druk lang op Alt + pijl-omlaag of druk op Alt om het menu te openen` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pl-PL.mjs
var $5475104f6d631fa8$exports = {};
$5475104f6d631fa8$exports = { "longPressMessage": `Naci\u{15B}nij i przytrzymaj lub naci\u{15B}nij klawisze Alt + Strza\u{142}ka w d\xf3\u{142}, aby otworzy\u{107} menu` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pt-BR.mjs
var $e97402d4778a500f$exports = {};
$e97402d4778a500f$exports = { "longPressMessage": `Pressione e segure ou pressione Alt + Seta para baixo para abrir o menu` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pt-PT.mjs
var $8ffff1f90e4445ad$exports = {};
$8ffff1f90e4445ad$exports = { "longPressMessage": `Prima continuamente ou prima Alt + Seta Para Baixo para abrir o menu` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ro-RO.mjs
var $3b65c017e2338742$exports = {};
$3b65c017e2338742$exports = { "longPressMessage": `Ap\u{103}sa\u{21B}i lung sau ap\u{103}sa\u{21B}i pe Alt + s\u{103}geat\u{103} \xeen jos pentru a deschide meniul` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ru-RU.mjs
var $5dc65e8d5bb20c3e$exports = {};
$5dc65e8d5bb20c3e$exports = { "longPressMessage": `\u{41D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} \u{438} \u{443}\u{434}\u{435}\u{440}\u{436}\u{438}\u{432}\u{430}\u{439}\u{442}\u{435} \u{438}\u{43B}\u{438} \u{43D}\u{430}\u{436}\u{43C}\u{438}\u{442}\u{435} Alt + \u{421}\u{442}\u{440}\u{435}\u{43B}\u{43A}\u{430} \u{432}\u{43D}\u{438}\u{437}, \u{447}\u{442}\u{43E}\u{431}\u{44B} \u{43E}\u{442}\u{43A}\u{440}\u{44B}\u{442}\u{44C} \u{43C}\u{435}\u{43D}\u{44E}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sk-SK.mjs
var $754ea877f466b46b$exports = {};
$754ea877f466b46b$exports = { "longPressMessage": `Ponuku otvor\xedte dlh\xfdm stla\u{10D}en\xedm alebo stla\u{10D}en\xedm kl\xe1vesu Alt + kl\xe1vesu so \u{161}\xedpkou nadol` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sl-SI.mjs
var $371167f8ab40ff4e$exports = {};
$371167f8ab40ff4e$exports = { "longPressMessage": `Za odprtje menija pritisnite in dr\u{17E}ite gumb ali pritisnite Alt+pu\u{161}\u{10D}ica navzdol` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sr-SP.mjs
var $000e668e4e84b579$exports = {};
$000e668e4e84b579$exports = { "longPressMessage": `Dugo pritisnite ili pritisnite Alt + strelicu prema dole da otvorite meni` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sv-SE.mjs
var $fc088db6dd370743$exports = {};
$fc088db6dd370743$exports = { "longPressMessage": `H\xe5ll nedtryckt eller tryck p\xe5 Alt + pil ned\xe5t f\xf6r att \xf6ppna menyn` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/tr-TR.mjs
var $eef33ec9131405b8$exports = {};
$eef33ec9131405b8$exports = { "longPressMessage": `Men\xfcy\xfc a\xe7mak i\xe7in uzun bas\u{131}n veya Alt + A\u{15F}a\u{11F}\u{131} Ok tu\u{15F}una bas\u{131}n` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/uk-UA.mjs
var $17ca43fe2ce333c0$exports = {};
$17ca43fe2ce333c0$exports = { "longPressMessage": `\u{414}\u{43E}\u{432}\u{433}\u{43E} \u{430}\u{431}\u{43E} \u{437}\u{432}\u{438}\u{447}\u{430}\u{439}\u{43D}\u{43E} \u{43D}\u{430}\u{442}\u{438}\u{441}\u{43D}\u{456}\u{442}\u{44C} \u{43A}\u{43E}\u{43C}\u{431}\u{456}\u{43D}\u{430}\u{446}\u{456}\u{44E} \u{43A}\u{43B}\u{430}\u{432}\u{456}\u{448} Alt \u{456} \u{441}\u{442}\u{440}\u{456}\u{43B}\u{43A}\u{430} \u{432}\u{43D}\u{438}\u{437}, \u{449}\u{43E}\u{431} \u{432}\u{456}\u{434}\u{43A}\u{440}\u{438}\u{442}\u{438} \u{43C}\u{435}\u{43D}\u{44E}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/zh-CN.mjs
var $ce0bee578e53860c$exports = {};
$ce0bee578e53860c$exports = { "longPressMessage": `\u{957F}\u{6309}\u{6216}\u{6309} Alt + \u{5411}\u{4E0B}\u{65B9}\u{5411}\u{952E}\u{4EE5}\u{6253}\u{5F00}\u{83DC}\u{5355}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/zh-TW.mjs
var $a146d231f9c4bbf9$exports = {};
$a146d231f9c4bbf9$exports = { "longPressMessage": `\u{9577}\u{6309}\u{6216}\u{6309} Alt+\u{5411}\u{4E0B}\u{9375}\u{4EE5}\u{958B}\u{555F}\u{529F}\u{80FD}\u{8868}` };
//#endregion
//#region node_modules/react-aria/dist/private/menu/intlStrings.mjs
var $bdff4dd8fb5956de$exports = {};
$bdff4dd8fb5956de$exports = {
	"ar-AE": $50608029e06fcc45$exports,
	"bg-BG": $0ce6c09c3e669100$exports,
	"cs-CZ": $a9daab48d18bec17$exports,
	"da-DK": $a7897057abd4dedc$exports,
	"de-DE": $a48782afe17e416a$exports,
	"el-GR": $b4a078a1f4803013$exports,
	"en-US": $788d77bcaab07d29$exports,
	"es-ES": $8fc1e38f2f738334$exports,
	"et-EE": $0c79cbd512713d63$exports,
	"fi-FI": $6e578cb07f661d0f$exports,
	"fr-FR": $44177fdbbad1a686$exports,
	"he-IL": $990dfee85fc94a6a$exports,
	"hr-HR": $10d7c2a1d55e74cf$exports,
	"hu-HU": $d3182189bfd1bf3b$exports,
	"it-IT": $fbfac0c9f82929a4$exports,
	"ja-JP": $18b8fa80cdc50d05$exports,
	"ko-KR": $a8f49035a51fdb32$exports,
	"lt-LT": $06546dd9bbf0f542$exports,
	"lv-LV": $9a7348e0caa19677$exports,
	"nb-NO": $e16c55913ae3971e$exports,
	"nl-NL": $d92f6e92c51016e2$exports,
	"pl-PL": $5475104f6d631fa8$exports,
	"pt-BR": $e97402d4778a500f$exports,
	"pt-PT": $8ffff1f90e4445ad$exports,
	"ro-RO": $3b65c017e2338742$exports,
	"ru-RU": $5dc65e8d5bb20c3e$exports,
	"sk-SK": $754ea877f466b46b$exports,
	"sl-SI": $371167f8ab40ff4e$exports,
	"sr-SP": $000e668e4e84b579$exports,
	"sv-SE": $fc088db6dd370743$exports,
	"tr-TR": $eef33ec9131405b8$exports,
	"uk-UA": $17ca43fe2ce333c0$exports,
	"zh-CN": $ce0bee578e53860c$exports,
	"zh-TW": $a146d231f9c4bbf9$exports
};
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useLongPress.mjs
var $7b01448eaad0fe7c$var$DEFAULT_THRESHOLD = 500;
function $7b01448eaad0fe7c$export$c24ed0104d07eab9(props) {
	let { isDisabled, onLongPressStart, onLongPressEnd, onLongPress, threshold = $7b01448eaad0fe7c$var$DEFAULT_THRESHOLD, accessibilityDescription } = props;
	const timeRef = (0, import_react.useRef)(void 0);
	let { addGlobalListener, removeGlobalListener } = $48a7d519b337145d$export$4eaf04e54aa8eed6();
	let { pressProps } = $d27d541f9569d26d$export$45712eceda6fad21({
		isDisabled,
		onPressStart(e) {
			e.continuePropagation();
			if (e.pointerType === "mouse" || e.pointerType === "touch") {
				if (onLongPressStart) onLongPressStart({
					...e,
					type: "longpressstart"
				});
				timeRef.current = setTimeout(() => {
					e.target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: true }));
					if ($d447af545b77c9f1$export$b204af158042fbac(e.target).activeElement !== e.target) $1969ac565cfec8d0$export$de79e2c695e052f3(e.target);
					if (onLongPress) onLongPress({
						...e,
						type: "longpress"
					});
					timeRef.current = void 0;
				}, threshold);
				if (e.pointerType === "touch") {
					let onContextMenu = (e) => {
						e.preventDefault();
					};
					let ownerWindow = $d447af545b77c9f1$export$f21a1ffae260145a(e.target);
					addGlobalListener(e.target, "contextmenu", onContextMenu, { once: true });
					addGlobalListener(ownerWindow, "pointerup", () => {
						setTimeout(() => {
							removeGlobalListener(e.target, "contextmenu", onContextMenu);
						}, 30);
					}, { once: true });
				}
			}
		},
		onPressEnd(e) {
			if (timeRef.current) clearTimeout(timeRef.current);
			if (onLongPressEnd && (e.pointerType === "mouse" || e.pointerType === "touch")) onLongPressEnd({
				...e,
				type: "longpressend"
			});
		}
	});
	let descriptionProps = $121970af65029459$export$f8aeda7b10753fa1(onLongPress && !isDisabled ? accessibilityDescription : void 0);
	return { longPressProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(pressProps, descriptionProps) };
}
//#endregion
//#region node_modules/react-aria/dist/private/menu/useMenuTrigger.mjs
function $parcel$interopDefault$1(a) {
	return a && a.__esModule ? a.default : a;
}
function $f19b83c1486f45cc$export$dc9c12ed27dd1b49(props, state, ref) {
	let { type = "menu", isDisabled, trigger = "press" } = props;
	let menuTriggerId = $390e54f620492c70$export$f680877a34711e37();
	let { triggerProps, overlayProps } = $f282e36c29c025e8$export$f9d5c8beee7d008d({ type }, state, ref);
	let onKeyDown = (e) => {
		if (isDisabled) return;
		if (trigger === "longPress" && !e.altKey) return;
		if (ref && ref.current) switch (e.key) {
			case "Enter":
			case " ": if (trigger === "longPress" || e.isDefaultPrevented()) return;
			case "ArrowDown":
				if (!("continuePropagation" in e)) e.stopPropagation();
				e.preventDefault();
				state.toggle("first");
				break;
			case "ArrowUp":
				if (!("continuePropagation" in e)) e.stopPropagation();
				e.preventDefault();
				state.toggle("last");
				break;
			default: if ("continuePropagation" in e) e.continuePropagation();
		}
	};
	let stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1($parcel$interopDefault$1($bdff4dd8fb5956de$exports), "@react-aria/menu");
	let { longPressProps } = $7b01448eaad0fe7c$export$c24ed0104d07eab9({
		isDisabled: isDisabled || trigger !== "longPress",
		accessibilityDescription: stringFormatter.format("longPressMessage"),
		onLongPressStart() {
			state.close();
		},
		onLongPress() {
			state.open("first");
		}
	});
	let pressProps = {
		preventFocusOnPress: true,
		onPressStart(e) {
			if (e.pointerType !== "touch" && e.pointerType !== "keyboard" && !isDisabled) {
				$1969ac565cfec8d0$export$de79e2c695e052f3(e.target);
				state.open(e.pointerType === "virtual" ? "first" : null);
			}
		},
		onPress(e) {
			if (e.pointerType === "touch" && !isDisabled) {
				$1969ac565cfec8d0$export$de79e2c695e052f3(e.target);
				state.toggle();
			}
		}
	};
	delete triggerProps.onPress;
	return {
		menuTriggerProps: {
			...triggerProps,
			...trigger === "press" ? pressProps : longPressProps,
			id: menuTriggerId,
			onKeyDown
		},
		menuProps: {
			...overlayProps,
			"aria-labelledby": menuTriggerId,
			autoFocus: state.focusStrategy || true,
			onClose: state.close
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/constants.mjs
var $8b2399d051d06d4c$export$447a38995de2c711 = "react-aria-clear-focus";
var $8b2399d051d06d4c$export$831c820ad60f9d12 = "react-aria-focus";
//#endregion
//#region node_modules/react-aria/dist/private/utils/getScrollParents.mjs
function $76d97191f0f90600$export$94ed1c92c7beeb22(node, checkForOverflow) {
	let parentElements = [];
	let root = document.scrollingElement || document.documentElement;
	while (node) {
		if ($901761b40e390936$export$2bb74740c4e19def(node, checkForOverflow)) parentElements.push(node);
		if (node === root) break;
		node = node.parentElement;
	}
	return parentElements;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/scrollIntoView.mjs
function $51a3e22a5186a962$export$53a0910f038337bd(scrollView, element, opts = {}) {
	let { block = "nearest", inline = "nearest" } = opts;
	if (scrollView === element) return;
	let y = scrollView.scrollTop;
	let x = scrollView.scrollLeft;
	let target = element.getBoundingClientRect();
	let view = scrollView.getBoundingClientRect();
	let itemStyle = window.getComputedStyle(element);
	let viewStyle = window.getComputedStyle(scrollView);
	let root = document.scrollingElement || document.documentElement;
	let isRoot = scrollView === root;
	let viewTop = scrollView === root ? 0 : view.top;
	let viewBottom = scrollView === root ? scrollView.clientHeight : view.bottom;
	let viewLeft = scrollView === root ? 0 : view.left;
	let viewRight = scrollView === root ? scrollView.clientWidth : view.right;
	let scrollMarginTop = parseFloat(itemStyle.scrollMarginTop) || 0;
	let scrollMarginBottom = parseFloat(itemStyle.scrollMarginBottom) || 0;
	let scrollMarginLeft = parseFloat(itemStyle.scrollMarginLeft) || 0;
	let scrollMarginRight = parseFloat(itemStyle.scrollMarginRight) || 0;
	let scrollPaddingTop = parseFloat(viewStyle.scrollPaddingTop) || 0;
	let scrollPaddingBottom = parseFloat(viewStyle.scrollPaddingBottom) || 0;
	let scrollPaddingLeft = parseFloat(viewStyle.scrollPaddingLeft) || 0;
	let scrollPaddingRight = parseFloat(viewStyle.scrollPaddingRight) || 0;
	let borderTopWidth = parseFloat(viewStyle.borderTopWidth) || 0;
	let borderBottomWidth = parseFloat(viewStyle.borderBottomWidth) || 0;
	let borderLeftWidth = parseFloat(viewStyle.borderLeftWidth) || 0;
	let borderRightWidth = parseFloat(viewStyle.borderRightWidth) || 0;
	let scrollAreaTop = target.top - scrollMarginTop;
	let scrollAreaBottom = target.bottom + scrollMarginBottom;
	let scrollAreaLeft = target.left - scrollMarginLeft;
	let scrollAreaRight = target.right + scrollMarginRight;
	let scrollBarOffsetX = scrollView === root ? 0 : borderLeftWidth + borderRightWidth;
	let scrollBarOffsetY = scrollView === root ? 0 : borderTopWidth + borderBottomWidth;
	let scrollBarWidth = scrollView === root ? 0 : scrollView.offsetWidth - scrollView.clientWidth - scrollBarOffsetX;
	let scrollBarHeight = scrollView === root ? 0 : scrollView.offsetHeight - scrollView.clientHeight - scrollBarOffsetY;
	let scrollPortTop = viewTop + (isRoot ? 0 : borderTopWidth) + scrollPaddingTop;
	let scrollPortBottom = viewBottom - (isRoot ? 0 : borderBottomWidth) - scrollPaddingBottom - scrollBarHeight;
	let scrollPortLeft = viewLeft + (isRoot ? 0 : borderLeftWidth) + scrollPaddingLeft;
	let scrollPortRight = viewRight - (isRoot ? 0 : borderRightWidth) - scrollPaddingRight;
	if (viewStyle.direction === "rtl" && !$2add3ce32c6007eb$export$fedb369cb70207f1()) scrollPortLeft += scrollBarWidth;
	else scrollPortRight -= scrollBarWidth;
	let shouldScrollBlock = scrollAreaTop < scrollPortTop || scrollAreaBottom > scrollPortBottom;
	let shouldScrollInline = scrollAreaLeft < scrollPortLeft || scrollAreaRight > scrollPortRight;
	if (shouldScrollBlock && block === "start") y += scrollAreaTop - scrollPortTop;
	else if (shouldScrollBlock && block === "center") y += (scrollAreaTop + scrollAreaBottom) / 2 - (scrollPortTop + scrollPortBottom) / 2;
	else if (shouldScrollBlock && block === "end") y += scrollAreaBottom - scrollPortBottom;
	else if (shouldScrollBlock && block === "nearest") {
		let start = scrollAreaTop - scrollPortTop;
		let end = scrollAreaBottom - scrollPortBottom;
		y += Math.abs(start) <= Math.abs(end) ? start : end;
	}
	if (shouldScrollInline && inline === "start") x += scrollAreaLeft - scrollPortLeft;
	else if (shouldScrollInline && inline === "center") x += (scrollAreaLeft + scrollAreaRight) / 2 - (scrollPortLeft + scrollPortRight) / 2;
	else if (shouldScrollInline && inline === "end") x += scrollAreaRight - scrollPortRight;
	else if (shouldScrollInline && inline === "nearest") {
		let start = scrollAreaLeft - scrollPortLeft;
		let end = scrollAreaRight - scrollPortRight;
		x += Math.abs(start) <= Math.abs(end) ? start : end;
	}
	scrollView.scrollTo({
		left: x,
		top: y
	});
}
function $51a3e22a5186a962$export$c826860796309d1b(targetElement, opts = {}) {
	let { containingElement } = opts;
	if (targetElement && targetElement.isConnected) {
		let root = document.scrollingElement || document.documentElement;
		if (!(window.getComputedStyle(root).overflow === "hidden")) {
			let { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
			targetElement?.scrollIntoView?.({ block: "nearest" });
			let { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
			if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
				containingElement?.scrollIntoView?.({
					block: "center",
					inline: "center"
				});
				targetElement.scrollIntoView?.({ block: "nearest" });
			}
		} else {
			let { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
			let scrollParents = $76d97191f0f90600$export$94ed1c92c7beeb22(targetElement, true);
			for (let scrollParent of scrollParents) $51a3e22a5186a962$export$53a0910f038337bd(scrollParent, targetElement);
			let { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
			if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
				scrollParents = containingElement ? $76d97191f0f90600$export$94ed1c92c7beeb22(containingElement, true) : [];
				for (let scrollParent of scrollParents) $51a3e22a5186a962$export$53a0910f038337bd(scrollParent, containingElement, {
					block: "center",
					inline: "center"
				});
				for (let scrollParent of $76d97191f0f90600$export$94ed1c92c7beeb22(targetElement, true)) $51a3e22a5186a962$export$53a0910f038337bd(scrollParent, targetElement);
			}
		}
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useTypeSelect.mjs
/**
* Controls how long to wait before clearing the typeahead buffer.
*/ var $f5a4a9a3486154da$var$TYPEAHEAD_DEBOUNCE_WAIT_MS = 1e3;
function $f5a4a9a3486154da$export$e32c88dfddc6e1d8(options) {
	let { keyboardDelegate, selectionManager, onTypeSelect } = options;
	let state = (0, import_react.useRef)({
		search: "",
		timeout: void 0
	});
	let onKeyDownCapture = (e) => {
		if (state.current.search.length > 0 && e.key === " ") {
			e.preventDefault();
			if (!("continuePropagation" in e) || "continuePropagation" in e && !e.isPropagationStopped()) e.stopPropagation();
			state.current.search += " ";
			if (keyboardDelegate.getKeyForSearch != null) {
				let key = keyboardDelegate.getKeyForSearch(state.current.search, selectionManager.focusedKey);
				if (key == null) key = keyboardDelegate.getKeyForSearch(state.current.search);
				if (key != null) {
					selectionManager.setFocusedKey(key);
					if (onTypeSelect) onTypeSelect(key);
				}
			}
			clearTimeout(state.current.timeout);
			state.current.timeout = setTimeout(() => {
				state.current.search = "";
			}, $f5a4a9a3486154da$var$TYPEAHEAD_DEBOUNCE_WAIT_MS);
		}
	};
	let onKeyDown = (e) => {
		let character = $f5a4a9a3486154da$var$getStringForKey(e.key);
		if (!character || e.ctrlKey || e.metaKey || e.altKey || !$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e)) || state.current.search.length === 0 && character === " ") return;
		state.current.search += character;
		if (keyboardDelegate.getKeyForSearch != null) {
			let key = keyboardDelegate.getKeyForSearch(state.current.search, selectionManager.focusedKey);
			if (key == null) key = keyboardDelegate.getKeyForSearch(state.current.search);
			if (key != null) {
				selectionManager.setFocusedKey(key);
				if (onTypeSelect) onTypeSelect(key);
				e.preventDefault();
				if (!("continuePropagation" in e)) e.stopPropagation();
			} else {
				state.current.search = "";
				clearTimeout(state.current.timeout);
				state.current.timeout = void 0;
				return;
			}
		}
		clearTimeout(state.current.timeout);
		state.current.timeout = setTimeout(() => {
			state.current.search = "";
		}, $f5a4a9a3486154da$var$TYPEAHEAD_DEBOUNCE_WAIT_MS);
	};
	(0, import_react.useEffect)(() => {
		let timeout = state.current.timeout;
		return () => {
			clearTimeout(timeout);
		};
	}, [state]);
	return { typeSelectProps: {
		onKeyDownCapture: keyboardDelegate.getKeyForSearch ? onKeyDownCapture : void 0,
		onKeyDown: keyboardDelegate.getKeyForSearch ? onKeyDown : void 0
	} };
}
function $f5a4a9a3486154da$var$getStringForKey(key) {
	if (key.length === 1 || !/^[A-Z]/i.test(key)) return key;
	return "";
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useUpdateLayoutEffect.mjs
function $a475cdc2445827b5$export$72ef708ab07251f1(effect, dependencies) {
	const isInitialMount = (0, import_react.useRef)(true);
	const lastDeps = (0, import_react.useRef)(null);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		isInitialMount.current = true;
		return () => {
			isInitialMount.current = false;
		};
	}, []);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (isInitialMount.current) isInitialMount.current = false;
		else if (!lastDeps.current || dependencies.some((dep, i) => !Object.is(dep, lastDeps[i]))) effect();
		lastDeps.current = dependencies;
	}, dependencies);
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableCollection.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
function $d667c2af82d35a98$export$d6daf82dcd84e87c(options) {
	let { selectionManager: manager, keyboardDelegate: delegate, ref, autoFocus = false, shouldFocusWrap = false, disallowEmptySelection = false, disallowSelectAll = false, escapeKeyBehavior = "clearSelection", selectOnFocus = manager.selectionBehavior === "replace", disallowTypeAhead = false, shouldUseVirtualFocus, allowsTabNavigation = false, scrollRef = ref, linkBehavior = "action", UNSTABLE_focusOnEntry } = options;
	let { direction } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let router = $caaf0dd3060ed57c$export$9a302a45f65d0572();
	let onKeyDown = (e) => {
		if (e.altKey && e.key === "Tab") e.preventDefault();
		if (!ref.current || !$23f2114a1b82827e$export$4282f70798064fe0(ref.current, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
		const navigateToKey = (key, childFocus) => {
			if (key != null) {
				if (manager.isLink(key) && linkBehavior === "selection" && selectOnFocus && !$22bbea12c2567021$export$d3e3bd3e26688c04(e)) {
					(0, import_react_dom.flushSync)(() => {
						manager.setFocusedKey(key, childFocus);
					});
					let item = $22bbea12c2567021$export$c3d8340acf92597f(ref, key);
					let itemProps = manager.getItemProps(key);
					if (item) router.open(item, e, itemProps.href, itemProps.routerOptions);
					return;
				}
				manager.setFocusedKey(key, childFocus);
				if (manager.isLink(key) && linkBehavior === "override") return;
				if (e.shiftKey && manager.selectionMode === "multiple") manager.extendSelection(key);
				else if (selectOnFocus && !$22bbea12c2567021$export$d3e3bd3e26688c04(e)) manager.replaceSelection(key);
			}
		};
		switch (e.key) {
			case "ArrowDown":
				if (delegate.getKeyBelow) {
					let nextKey = manager.focusedKey != null ? delegate.getKeyBelow?.(manager.focusedKey) : delegate.getFirstKey?.();
					if (nextKey == null && shouldFocusWrap) nextKey = delegate.getFirstKey?.(manager.focusedKey);
					if (nextKey != null) {
						e.preventDefault();
						navigateToKey(nextKey);
					}
				}
				break;
			case "ArrowUp":
				if (delegate.getKeyAbove) {
					let nextKey = manager.focusedKey != null ? delegate.getKeyAbove?.(manager.focusedKey) : delegate.getLastKey?.();
					if (nextKey == null && shouldFocusWrap) nextKey = delegate.getLastKey?.(manager.focusedKey);
					if (nextKey != null) {
						e.preventDefault();
						navigateToKey(nextKey);
					}
				}
				break;
			case "ArrowLeft":
				if (delegate.getKeyLeftOf) {
					let nextKey = manager.focusedKey != null ? delegate.getKeyLeftOf?.(manager.focusedKey) : delegate.getFirstKey?.();
					if (nextKey == null && shouldFocusWrap) nextKey = direction === "rtl" ? delegate.getFirstKey?.(manager.focusedKey) : delegate.getLastKey?.(manager.focusedKey);
					if (nextKey != null) {
						e.preventDefault();
						navigateToKey(nextKey, direction === "rtl" ? "first" : "last");
					}
				}
				break;
			case "ArrowRight":
				if (delegate.getKeyRightOf) {
					let nextKey = manager.focusedKey != null ? delegate.getKeyRightOf?.(manager.focusedKey) : delegate.getFirstKey?.();
					if (nextKey == null && shouldFocusWrap) nextKey = direction === "rtl" ? delegate.getLastKey?.(manager.focusedKey) : delegate.getFirstKey?.(manager.focusedKey);
					if (nextKey != null) {
						e.preventDefault();
						navigateToKey(nextKey, direction === "rtl" ? "last" : "first");
					}
				}
				break;
			case "Home":
				if (delegate.getFirstKey) {
					if (manager.focusedKey === null && e.shiftKey) return;
					e.preventDefault();
					let firstKey = delegate.getFirstKey(manager.focusedKey, $bb39c0fc1c19b34c$export$16792effe837dba3(e));
					manager.setFocusedKey(firstKey);
					if (firstKey != null) {
						if ($bb39c0fc1c19b34c$export$16792effe837dba3(e) && e.shiftKey && manager.selectionMode === "multiple") manager.extendSelection(firstKey);
						else if (selectOnFocus) manager.replaceSelection(firstKey);
					}
				}
				break;
			case "End":
				if (delegate.getLastKey) {
					if (manager.focusedKey === null && e.shiftKey) return;
					e.preventDefault();
					let lastKey = delegate.getLastKey(manager.focusedKey, $bb39c0fc1c19b34c$export$16792effe837dba3(e));
					manager.setFocusedKey(lastKey);
					if (lastKey != null) {
						if ($bb39c0fc1c19b34c$export$16792effe837dba3(e) && e.shiftKey && manager.selectionMode === "multiple") manager.extendSelection(lastKey);
						else if (selectOnFocus) manager.replaceSelection(lastKey);
					}
				}
				break;
			case "PageDown":
				if (delegate.getKeyPageBelow && manager.focusedKey != null) {
					let nextKey = delegate.getKeyPageBelow(manager.focusedKey);
					if (nextKey != null) {
						e.preventDefault();
						navigateToKey(nextKey);
					}
				}
				break;
			case "PageUp":
				if (delegate.getKeyPageAbove && manager.focusedKey != null) {
					let nextKey = delegate.getKeyPageAbove(manager.focusedKey);
					if (nextKey != null) {
						e.preventDefault();
						navigateToKey(nextKey);
					}
				}
				break;
			case "a":
				if ($bb39c0fc1c19b34c$export$16792effe837dba3(e) && manager.selectionMode === "multiple" && disallowSelectAll !== true) {
					e.preventDefault();
					manager.selectAll();
				}
				break;
			case "Escape":
				if (escapeKeyBehavior === "clearSelection" && !disallowEmptySelection && manager.selectedKeys.size !== 0) {
					e.stopPropagation();
					e.preventDefault();
					manager.clearSelection();
				}
				break;
			case "Tab": if (!allowsTabNavigation) {
				if (e.shiftKey) ref.current.focus();
				else {
					let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(ref.current, { tabbable: true });
					let next = void 0;
					let last;
					do {
						last = walker.lastChild();
						if (last) next = last;
					} while (last);
					let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576();
					if (next && (!$23f2114a1b82827e$export$b4f377a2b6254582(next) || activeElement && !$3b8b240c1bf84ab9$export$bebd5a1431fec25d(activeElement))) $1969ac565cfec8d0$export$de79e2c695e052f3(next);
				}
				break;
			}
		}
	};
	let scrollPos = (0, import_react.useRef)({
		top: 0,
		left: 0
	});
	$600b3cf69ae46262$export$90fc3a17d93f704c(scrollRef, "scroll", () => {
		scrollPos.current = {
			top: scrollRef.current?.scrollTop ?? 0,
			left: scrollRef.current?.scrollLeft ?? 0
		};
	});
	let onFocus = (e) => {
		if (manager.isFocused) {
			if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) manager.setFocused(false);
			return;
		}
		if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
		let modality = $8f5a2122b0992be3$export$630ff653c5ada6a9();
		manager.setFocused(true);
		let navigateToKey = (key) => {
			if (key != null) {
				manager.setFocusedKey(key);
				if (selectOnFocus && !manager.isSelected(key)) manager.replaceSelection(key);
			}
		};
		if (UNSTABLE_focusOnEntry && (modality === "keyboard" || modality === "virtual")) navigateToKey(UNSTABLE_focusOnEntry === "first" ? delegate.getFirstKey?.() : delegate.getLastKey?.());
		else if (manager.focusedKey == null) {
			let relatedTarget = e.relatedTarget;
			if (relatedTarget && e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING) navigateToKey(manager.lastSelectedKey ?? delegate.getLastKey?.());
			else navigateToKey(manager.firstSelectedKey ?? delegate.getFirstKey?.());
		} else if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollPos.current.top;
			scrollRef.current.scrollLeft = scrollPos.current.left;
		}
		if (manager.focusedKey != null && scrollRef.current) {
			let element = $22bbea12c2567021$export$c3d8340acf92597f(ref, manager.focusedKey);
			if (element instanceof HTMLElement) {
				if (!$23f2114a1b82827e$export$b4f377a2b6254582(element) && !shouldUseVirtualFocus) $1969ac565cfec8d0$export$de79e2c695e052f3(element);
				if (modality === "keyboard" || UNSTABLE_focusOnEntry && modality === "virtual") $51a3e22a5186a962$export$c826860796309d1b(element, { containingElement: ref.current });
			}
		}
	};
	let onBlur = (e) => {
		if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, e.relatedTarget)) manager.setFocused(false);
	};
	let shouldVirtualFocusFirst = (0, import_react.useRef)(false);
	$600b3cf69ae46262$export$90fc3a17d93f704c(ref, $8b2399d051d06d4c$export$831c820ad60f9d12, !shouldUseVirtualFocus ? void 0 : (e) => {
		let { detail } = e;
		e.stopPropagation();
		manager.setFocused(true);
		if (detail?.focusStrategy === "first") shouldVirtualFocusFirst.current = true;
	});
	let firstKey = delegate.getFirstKey?.() ?? null;
	$a475cdc2445827b5$export$72ef708ab07251f1(() => {
		if (shouldVirtualFocusFirst.current) {
			if (firstKey == null) {
				let previousActiveElement = $23f2114a1b82827e$export$cd4e5573fbe2b576();
				$b72f3f7b3b5f42c6$export$76e4e37e5339496d(ref.current);
				$b72f3f7b3b5f42c6$export$2b35b76d2e30e129(previousActiveElement, null);
				if (manager.collection.size > 0) shouldVirtualFocusFirst.current = false;
			} else {
				manager.setFocusedKey(firstKey);
				shouldVirtualFocusFirst.current = false;
			}
		}
	}, [firstKey, manager.collection.size]);
	$a475cdc2445827b5$export$72ef708ab07251f1(() => {
		if (manager.collection.size > 0) shouldVirtualFocusFirst.current = false;
	}, [manager.focusedKey]);
	$600b3cf69ae46262$export$90fc3a17d93f704c(ref, $8b2399d051d06d4c$export$447a38995de2c711, !shouldUseVirtualFocus ? void 0 : (e) => {
		e.stopPropagation();
		manager.setFocused(false);
		if (e.detail?.clearFocusKey) manager.setFocusedKey(null);
	});
	const autoFocusRef = (0, import_react.useRef)(autoFocus);
	const didAutoFocusRef = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (autoFocusRef.current) {
			let focusedKey = null;
			if (autoFocus === "first") focusedKey = delegate.getFirstKey?.() ?? null;
			if (autoFocus === "last") focusedKey = delegate.getLastKey?.() ?? null;
			let selectedKeys = manager.selectedKeys;
			if (selectedKeys.size) {
				for (let key of selectedKeys) if (manager.canSelectItem(key)) {
					focusedKey = key;
					break;
				}
			}
			manager.setFocused(true);
			manager.setFocusedKey(focusedKey);
			if (focusedKey == null && !shouldUseVirtualFocus && ref.current) $f192c2f16961cbe0$export$80f3e147d781571c(ref.current);
			if (manager.collection.size > 0) {
				autoFocusRef.current = false;
				didAutoFocusRef.current = true;
			}
		}
	});
	let lastFocusedKey = (0, import_react.useRef)(manager.focusedKey);
	let raf = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (manager.isFocused && manager.focusedKey != null && (manager.focusedKey !== lastFocusedKey.current || didAutoFocusRef.current) && scrollRef.current && ref.current) {
			let modality = $8f5a2122b0992be3$export$630ff653c5ada6a9();
			let element = $22bbea12c2567021$export$c3d8340acf92597f(ref, manager.focusedKey);
			if (!(element instanceof HTMLElement)) return;
			if (modality === "keyboard" || didAutoFocusRef.current) {
				if (raf.current) cancelAnimationFrame(raf.current);
				raf.current = requestAnimationFrame(() => {
					if (scrollRef.current) {
						$51a3e22a5186a962$export$53a0910f038337bd(scrollRef.current, element);
						if (modality !== "virtual") $51a3e22a5186a962$export$c826860796309d1b(element, { containingElement: ref.current });
					}
				});
			}
		}
		if (!shouldUseVirtualFocus && manager.isFocused && manager.focusedKey == null && lastFocusedKey.current != null && ref.current) $f192c2f16961cbe0$export$80f3e147d781571c(ref.current);
		lastFocusedKey.current = manager.focusedKey;
		didAutoFocusRef.current = false;
	});
	(0, import_react.useEffect)(() => {
		return () => {
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, []);
	$600b3cf69ae46262$export$90fc3a17d93f704c(ref, "react-aria-focus-scope-restore", (e) => {
		e.preventDefault();
		manager.setFocused(true);
	});
	let handlers = {
		onKeyDown,
		onFocus,
		onBlur,
		onMouseDown(e) {
			if (scrollRef.current === $23f2114a1b82827e$export$e58f029f0fbfdb29(e)) e.preventDefault();
		}
	};
	let { typeSelectProps } = $f5a4a9a3486154da$export$e32c88dfddc6e1d8({
		keyboardDelegate: delegate,
		selectionManager: manager
	});
	if (!disallowTypeAhead) handlers = $bbaa08b3cd72f041$export$9d1611c77c2fe928(typeSelectProps, handlers);
	let tabIndex = void 0;
	if (!shouldUseVirtualFocus) tabIndex = manager.focusedKey == null ? 0 : -1;
	let collectionId = $22bbea12c2567021$export$881eb0d9f3605d9d(manager.collection);
	return { collectionProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(handlers, {
		tabIndex,
		"data-collection": collectionId
	}) };
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useUpdateEffect.mjs
function $3c71b1595a147f24$export$496315a1608d9602(cb, dependencies) {
	const isInitialMount = (0, import_react.useRef)(true);
	const lastDeps = (0, import_react.useRef)(null);
	let cbEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(cb);
	(0, import_react.useEffect)(() => {
		isInitialMount.current = true;
		return () => {
			isInitialMount.current = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let prevDeps = lastDeps.current;
		if (isInitialMount.current) isInitialMount.current = false;
		else if (!prevDeps || dependencies.some((dep, i) => !Object.is(dep, prevDeps[i]))) cbEvent();
		lastDeps.current = dependencies;
	}, dependencies);
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/getChildNodes.mjs
function $cd5ea4b915021f1d$export$1005530eda016c13(node, collection) {
	if (typeof collection.getChildren === "function") return collection.getChildren(node.key);
	return node.childNodes;
}
function $cd5ea4b915021f1d$export$fbdeaa6a76694f71(iterable) {
	return $cd5ea4b915021f1d$export$5f3398f8733f90e2(iterable, 0);
}
function $cd5ea4b915021f1d$export$5f3398f8733f90e2(iterable, index) {
	if (index < 0) return void 0;
	let i = 0;
	for (let item of iterable) {
		if (i === index) return item;
		i++;
	}
}
function $cd5ea4b915021f1d$export$7475b2c64539e4cf(iterable) {
	let lastItem = void 0;
	for (let value of iterable) lastItem = value;
	return lastItem;
}
function $cd5ea4b915021f1d$export$8c434b3a7a4dad6(collection, a, b) {
	if (a.parentKey === b.parentKey) return a.index - b.index;
	let aAncestors = [...$cd5ea4b915021f1d$var$getAncestors(collection, a), a];
	let bAncestors = [...$cd5ea4b915021f1d$var$getAncestors(collection, b), b];
	let firstNonMatchingAncestor = aAncestors.slice(0, bAncestors.length).findIndex((a, i) => a !== bAncestors[i]);
	if (firstNonMatchingAncestor !== -1) {
		a = aAncestors[firstNonMatchingAncestor];
		b = bAncestors[firstNonMatchingAncestor];
		return a.index - b.index;
	}
	if (aAncestors.findIndex((node) => node === b) >= 0) return 1;
	else if (bAncestors.findIndex((node) => node === a) >= 0) return -1;
	return -1;
}
function $cd5ea4b915021f1d$var$getAncestors(collection, node) {
	let parents = [];
	let currNode = node;
	while (currNode?.parentKey != null) {
		currNode = collection.getItem(currNode.parentKey);
		if (currNode) parents.unshift(currNode);
	}
	return parents;
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/getItemCount.mjs
var $2efe10d3f1f9e31e$var$cache = /* @__PURE__ */ new WeakMap();
function $2efe10d3f1f9e31e$export$77d5aafae4e095b2(collection) {
	let count = $2efe10d3f1f9e31e$var$cache.get(collection);
	if (count != null) return count;
	let counter = 0;
	let countItems = (items) => {
		for (let item of items) if (item.type === "section") countItems($cd5ea4b915021f1d$export$1005530eda016c13(item, collection));
		else if (item.type === "item") counter++;
	};
	countItems(collection);
	$2efe10d3f1f9e31e$var$cache.set(collection, counter);
	return counter;
}
//#endregion
//#region node_modules/react-aria/dist/private/combobox/useComboBox.mjs
function $parcel$interopDefault(a) {
	return a && a.__esModule ? a.default : a;
}
function $bf505c7417d9b616$export$8c18d1b4f7232bbf(props, state) {
	let { buttonRef, popoverRef, inputRef, listBoxRef, keyboardDelegate, layoutDelegate, shouldFocusWrap, isReadOnly, isDisabled } = props;
	let backupBtnRef = (0, import_react.useRef)(null);
	buttonRef = buttonRef ?? backupBtnRef;
	let stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1($parcel$interopDefault($4fbc67f91f577596$exports), "@react-aria/combobox");
	let { menuTriggerProps, menuProps } = $f19b83c1486f45cc$export$dc9c12ed27dd1b49({
		type: "listbox",
		isDisabled: isDisabled || isReadOnly
	}, state, buttonRef);
	$cd088b5c0d7b27b4$export$3585ede4d035bf14.set(state, { id: menuProps.id });
	let { collection } = state;
	let { disabledKeys } = state.selectionManager;
	let delegate = (0, import_react.useMemo)(() => keyboardDelegate || new $ae8f8d98b2b18f2f$export$a05409b8bb224a5a({
		collection,
		disabledKeys,
		ref: listBoxRef,
		layoutDelegate
	}), [
		keyboardDelegate,
		layoutDelegate,
		collection,
		disabledKeys,
		listBoxRef
	]);
	let { collectionProps } = $d667c2af82d35a98$export$d6daf82dcd84e87c({
		selectionManager: state.selectionManager,
		keyboardDelegate: delegate,
		disallowTypeAhead: true,
		disallowEmptySelection: true,
		shouldFocusWrap,
		ref: inputRef,
		isVirtualized: true
	});
	let router = $caaf0dd3060ed57c$export$9a302a45f65d0572();
	let onKeyDown = (e) => {
		if (e.nativeEvent.isComposing) return;
		switch (e.key) {
			case "Enter":
			case "Tab":
				if (state.isOpen && e.key === "Enter") e.preventDefault();
				if (state.isOpen && listBoxRef.current && state.selectionManager.focusedKey != null) {
					let collectionItem = state.collection.getItem(state.selectionManager.focusedKey);
					if (collectionItem?.props.href) {
						let item = listBoxRef.current.querySelector(`[data-key="${CSS.escape(state.selectionManager.focusedKey.toString())}"]`);
						if (e.key === "Enter" && item instanceof HTMLAnchorElement) router.open(item, e, collectionItem.props.href, collectionItem.props.routerOptions);
						state.close();
						break;
					} else if (collectionItem?.props.onAction) {
						collectionItem.props.onAction();
						state.close();
						break;
					}
				}
				if (e.key === "Enter" || state.isOpen) state.commit();
				if (e.key === "Tab") e.continuePropagation();
				break;
			case "Escape":
				if (!state.selectionManager.isEmpty || state.inputValue === "" || props.allowsCustomValue) e.continuePropagation();
				state.revert();
				break;
			case "ArrowDown":
				state.open("first", "manual");
				break;
			case "ArrowUp":
				state.open("last", "manual");
				break;
			case "ArrowLeft":
			case "ArrowRight": state.selectionManager.setFocusedKey(null);
		}
	};
	let onBlur = (e) => {
		let blurFromButton = buttonRef?.current && buttonRef.current === e.relatedTarget;
		let blurIntoPopover = $23f2114a1b82827e$export$4282f70798064fe0(popoverRef.current, e.relatedTarget);
		if (blurFromButton || blurIntoPopover) return;
		if (props.onBlur) props.onBlur(e);
		state.setFocused(false);
	};
	let onFocus = (e) => {
		if (state.isFocused) return;
		if (props.onFocus) props.onFocus(e);
		state.setFocused(true);
	};
	let valueId = $bf505c7417d9b616$var$useValueId([state.selectionManager.selectedKeys, state.selectionManager.selectionMode]);
	let { isInvalid, validationErrors, validationDetails } = state.displayValidation;
	let { labelProps, inputProps, descriptionProps, errorMessageProps } = $054f71d2330da2e3$export$712718f7aec83d5({
		...props,
		isRequired: props.selectionMode === "multiple" ? props.isRequired && state.selectionManager.isEmpty : props.isRequired,
		onChange: state.setInputValue,
		onKeyDown: !isReadOnly ? $a4e76a5424781910$export$e08e3b67e392101e(state.isOpen && collectionProps.onKeyDown, onKeyDown, props.onKeyDown) : props.onKeyDown,
		onBlur,
		value: state.inputValue,
		defaultValue: state.defaultInputValue,
		onFocus,
		autoComplete: "off",
		validate: void 0,
		[$fd2148440a13ec26$export$a763b9476acd3eb]: state,
		"aria-describedby": [valueId, props["aria-describedby"]].filter(Boolean).join(" ") || void 0
	}, inputRef);
	$3274bf1495747a7b$export$5add1d006293d136(inputRef, state.defaultValue, state.setValue);
	let onPress = (e) => {
		if (e.pointerType === "touch") {
			inputRef.current?.focus();
			state.toggle(null, "manual");
		}
	};
	let onPressStart = (e) => {
		if (e.pointerType !== "touch") {
			inputRef.current?.focus();
			state.toggle(e.pointerType === "keyboard" || e.pointerType === "virtual" ? "first" : null, "manual");
		}
	};
	let triggerLabelProps = $e8ac3c3f5d4bae7f$export$d6875122194c7b44({
		id: menuTriggerProps.id,
		"aria-label": stringFormatter.format("buttonLabel"),
		"aria-labelledby": props["aria-labelledby"] || labelProps.id
	});
	let listBoxProps = $e8ac3c3f5d4bae7f$export$d6875122194c7b44({
		id: menuProps.id,
		"aria-label": stringFormatter.format("listboxLabel"),
		"aria-labelledby": props["aria-labelledby"] || labelProps.id
	});
	let lastEventTime = (0, import_react.useRef)(0);
	let onTouchEnd = (e) => {
		if (isDisabled || isReadOnly) return;
		if (e.timeStamp - lastEventTime.current < 500) {
			e.preventDefault();
			inputRef.current?.focus();
			return;
		}
		let rect = $23f2114a1b82827e$export$e58f029f0fbfdb29(e).getBoundingClientRect();
		let touch = e.changedTouches[0];
		let centerX = Math.ceil(rect.left + .5 * rect.width);
		let centerY = Math.ceil(rect.top + .5 * rect.height);
		if (touch.clientX === centerX && touch.clientY === centerY) {
			e.preventDefault();
			inputRef.current?.focus();
			state.toggle(null, "manual");
			lastEventTime.current = e.timeStamp;
		}
	};
	let focusedItem = state.selectionManager.focusedKey != null && state.isOpen ? state.collection.getItem(state.selectionManager.focusedKey) : void 0;
	let sectionKey = focusedItem?.parentKey ?? null;
	let itemKey = state.selectionManager.focusedKey ?? null;
	let lastSection = (0, import_react.useRef)(sectionKey);
	let lastItem = (0, import_react.useRef)(itemKey);
	(0, import_react.useEffect)(() => {
		if ($2add3ce32c6007eb$export$e1865c3bedcd822b() && focusedItem != null && itemKey != null && itemKey !== lastItem.current) {
			let isSelected = state.selectionManager.isSelected(itemKey);
			let section = sectionKey != null ? state.collection.getItem(sectionKey) : null;
			let sectionTitle = section?.["aria-label"] || (typeof section?.rendered === "string" ? section.rendered : "") || "";
			let announcement = stringFormatter.format("focusAnnouncement", {
				isGroupChange: (section && sectionKey !== lastSection.current) ?? false,
				groupTitle: sectionTitle,
				groupCount: section ? [...$cd5ea4b915021f1d$export$1005530eda016c13(section, state.collection)].length : 0,
				optionText: focusedItem["aria-label"] || focusedItem.textValue || "",
				isSelected
			});
			$a46cf152bb926da5$export$a9b970dcc4ae71a9(announcement);
		}
		lastSection.current = sectionKey;
		lastItem.current = itemKey;
	});
	let optionCount = $2efe10d3f1f9e31e$export$77d5aafae4e095b2(state.collection);
	let lastSize = (0, import_react.useRef)(optionCount);
	let lastOpen = (0, import_react.useRef)(state.isOpen);
	(0, import_react.useEffect)(() => {
		let didOpenWithoutFocusedItem = state.isOpen !== lastOpen.current && (state.selectionManager.focusedKey == null || $2add3ce32c6007eb$export$e1865c3bedcd822b());
		if (state.isOpen && (didOpenWithoutFocusedItem || optionCount !== lastSize.current)) {
			let announcement = stringFormatter.format("countAnnouncement", { optionCount });
			$a46cf152bb926da5$export$a9b970dcc4ae71a9(announcement);
		}
		lastSize.current = optionCount;
		lastOpen.current = state.isOpen;
	});
	let lastSelectedKey = (0, import_react.useRef)(state.selectedKey);
	(0, import_react.useEffect)(() => {
		if ($2add3ce32c6007eb$export$e1865c3bedcd822b() && state.isFocused && state.selectedItem && state.selectedKey !== lastSelectedKey.current) {
			let optionText = state.selectedItem["aria-label"] || state.selectedItem.textValue || "";
			let announcement = stringFormatter.format("selectedAnnouncement", { optionText });
			$a46cf152bb926da5$export$a9b970dcc4ae71a9(announcement);
		}
		lastSelectedKey.current = state.selectedKey;
	});
	(0, import_react.useEffect)(() => {
		if (state.isOpen) return $58196c8d6a1f38fc$export$1c3ebcada18427bf([inputRef.current, popoverRef.current].filter((element) => element != null));
	}, [
		state.isOpen,
		inputRef,
		popoverRef
	]);
	$3c71b1595a147f24$export$496315a1608d9602(() => {
		if (!focusedItem && inputRef.current && $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(inputRef.current)) === inputRef.current) $b72f3f7b3b5f42c6$export$2b35b76d2e30e129(inputRef.current, null);
	}, [focusedItem]);
	$600b3cf69ae46262$export$90fc3a17d93f704c(listBoxRef, "react-aria-item-action", state.isOpen ? () => {
		state.close();
	} : void 0);
	return {
		labelProps,
		buttonProps: {
			...menuTriggerProps,
			...triggerLabelProps,
			excludeFromTabOrder: true,
			preventFocusOnPress: true,
			onPress,
			onPressStart,
			isDisabled: isDisabled || isReadOnly
		},
		inputProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(inputProps, {
			role: "combobox",
			"aria-expanded": menuTriggerProps["aria-expanded"],
			"aria-controls": state.isOpen ? menuProps.id : void 0,
			"aria-autocomplete": "list",
			"aria-activedescendant": focusedItem ? $cd088b5c0d7b27b4$export$9145995848b05025(state, focusedItem.key) : void 0,
			onTouchEnd,
			autoCorrect: "off",
			spellCheck: "false"
		}),
		listBoxProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(menuProps, listBoxProps, {
			onAction: void 0,
			autoFocus: state.focusStrategy || true,
			shouldUseVirtualFocus: true,
			shouldSelectOnPressUp: true,
			shouldFocusOnHover: true,
			linkBehavior: "selection",
			["UNSTABLE_itemBehavior"]: "action"
		}),
		valueProps: { id: valueId },
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
		validationDetails
	};
}
function $bf505c7417d9b616$var$useValueId(depArray = []) {
	let id = $390e54f620492c70$export$f680877a34711e37();
	let [exists, setExists] = (0, import_react.useState)(true);
	let [lastDeps, setLastDeps] = (0, import_react.useState)(depArray);
	if (lastDeps.some((v, i) => !Object.is(v, depArray[i]))) {
		setExists(true);
		setLastDeps(depArray);
	}
	(0, import_react.useEffect)(() => {
		if (exists && !document.getElementById(id)) setExists(false);
	}, [
		id,
		exists,
		lastDeps
	]);
	return exists ? id : void 0;
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useCollator.mjs
var $673d46fce3e5717d$var$cache = /* @__PURE__ */ new Map();
function $673d46fce3e5717d$export$a16aca283550c30d(options) {
	let { locale } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($673d46fce3e5717d$var$cache.has(cacheKey)) return $673d46fce3e5717d$var$cache.get(cacheKey);
	let formatter = new Intl.Collator(locale, options);
	$673d46fce3e5717d$var$cache.set(cacheKey, formatter);
	return formatter;
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useFilter.mjs
function $ef182bb9912241d8$export$3274cf84b703fff(options) {
	let collator = $673d46fce3e5717d$export$a16aca283550c30d({
		usage: "search",
		...options
	});
	let startsWith = (0, import_react.useCallback)((string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.compare(string.slice(0, substring.length), substring) === 0;
	}, [collator]);
	let endsWith = (0, import_react.useCallback)((string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		return collator.compare(string.slice(-substring.length), substring) === 0;
	}, [collator]);
	let contains = (0, import_react.useCallback)((string, substring) => {
		if (substring.length === 0) return true;
		string = string.normalize("NFC");
		substring = substring.normalize("NFC");
		let scan = 0;
		let sliceLen = substring.length;
		for (; scan + sliceLen <= string.length; scan++) {
			let slice = string.slice(scan, scan + sliceLen);
			if (collator.compare(substring, slice) === 0) return true;
		}
		return false;
	}, [collator]);
	return (0, import_react.useMemo)(() => ({
		startsWith,
		endsWith,
		contains
	}), [
		startsWith,
		endsWith,
		contains
	]);
}
//#endregion
//#region node_modules/react-stately/dist/private/list/ListCollection.mjs
var $f664a81d022446b5$export$d085fb9e920b5ca7 = class {
	constructor(nodes) {
		this.keyMap = /* @__PURE__ */ new Map();
		this.firstKey = null;
		this.lastKey = null;
		this.iterable = nodes;
		let visit = (node) => {
			this.keyMap.set(node.key, node);
			if (node.childNodes && node.type === "section") for (let child of node.childNodes) visit(child);
		};
		for (let node of nodes) visit(node);
		let last = null;
		let index = 0;
		let size = 0;
		for (let [key, node] of this.keyMap) {
			if (last) {
				last.nextKey = key;
				node.prevKey = last.key;
			} else {
				this.firstKey = key;
				node.prevKey = void 0;
			}
			if (node.type === "item") node.index = index++;
			if (node.type === "section" || node.type === "item") size++;
			last = node;
			last.nextKey = void 0;
		}
		this._size = size;
		this.lastKey = last?.key ?? null;
	}
	*[Symbol.iterator]() {
		yield* this.iterable;
	}
	get size() {
		return this._size;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	getKeyBefore(key) {
		let node = this.keyMap.get(key);
		return node ? node.prevKey ?? null : null;
	}
	getKeyAfter(key) {
		let node = this.keyMap.get(key);
		return node ? node.nextKey ?? null : null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		return this.lastKey;
	}
	getItem(key) {
		return this.keyMap.get(key) ?? null;
	}
	at(idx) {
		const keys = [...this.getKeys()];
		return this.getItem(keys[idx]);
	}
	getChildren(key) {
		return this.keyMap.get(key)?.childNodes || [];
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/selection/Selection.mjs
var $8b2540e09867b15e$export$52baac22726c72bf = class $8b2540e09867b15e$export$52baac22726c72bf extends Set {
	constructor(keys, anchorKey, currentKey) {
		super(keys);
		if (keys instanceof $8b2540e09867b15e$export$52baac22726c72bf) {
			this.anchorKey = anchorKey ?? keys.anchorKey;
			this.currentKey = currentKey ?? keys.currentKey;
		} else {
			this.anchorKey = anchorKey ?? null;
			this.currentKey = currentKey ?? null;
		}
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/selection/useMultipleSelectionState.mjs
function $60f19cefd567a3e4$var$equalSets(setA, setB) {
	if (setA.size !== setB.size) return false;
	for (let item of setA) if (!setB.has(item)) return false;
	return true;
}
function $60f19cefd567a3e4$export$253fe78d46329472(props) {
	let { selectionMode = "none", disallowEmptySelection = false, allowDuplicateSelectionEvents, selectionBehavior: selectionBehaviorProp = "toggle", disabledBehavior = "all" } = props;
	let isFocusedRef = (0, import_react.useRef)(false);
	let [, setFocused] = (0, import_react.useState)(false);
	let focusedKeyRef = (0, import_react.useRef)(null);
	let childFocusStrategyRef = (0, import_react.useRef)(null);
	let [, setFocusedKey] = (0, import_react.useState)(null);
	let selectedKeysProp = (0, import_react.useMemo)(() => $60f19cefd567a3e4$var$convertSelection(props.selectedKeys), [props.selectedKeys]);
	let defaultSelectedKeys = (0, import_react.useMemo)(() => $60f19cefd567a3e4$var$convertSelection(props.defaultSelectedKeys, new $8b2540e09867b15e$export$52baac22726c72bf()), [props.defaultSelectedKeys]);
	let [selectedKeys, setSelectedKeys] = $3e6197669829fe11$export$40bfa8c7b0832715(selectedKeysProp, defaultSelectedKeys, props.onSelectionChange);
	let disabledKeysProp = (0, import_react.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [props.disabledKeys]);
	let [selectionBehavior, setSelectionBehavior] = (0, import_react.useState)(selectionBehaviorProp);
	if (selectionBehaviorProp === "replace" && selectionBehavior === "toggle" && typeof selectedKeys === "object" && selectedKeys.size === 0) setSelectionBehavior("replace");
	let lastSelectionBehavior = (0, import_react.useRef)(selectionBehaviorProp);
	(0, import_react.useEffect)(() => {
		if (selectionBehaviorProp !== lastSelectionBehavior.current) {
			setSelectionBehavior(selectionBehaviorProp);
			lastSelectionBehavior.current = selectionBehaviorProp;
		}
	}, [selectionBehaviorProp]);
	return {
		selectionMode,
		disallowEmptySelection,
		selectionBehavior,
		setSelectionBehavior,
		get isFocused() {
			return isFocusedRef.current;
		},
		setFocused(f) {
			isFocusedRef.current = f;
			setFocused(f);
		},
		get focusedKey() {
			return focusedKeyRef.current;
		},
		get childFocusStrategy() {
			return childFocusStrategyRef.current;
		},
		setFocusedKey(k, childFocusStrategy = "first") {
			focusedKeyRef.current = k;
			childFocusStrategyRef.current = childFocusStrategy;
			setFocusedKey(k);
		},
		selectedKeys,
		setSelectedKeys(keys) {
			if (allowDuplicateSelectionEvents || !$60f19cefd567a3e4$var$equalSets(keys, selectedKeys)) setSelectedKeys(keys);
		},
		disabledKeys: disabledKeysProp,
		disabledBehavior
	};
}
function $60f19cefd567a3e4$var$convertSelection(selection, defaultValue) {
	if (!selection) return defaultValue;
	return selection === "all" ? "all" : new $8b2540e09867b15e$export$52baac22726c72bf(selection);
}
//#endregion
//#region node_modules/react-stately/dist/private/selection/SelectionManager.mjs
var $4a07ac835f260f78$export$6c8a5aaad13c9852 = class $4a07ac835f260f78$export$6c8a5aaad13c9852 {
	constructor(collection, state, options) {
		this.collection = collection;
		this.state = state;
		this.allowsCellSelection = options?.allowsCellSelection ?? false;
		this._isSelectAll = null;
		this.layoutDelegate = options?.layoutDelegate || null;
		this.fullCollection = options?.fullCollection || null;
	}
	/**
	* The type of selection that is allowed in the collection.
	*/ get selectionMode() {
		return this.state.selectionMode;
	}
	/**
	* Whether the collection allows empty selection.
	*/ get disallowEmptySelection() {
		return this.state.disallowEmptySelection;
	}
	/**
	* The selection behavior for the collection.
	*/ get selectionBehavior() {
		return this.state.selectionBehavior;
	}
	/**
	* Sets the selection behavior for the collection.
	*/ setSelectionBehavior(selectionBehavior) {
		this.state.setSelectionBehavior(selectionBehavior);
	}
	/**
	* Whether the collection is currently focused.
	*/ get isFocused() {
		return this.state.isFocused;
	}
	/**
	* Sets whether the collection is focused.
	*/ setFocused(isFocused) {
		this.state.setFocused(isFocused);
	}
	/**
	* The current focused key in the collection.
	*/ get focusedKey() {
		return this.state.focusedKey;
	}
	/** Whether the first or last child of the focused key should receive focus. */ get childFocusStrategy() {
		return this.state.childFocusStrategy;
	}
	/**
	* Sets the focused key.
	*/ setFocusedKey(key, childFocusStrategy) {
		if (key == null || this.collection.getItem(key)) this.state.setFocusedKey(key, childFocusStrategy);
	}
	/**
	* The currently selected keys in the collection.
	*/ get selectedKeys() {
		return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
	}
	/**
	* The raw selection value for the collection.
	* Either 'all' for select all, or a set of keys.
	*/ get rawSelection() {
		return this.state.selectedKeys;
	}
	/**
	* Returns whether a key is selected.
	*/ isSelected(key) {
		if (this.state.selectionMode === "none") return false;
		let mappedKey = this.getKey(key);
		if (mappedKey == null) return false;
		return this.state.selectedKeys === "all" ? this.canSelectItem(mappedKey) : this.state.selectedKeys.has(mappedKey);
	}
	/**
	* Whether the selection is empty.
	*/ get isEmpty() {
		return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
	}
	/**
	* Whether all items in the collection are selected.
	*/ get isSelectAll() {
		if (this.isEmpty) return false;
		if (this.state.selectedKeys === "all") return true;
		if (this._isSelectAll != null) return this._isSelectAll;
		let allKeys = this.getSelectAllKeys();
		let selectedKeys = this.state.selectedKeys;
		this._isSelectAll = allKeys.every((k) => selectedKeys.has(k));
		return this._isSelectAll;
	}
	get firstSelectedKey() {
		let first = null;
		for (let key of this.state.selectedKeys) {
			let item = this.collection.getItem(key);
			if (!first || item && $cd5ea4b915021f1d$export$8c434b3a7a4dad6(this.collection, item, first) < 0) first = item;
		}
		return first?.key ?? null;
	}
	get lastSelectedKey() {
		let last = null;
		for (let key of this.state.selectedKeys) {
			let item = this.collection.getItem(key);
			if (!last || item && $cd5ea4b915021f1d$export$8c434b3a7a4dad6(this.collection, item, last) > 0) last = item;
		}
		return last?.key ?? null;
	}
	get disabledKeys() {
		return this.state.disabledKeys;
	}
	get disabledBehavior() {
		return this.state.disabledBehavior;
	}
	/**
	* Extends the selection to the given key.
	*/ extendSelection(toKey) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single") {
			this.replaceSelection(toKey);
			return;
		}
		let mappedToKey = this.getKey(toKey);
		if (mappedToKey == null) return;
		let selection;
		if (this.state.selectedKeys === "all") selection = new $8b2540e09867b15e$export$52baac22726c72bf([mappedToKey], mappedToKey, mappedToKey);
		else {
			let selectedKeys = this.state.selectedKeys;
			let anchorKey = selectedKeys.anchorKey ?? mappedToKey;
			selection = new $8b2540e09867b15e$export$52baac22726c72bf(selectedKeys, anchorKey, mappedToKey);
			for (let key of this.getKeyRange(anchorKey, selectedKeys.currentKey ?? mappedToKey)) selection.delete(key);
			for (let key of this.getKeyRange(mappedToKey, anchorKey)) if (this.canSelectItem(key)) selection.add(key);
		}
		this.state.setSelectedKeys(selection);
	}
	getKeyRange(from, to) {
		let fromItem = this.collection.getItem(from);
		let toItem = this.collection.getItem(to);
		if (fromItem && toItem) {
			if ($cd5ea4b915021f1d$export$8c434b3a7a4dad6(this.collection, fromItem, toItem) <= 0) return this.getKeyRangeInternal(from, to);
			return this.getKeyRangeInternal(to, from);
		}
		return [];
	}
	getKeyRangeInternal(from, to) {
		if (this.layoutDelegate?.getKeyRange) return this.layoutDelegate.getKeyRange(from, to);
		let keys = [];
		let key = from;
		while (key != null) {
			let item = this.collection.getItem(key);
			if (item && (item.type === "item" || item.type === "cell" && this.allowsCellSelection)) keys.push(key);
			if (key === to) return keys;
			key = this.collection.getKeyAfter(key);
		}
		return [];
	}
	getKey(key) {
		let item = this.collection.getItem(key);
		if (!item) return key;
		if (item.type === "cell" && this.allowsCellSelection) return key;
		while (item && item.type !== "item" && item.parentKey != null) item = this.collection.getItem(item.parentKey);
		if (!item || item.type !== "item") return null;
		return item.key;
	}
	/**
	* Toggles whether the given key is selected.
	*/ toggleSelection(key) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single" && !this.isSelected(key)) {
			this.replaceSelection(key);
			return;
		}
		let mappedKey = this.getKey(key);
		if (mappedKey == null) return;
		let keys = new $8b2540e09867b15e$export$52baac22726c72bf(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
		if (keys.has(mappedKey)) keys.delete(mappedKey);
		else if (this.canSelectItem(mappedKey)) {
			keys.add(mappedKey);
			keys.anchorKey = mappedKey;
			keys.currentKey = mappedKey;
		}
		if (this.disallowEmptySelection && keys.size === 0) return;
		this.state.setSelectedKeys(keys);
	}
	/**
	* Replaces the selection with only the given key.
	*/ replaceSelection(key) {
		if (this.selectionMode === "none") return;
		let mappedKey = this.getKey(key);
		if (mappedKey == null) return;
		let selection = this.canSelectItem(mappedKey) ? new $8b2540e09867b15e$export$52baac22726c72bf([mappedKey], mappedKey, mappedKey) : new $8b2540e09867b15e$export$52baac22726c72bf();
		this.state.setSelectedKeys(selection);
	}
	/**
	* Replaces the selection with the given keys.
	*/ setSelectedKeys(keys) {
		if (this.selectionMode === "none") return;
		let selection = new $8b2540e09867b15e$export$52baac22726c72bf();
		for (let key of keys) {
			let mappedKey = this.getKey(key);
			if (mappedKey != null) {
				selection.add(mappedKey);
				if (this.selectionMode === "single") break;
			}
		}
		this.state.setSelectedKeys(selection);
	}
	getSelectAllKeys() {
		let collection = this.fullCollection ?? this.collection;
		let keys = [];
		let addKeys = (key) => {
			while (key != null) {
				if (this.canSelectItemIn(key, collection)) {
					let item = collection.getItem(key);
					if (item?.type === "item") keys.push(key);
					if (item?.hasChildNodes && (this.allowsCellSelection || item.type !== "item")) addKeys($cd5ea4b915021f1d$export$fbdeaa6a76694f71($cd5ea4b915021f1d$export$1005530eda016c13(item, collection))?.key ?? null);
				}
				key = collection.getKeyAfter(key);
			}
		};
		addKeys(collection.getFirstKey());
		return keys;
	}
	/**
	* Selects all items in the collection.
	*/ selectAll() {
		if (!this.isSelectAll && this.selectionMode === "multiple") this.state.setSelectedKeys("all");
	}
	/**
	* Removes all keys from the selection.
	*/ clearSelection() {
		if (!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0)) this.state.setSelectedKeys(new $8b2540e09867b15e$export$52baac22726c72bf());
	}
	/**
	* Toggles between select all and an empty selection.
	*/ toggleSelectAll() {
		if (this.isSelectAll) this.clearSelection();
		else this.selectAll();
	}
	select(key, e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single") {
			if (this.isSelected(key) && !this.disallowEmptySelection) this.toggleSelection(key);
			else this.replaceSelection(key);
		} else if (this.selectionBehavior === "toggle" || e && (e.pointerType === "touch" || e.pointerType === "virtual")) this.toggleSelection(key);
		else this.replaceSelection(key);
	}
	/**
	* Returns whether the current selection is equal to the given selection.
	*/ isSelectionEqual(selection) {
		if (selection === this.state.selectedKeys) return true;
		let selectedKeys = this.selectedKeys;
		if (selection.size !== selectedKeys.size) return false;
		for (let key of selection) if (!selectedKeys.has(key)) return false;
		for (let key of selectedKeys) if (!selection.has(key)) return false;
		return true;
	}
	canSelectItem(key) {
		return this.canSelectItemIn(key, this.collection);
	}
	canSelectItemIn(key, collection) {
		if (this.state.selectionMode === "none" || this.state.disabledKeys.has(key)) return false;
		let item = collection.getItem(key);
		if (!item || item?.props?.isDisabled || item.type === "cell" && !this.allowsCellSelection) return false;
		return true;
	}
	isDisabled(key) {
		let item = this.collection.getItem(key);
		return this.state.disabledBehavior === "all" && (this.state.disabledKeys.has(key) || !!item?.props?.isDisabled) && item?.props?.disabledBehavior !== "selection";
	}
	isLink(key) {
		return !!this.collection.getItem(key)?.props?.href;
	}
	getItemProps(key) {
		return this.collection.getItem(key)?.props;
	}
	withCollection(collection) {
		return new $4a07ac835f260f78$export$6c8a5aaad13c9852(collection, this.state, {
			allowsCellSelection: this.allowsCellSelection,
			layoutDelegate: this.layoutDelegate || void 0,
			fullCollection: this.fullCollection ?? this.collection
		});
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/collections/CollectionBuilder.mjs
var $bda7a7e55e1ff206$export$bf788dd355e3a401 = class {
	build(props, context) {
		this.context = context;
		return $bda7a7e55e1ff206$var$iterable(() => this.iterateCollection(props));
	}
	*iterateCollection(props) {
		let { children, items } = props;
		if (import_react.isValidElement(children) && children.type === import_react.Fragment) yield* this.iterateCollection({
			children: children.props.children,
			items
		});
		else if (typeof children === "function") {
			if (!items) throw new Error("props.children was a function but props.items is missing");
			let index = 0;
			for (let item of items) {
				yield* this.getFullNode({
					value: item,
					index
				}, { renderer: children });
				index++;
			}
		} else {
			let items = [];
			import_react.Children.forEach(children, (child) => {
				if (child) items.push(child);
			});
			let index = 0;
			for (let item of items) {
				let nodes = this.getFullNode({
					element: item,
					index
				}, {});
				for (let node of nodes) {
					index++;
					yield node;
				}
			}
		}
	}
	getKey(item, partialNode, state, parentKey) {
		if (item.key != null) return item.key;
		if (partialNode.type === "cell" && partialNode.key != null) return `${parentKey}${partialNode.key}`;
		let v = partialNode.value;
		if (v != null) {
			let key = v.key ?? v.id;
			if (key == null) throw new Error("No key found for item");
			return key;
		}
		return parentKey ? `${parentKey}.${partialNode.index}` : `$.${partialNode.index}`;
	}
	getChildState(state, partialNode) {
		return { renderer: partialNode.renderer || state.renderer };
	}
	*getFullNode(partialNode, state, parentKey, parentNode) {
		if (import_react.isValidElement(partialNode.element) && partialNode.element.type === import_react.Fragment) {
			let children = [];
			import_react.Children.forEach(partialNode.element.props.children, (child) => {
				children.push(child);
			});
			let index = partialNode.index ?? 0;
			for (const child of children) yield* this.getFullNode({
				element: child,
				index: index++
			}, state, parentKey, parentNode);
			return;
		}
		let element = partialNode.element;
		if (!element && partialNode.value && state && state.renderer) {
			let cached = this.cache.get(partialNode.value);
			if (cached && (!cached.shouldInvalidate || !cached.shouldInvalidate(this.context))) {
				cached.index = partialNode.index;
				cached.parentKey = parentNode ? parentNode.key : null;
				yield cached;
				return;
			}
			element = state.renderer(partialNode.value);
		}
		if (import_react.isValidElement(element)) {
			let type = element.type;
			if (typeof type !== "function" && typeof type.getCollectionNode !== "function") {
				let name = element.type;
				throw new Error(`Unknown element <${name}> in collection.`);
			}
			let childNodes = type.getCollectionNode(element.props, this.context);
			let index = partialNode.index ?? 0;
			let result = childNodes.next();
			while (!result.done && result.value) {
				let childNode = result.value;
				partialNode.index = index;
				let nodeKey = childNode.key ?? null;
				if (nodeKey == null) nodeKey = childNode.element ? null : this.getKey(element, partialNode, state, parentKey);
				let children = [...this.getFullNode({
					...childNode,
					key: nodeKey,
					index,
					wrapper: $bda7a7e55e1ff206$var$compose(partialNode.wrapper, childNode.wrapper)
				}, this.getChildState(state, childNode), parentKey ? `${parentKey}${element.key}` : element.key, parentNode)];
				for (let node of children) {
					node.value = childNode.value ?? partialNode.value ?? null;
					if (node.value) this.cache.set(node.value, node);
					if (partialNode.type && node.type !== partialNode.type) throw new Error(`Unsupported type <${$bda7a7e55e1ff206$var$capitalize(node.type)}> in <${$bda7a7e55e1ff206$var$capitalize(parentNode?.type ?? "unknown parent type")}>. Only <${$bda7a7e55e1ff206$var$capitalize(partialNode.type)}> is supported.`);
					index++;
					yield node;
				}
				result = childNodes.next(children);
			}
			return;
		}
		if (partialNode.key == null || partialNode.type == null) return;
		let builder = this;
		let node = {
			type: partialNode.type,
			props: partialNode.props,
			key: partialNode.key,
			parentKey: parentNode ? parentNode.key : null,
			value: partialNode.value ?? null,
			level: (parentNode?.level ?? 0) + (parentNode?.type === "item" ? 1 : 0),
			index: partialNode.index,
			rendered: partialNode.rendered,
			textValue: partialNode.textValue ?? "",
			"aria-label": partialNode["aria-label"],
			wrapper: partialNode.wrapper,
			shouldInvalidate: partialNode.shouldInvalidate,
			hasChildNodes: partialNode.hasChildNodes || false,
			childNodes: $bda7a7e55e1ff206$var$iterable(function* () {
				if (!partialNode.hasChildNodes || !partialNode.childNodes) return;
				let index = 0;
				for (let child of partialNode.childNodes()) {
					if (child.key != null) child.key = `${node.key}${child.key}`;
					let nodes = builder.getFullNode({
						...child,
						index
					}, builder.getChildState(state, child), node.key, node);
					for (let node of nodes) {
						index++;
						yield node;
					}
				}
			})
		};
		yield node;
	}
	constructor() {
		this.cache = /* @__PURE__ */ new WeakMap();
	}
};
function $bda7a7e55e1ff206$var$iterable(iterator) {
	let cache = [];
	let iterable = null;
	return { *[Symbol.iterator]() {
		for (let item of cache) yield item;
		if (!iterable) iterable = iterator();
		for (let item of iterable) {
			cache.push(item);
			yield item;
		}
	} };
}
function $bda7a7e55e1ff206$var$compose(outer, inner) {
	if (outer && inner) return (element) => outer(inner(element));
	if (outer) return outer;
	if (inner) return inner;
}
function $bda7a7e55e1ff206$var$capitalize(str) {
	return str[0].toUpperCase() + str.slice(1);
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/useCollection.mjs
function $d03379b88399b8c5$export$6cd28814d92fa9c9(props, factory, context) {
	let builder = (0, import_react.useMemo)(() => new $bda7a7e55e1ff206$export$bf788dd355e3a401(), []);
	let { children, items, collection } = props;
	return (0, import_react.useMemo)(() => {
		if (collection) return collection;
		return factory(builder.build({
			children,
			items
		}, context));
	}, [
		builder,
		children,
		items,
		collection,
		context,
		factory
	]);
}
//#endregion
//#region node_modules/react-stately/dist/private/list/useListState.mjs
function $b14b6f590b50af39$export$2f645645f7bca764(props) {
	let { filter, layoutDelegate } = props;
	let selectionState = $60f19cefd567a3e4$export$253fe78d46329472(props);
	let disabledKeys = (0, import_react.useMemo)(() => props.disabledKeys ? new Set(props.disabledKeys) : /* @__PURE__ */ new Set(), [props.disabledKeys]);
	let collection = $d03379b88399b8c5$export$6cd28814d92fa9c9(props, (0, import_react.useCallback)((nodes) => filter ? new $f664a81d022446b5$export$d085fb9e920b5ca7(filter(nodes)) : new $f664a81d022446b5$export$d085fb9e920b5ca7(nodes), [filter]), (0, import_react.useMemo)(() => ({ suppressTextValueWarning: props.suppressTextValueWarning }), [props.suppressTextValueWarning]));
	let selectionManager = (0, import_react.useMemo)(() => new $4a07ac835f260f78$export$6c8a5aaad13c9852(collection, selectionState, { layoutDelegate }), [
		collection,
		selectionState,
		layoutDelegate
	]);
	$b14b6f590b50af39$var$useFocusedKeyReset(collection, selectionManager);
	return {
		collection,
		disabledKeys,
		selectionManager
	};
}
function $b14b6f590b50af39$var$useFocusedKeyReset(collection, selectionManager) {
	const cachedCollection = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (selectionManager.focusedKey != null && !collection.getItem(selectionManager.focusedKey) && cachedCollection.current) {
			let key = cachedCollection.current.getKeyAfter(selectionManager.focusedKey);
			let nextFocusedKey = null;
			while (key != null) {
				let node = collection.getItem(key);
				if (node && node.type === "item" && !selectionManager.isDisabled(key)) {
					nextFocusedKey = key;
					break;
				}
				key = cachedCollection.current.getKeyAfter(key);
			}
			if (nextFocusedKey == null) {
				key = cachedCollection.current.getKeyBefore(selectionManager.focusedKey);
				while (key != null) {
					let node = collection.getItem(key);
					if (node && node.type === "item" && !selectionManager.isDisabled(key)) {
						nextFocusedKey = key;
						break;
					}
					key = cachedCollection.current.getKeyBefore(key);
				}
			}
			selectionManager.setFocusedKey(nextFocusedKey);
		}
		cachedCollection.current = collection;
	}, [collection, selectionManager]);
}
//#endregion
//#region node_modules/react-stately/dist/private/combobox/useComboBoxState.mjs
function $120eca7b9c40f820$export$b453a3bfd4a5fa9e(props) {
	let { defaultFilter, menuTrigger = "input", allowsEmptyCollection = false, allowsCustomValue, shouldCloseOnBlur = true, selectionMode = "single" } = props;
	let [showAllItems, setShowAllItems] = (0, import_react.useState)(false);
	let [isFocused, setFocusedState] = (0, import_react.useState)(false);
	let [focusStrategy, setFocusStrategy] = (0, import_react.useState)(null);
	let defaultValue = (0, import_react.useMemo)(() => {
		return props.defaultValue !== void 0 ? props.defaultValue : selectionMode === "single" ? props.defaultSelectedKey ?? null : [];
	}, [
		props.defaultValue,
		props.defaultSelectedKey,
		selectionMode
	]);
	let value = (0, import_react.useMemo)(() => {
		return props.value !== void 0 ? props.value : selectionMode === "single" ? props.selectedKey : void 0;
	}, [
		props.value,
		props.selectedKey,
		selectionMode
	]);
	let [controlledValue, setControlledValue] = $3e6197669829fe11$export$40bfa8c7b0832715(value, defaultValue, props.onChange);
	let displayValue = selectionMode === "single" && Array.isArray(controlledValue) ? controlledValue[0] : controlledValue;
	let setValue = (value) => {
		if (selectionMode === "single") {
			let key = Array.isArray(value) ? value[0] ?? null : value;
			setControlledValue(key);
			if (key !== displayValue) props.onSelectionChange?.(key);
		} else {
			let keys = [];
			if (Array.isArray(value)) keys = value;
			else if (value != null) keys = [value];
			setControlledValue(keys);
		}
	};
	let { collection, selectionManager, disabledKeys } = $b14b6f590b50af39$export$2f645645f7bca764({
		...props,
		items: props.items ?? props.defaultItems,
		selectionMode,
		disallowEmptySelection: selectionMode === "single",
		allowDuplicateSelectionEvents: true,
		selectedKeys: (0, import_react.useMemo)(() => $120eca7b9c40f820$var$convertValue(displayValue), [displayValue]),
		onSelectionChange: (keys) => {
			if (keys === "all") return;
			if (selectionMode === "single") {
				let key = keys.values().next().value ?? null;
				if (key === displayValue) {
					props.onSelectionChange?.(key);
					resetInputValue();
					closeMenu();
				} else setValue(key);
			} else setValue([...keys]);
		}
	});
	let selectedKey = selectionMode === "single" ? selectionManager.firstSelectedKey : null;
	let selectedItems = (0, import_react.useMemo)(() => {
		return [...selectionManager.selectedKeys].map((key) => collection.getItem(key)).filter((item) => item != null);
	}, [selectionManager.selectedKeys, collection]);
	let [inputValue, setInputValue] = $3e6197669829fe11$export$40bfa8c7b0832715(props.inputValue, $120eca7b9c40f820$var$getDefaultInputValue(props.defaultInputValue, selectedKey, collection) || "", props.onInputChange);
	let [initialValue] = (0, import_react.useState)(displayValue);
	let [initialInputValue] = (0, import_react.useState)(inputValue);
	let originalCollection = collection;
	let filteredCollection = (0, import_react.useMemo)(() => props.items != null || !defaultFilter ? collection : $120eca7b9c40f820$var$filterCollection(collection, inputValue, defaultFilter), [
		collection,
		inputValue,
		defaultFilter,
		props.items
	]);
	let [lastCollection, setLastCollection] = (0, import_react.useState)(filteredCollection);
	let menuOpenTrigger = (0, import_react.useRef)("focus");
	let onOpenChange = (open) => {
		if (props.onOpenChange) props.onOpenChange(open, open ? menuOpenTrigger.current : void 0);
		selectionManager.setFocused(open);
		if (!open) selectionManager.setFocusedKey(null);
	};
	let triggerState = $f11fb0bcf1b2687a$export$61c6a8c84e605fb6({
		...props,
		onOpenChange,
		isOpen: void 0,
		defaultOpen: void 0
	});
	let open = (focusStrategy = null, trigger) => {
		let displayAllItems = trigger === "manual" || trigger === "focus" && menuTrigger === "focus";
		if (allowsEmptyCollection || filteredCollection.size > 0 || displayAllItems && originalCollection.size > 0 || props.items) {
			if (displayAllItems && !triggerState.isOpen && props.items === void 0) setShowAllItems(true);
			menuOpenTrigger.current = trigger;
			setFocusStrategy(focusStrategy);
			triggerState.open();
		}
	};
	let toggle = (focusStrategy = null, trigger) => {
		let displayAllItems = trigger === "manual" || trigger === "focus" && menuTrigger === "focus";
		if (!(allowsEmptyCollection || filteredCollection.size > 0 || displayAllItems && originalCollection.size > 0 || props.items) && !triggerState.isOpen) return;
		if (displayAllItems && !triggerState.isOpen && props.items === void 0) setShowAllItems(true);
		if (!triggerState.isOpen) menuOpenTrigger.current = trigger;
		toggleMenu(focusStrategy);
	};
	let updateLastCollection = (0, import_react.useCallback)(() => {
		setLastCollection(showAllItems ? originalCollection : filteredCollection);
	}, [
		showAllItems,
		originalCollection,
		filteredCollection
	]);
	let toggleMenu = (0, import_react.useCallback)((focusStrategy = null) => {
		if (triggerState.isOpen) updateLastCollection();
		setFocusStrategy(focusStrategy);
		triggerState.toggle();
	}, [triggerState, updateLastCollection]);
	let closeMenu = (0, import_react.useCallback)(() => {
		if (triggerState.isOpen) {
			updateLastCollection();
			triggerState.close();
		}
	}, [triggerState, updateLastCollection]);
	let [lastValue, setLastValue] = (0, import_react.useState)(inputValue);
	let resetInputValue = () => {
		let itemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
		setLastValue(itemText);
		setInputValue(itemText);
	};
	let lastValueRef = (0, import_react.useRef)(displayValue);
	let lastSelectedKeyText = (0, import_react.useRef)(selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "");
	(0, import_react.useEffect)(() => {
		if (isFocused && (filteredCollection.size > 0 || allowsEmptyCollection) && !triggerState.isOpen && inputValue !== lastValue && menuTrigger !== "manual") open(null, "input");
		if (!showAllItems && !allowsEmptyCollection && triggerState.isOpen && filteredCollection.size === 0) closeMenu();
		if (displayValue != null && displayValue !== lastValueRef.current && selectionMode === "single") closeMenu();
		if (inputValue !== lastValue) {
			selectionManager.setFocusedKey(null);
			setShowAllItems(false);
			if (selectionMode === "single" && inputValue === "" && (props.inputValue === void 0 || value === void 0)) setValue(null);
		}
		if (displayValue !== lastValueRef.current && (props.inputValue === void 0 || value === void 0)) resetInputValue();
		else if (lastValue !== inputValue) setLastValue(inputValue);
		let selectedItemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
		if (!isFocused && selectedKey != null && props.inputValue === void 0 && selectedKey === lastValueRef.current) {
			if (lastSelectedKeyText.current !== selectedItemText) {
				setLastValue(selectedItemText);
				setInputValue(selectedItemText);
			}
		}
		lastValueRef.current = displayValue;
		lastSelectedKeyText.current = selectedItemText;
	});
	let validation = $fd2148440a13ec26$export$fc1a364ae1f3ff10({
		...props,
		value: (0, import_react.useMemo)(() => Array.isArray(displayValue) && displayValue.length === 0 ? null : {
			inputValue,
			value: displayValue,
			selectedKey
		}, [
			inputValue,
			selectedKey,
			displayValue
		])
	});
	let revert = () => {
		if (allowsCustomValue && selectedKey == null) commitCustomValue();
		else commitSelection();
	};
	let commitCustomValue = () => {
		if (selectionMode === "multiple") {
			setLastValue(inputValue);
			closeMenu();
			return;
		}
		let value = null;
		lastValueRef.current = value;
		setValue(value);
		closeMenu();
	};
	let commitSelection = (shouldForceSelectionChange = false) => {
		if (value !== void 0 && props.inputValue !== void 0) {
			let itemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
			if (shouldForceSelectionChange || selectionMode === "multiple" || inputValue !== itemText) {
				props.onSelectionChange?.(selectedKey);
				props.onChange?.(displayValue);
			}
			setLastValue(itemText);
			closeMenu();
		} else {
			resetInputValue();
			closeMenu();
		}
	};
	const commitValue = () => {
		if (allowsCustomValue) {
			const itemText = selectedKey != null ? collection.getItem(selectedKey)?.textValue ?? "" : "";
			inputValue === itemText ? commitSelection() : commitCustomValue();
		} else commitSelection();
	};
	let commit = () => {
		if (triggerState.isOpen && selectionManager.focusedKey != null) {
			if (selectionManager.isSelected(selectionManager.focusedKey) && selectionMode === "single") commitSelection(true);
			else selectionManager.select(selectionManager.focusedKey);
		} else commitValue();
	};
	let valueOnFocus = (0, import_react.useRef)([inputValue, displayValue]);
	let setFocused = (isFocused) => {
		if (isFocused) {
			valueOnFocus.current = [inputValue, displayValue];
			if (menuTrigger === "focus" && !props.isReadOnly) open(null, "focus");
		} else {
			if (shouldCloseOnBlur) commitValue();
			if (inputValue !== valueOnFocus.current[0] || displayValue !== valueOnFocus.current[1]) validation.commitValidation();
		}
		setFocusedState(isFocused);
	};
	let displayedCollection = (0, import_react.useMemo)(() => {
		if (triggerState.isOpen) {
			if (showAllItems) return originalCollection;
			else return filteredCollection;
		} else return lastCollection;
	}, [
		triggerState.isOpen,
		originalCollection,
		filteredCollection,
		showAllItems,
		lastCollection
	]);
	let defaultSelectedKey = props.defaultSelectedKey ?? (selectionMode === "single" ? initialValue : null);
	return {
		...validation,
		...triggerState,
		focusStrategy,
		toggle,
		open,
		close: commitValue,
		selectionManager,
		value: displayValue,
		defaultValue: defaultValue ?? initialValue,
		setValue,
		selectedKey,
		selectedItems,
		defaultSelectedKey,
		setSelectedKey: setValue,
		disabledKeys,
		isFocused,
		setFocused,
		selectedItem: selectedItems[0] ?? null,
		collection: displayedCollection,
		inputValue,
		defaultInputValue: $120eca7b9c40f820$var$getDefaultInputValue(props.defaultInputValue, defaultSelectedKey, collection) ?? initialInputValue,
		setInputValue,
		commit,
		revert
	};
}
function $120eca7b9c40f820$var$filterCollection(collection, inputValue, filter) {
	return new $f664a81d022446b5$export$d085fb9e920b5ca7($120eca7b9c40f820$var$filterNodes(collection, collection, inputValue, filter));
}
function $120eca7b9c40f820$var$filterNodes(collection, nodes, inputValue, filter) {
	let filteredNode = [];
	for (let node of nodes) if (node.type === "section" && node.hasChildNodes) {
		let filtered = $120eca7b9c40f820$var$filterNodes(collection, $cd5ea4b915021f1d$export$1005530eda016c13(node, collection), inputValue, filter);
		if ([...filtered].some((node) => node.type === "item")) filteredNode.push({
			...node,
			childNodes: filtered
		});
	} else if (node.type === "item" && filter(node.textValue, inputValue)) filteredNode.push({ ...node });
	else if (node.type !== "item") filteredNode.push({ ...node });
	return filteredNode;
}
function $120eca7b9c40f820$var$getDefaultInputValue(defaultInputValue, selectedKey, collection) {
	if (defaultInputValue == null) {
		if (selectedKey != null) return collection.getItem(selectedKey)?.textValue ?? "";
	}
	return defaultInputValue;
}
function $120eca7b9c40f820$var$convertValue(value) {
	if (value === void 0) return void 0;
	if (value === null) return [];
	return Array.isArray(value) ? value : [value];
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-icon-icons-checkIcon.js
var import_jsx_runtime = require_jsx_runtime();
/** ![checkIcon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz48cGF0aCBkPSJNMjAgNiA5IDE3bC01LTUiLz48L3N2Zz4=) */
var checkIcon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M20 6 9 17l-5-5" });
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableList.mjs
function $64903b4b31b6bb2a$export$b95089534ab7c1fd(props) {
	let { selectionManager, collection, disabledKeys, ref, keyboardDelegate, layoutDelegate, orientation } = props;
	let collator = $673d46fce3e5717d$export$a16aca283550c30d({
		usage: "search",
		sensitivity: "base"
	});
	let disabledBehavior = selectionManager.disabledBehavior;
	let delegate = (0, import_react.useMemo)(() => keyboardDelegate || new $ae8f8d98b2b18f2f$export$a05409b8bb224a5a({
		collection,
		disabledKeys,
		disabledBehavior,
		ref,
		collator,
		layoutDelegate,
		orientation
	}), [
		keyboardDelegate,
		layoutDelegate,
		collection,
		disabledKeys,
		ref,
		collator,
		disabledBehavior,
		orientation
	]);
	let { collectionProps } = $d667c2af82d35a98$export$d6daf82dcd84e87c({
		...props,
		ref,
		selectionManager,
		keyboardDelegate: delegate
	});
	return { listProps: collectionProps };
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useListBox.mjs
function $686593f99a1df089$export$50eacbbf140a3141(props, state, ref) {
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, { labelable: true });
	let selectionBehavior = props.selectionBehavior || "toggle";
	let orientation = props.orientation || "vertical";
	let linkBehavior = props.linkBehavior || (selectionBehavior === "replace" ? "action" : "override");
	if (selectionBehavior === "toggle" && linkBehavior === "action") linkBehavior = "override";
	let { listProps } = $64903b4b31b6bb2a$export$b95089534ab7c1fd({
		...props,
		ref,
		selectionManager: state.selectionManager,
		collection: state.collection,
		disabledKeys: state.disabledKeys,
		linkBehavior
	});
	let { focusWithinProps } = $2c9edc598a03d523$export$420e68273165f4ec({
		onFocusWithin: props.onFocus,
		onBlurWithin: props.onBlur,
		onFocusWithinChange: props.onFocusChange
	});
	let id = $390e54f620492c70$export$f680877a34711e37(props.id);
	$cd088b5c0d7b27b4$export$3585ede4d035bf14.set(state, {
		id,
		shouldUseVirtualFocus: props.shouldUseVirtualFocus,
		shouldSelectOnPressUp: props.shouldSelectOnPressUp,
		shouldFocusOnHover: props.shouldFocusOnHover,
		isVirtualized: props.isVirtualized,
		onAction: props.onAction,
		linkBehavior,
		UNSTABLE_itemBehavior: props["UNSTABLE_itemBehavior"]
	});
	let { labelProps, fieldProps } = $0beb20c9744a2065$export$8467354a121f1b9f({
		...props,
		id,
		labelElementType: "span"
	});
	return {
		labelProps,
		listBoxProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(domProps, focusWithinProps, state.selectionManager.selectionMode === "multiple" ? { "aria-multiselectable": "true" } : {}, {
			role: "listbox",
			"aria-orientation": orientation,
			...$bbaa08b3cd72f041$export$9d1611c77c2fe928(fieldProps, listProps)
		})
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableItem.mjs
function $f6ba6936bfd098a0$export$ecf600387e221c37(options) {
	let { id, selectionManager: manager, key, ref, shouldSelectOnPressUp, shouldUseVirtualFocus, focus, isDisabled, onAction, allowsDifferentPressOrigin, linkBehavior = "action" } = options;
	let router = $caaf0dd3060ed57c$export$9a302a45f65d0572();
	id = $390e54f620492c70$export$f680877a34711e37(id);
	let onSelect = (e) => {
		if (e.pointerType === "keyboard" && $22bbea12c2567021$export$d3e3bd3e26688c04(e)) manager.toggleSelection(key);
		else {
			if (manager.selectionMode === "none") return;
			if (manager.isLink(key)) {
				if (linkBehavior === "selection" && ref.current) {
					let itemProps = manager.getItemProps(key);
					router.open(ref.current, e, itemProps.href, itemProps.routerOptions);
					manager.setSelectedKeys(manager.selectedKeys);
					return;
				} else if (linkBehavior === "override" || linkBehavior === "none") return;
			}
			if (manager.selectionMode === "single") {
				if (manager.isSelected(key) && !manager.disallowEmptySelection) manager.toggleSelection(key);
				else manager.replaceSelection(key);
			} else if (e && e.shiftKey) manager.extendSelection(key);
			else if (manager.selectionBehavior === "toggle" || e && ($bb39c0fc1c19b34c$export$16792effe837dba3(e) || e.pointerType === "touch" || e.pointerType === "virtual")) manager.toggleSelection(key);
			else manager.replaceSelection(key);
		}
	};
	(0, import_react.useEffect)(() => {
		if (key === manager.focusedKey && manager.isFocused) {
			if (!shouldUseVirtualFocus) {
				if (focus) focus();
				else if ($23f2114a1b82827e$export$cd4e5573fbe2b576() !== ref.current && ref.current) $f192c2f16961cbe0$export$80f3e147d781571c(ref.current);
			} else $b72f3f7b3b5f42c6$export$76e4e37e5339496d(ref.current);
		}
	}, [
		ref,
		key,
		manager.focusedKey,
		manager.childFocusStrategy,
		manager.isFocused,
		shouldUseVirtualFocus
	]);
	isDisabled = isDisabled || manager.isDisabled(key);
	let itemProps = {};
	if (!shouldUseVirtualFocus && !isDisabled) itemProps = {
		tabIndex: key === manager.focusedKey ? 0 : -1,
		onFocus(e) {
			if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === ref.current) manager.setFocusedKey(key);
		}
	};
	else if (isDisabled) itemProps.onMouseDown = (e) => {
		e.preventDefault();
	};
	(0, import_react.useEffect)(() => {
		if (isDisabled && manager.focusedKey === key) manager.setFocusedKey(null);
	}, [
		manager,
		isDisabled,
		key
	]);
	let isLinkOverride = manager.isLink(key) && linkBehavior === "override";
	let isActionOverride = onAction && options["UNSTABLE_itemBehavior"] === "action";
	let hasLinkAction = manager.isLink(key) && linkBehavior !== "selection" && linkBehavior !== "none";
	let allowsSelection = !isDisabled && manager.canSelectItem(key) && !isLinkOverride && !isActionOverride;
	let allowsActions = (onAction || hasLinkAction) && !isDisabled;
	let hasPrimaryAction = allowsActions && (manager.selectionBehavior === "replace" ? !allowsSelection : !allowsSelection || manager.isEmpty);
	let hasSecondaryAction = allowsActions && allowsSelection && manager.selectionBehavior === "replace";
	let hasAction = hasPrimaryAction || hasSecondaryAction;
	let modality = (0, import_react.useRef)(null);
	let longPressEnabled = hasAction && allowsSelection;
	let longPressEnabledOnPressStart = (0, import_react.useRef)(false);
	let hadPrimaryActionOnPressStart = (0, import_react.useRef)(false);
	let collectionItemProps = manager.getItemProps(key);
	let performAction = (e) => {
		if (onAction) {
			onAction();
			ref.current?.dispatchEvent(new CustomEvent("react-aria-item-action", { bubbles: true }));
		}
		if (hasLinkAction && ref.current) router.open(ref.current, e, collectionItemProps.href, collectionItemProps.routerOptions);
	};
	let itemPressProps = { ref };
	if (shouldSelectOnPressUp) {
		itemPressProps.onPressStart = (e) => {
			modality.current = e.pointerType;
			longPressEnabledOnPressStart.current = longPressEnabled;
			if (e.pointerType === "keyboard" && (!hasAction || $f6ba6936bfd098a0$var$isSelectionKey(e.key))) onSelect(e);
		};
		if (!allowsDifferentPressOrigin) itemPressProps.onPress = (e) => {
			if (hasPrimaryAction || hasSecondaryAction && e.pointerType !== "mouse") {
				if (e.pointerType === "keyboard" && !$f6ba6936bfd098a0$var$isActionKey(e.key)) return;
				performAction(e);
			} else if (e.pointerType !== "keyboard" && allowsSelection) onSelect(e);
		};
		else {
			itemPressProps.onPressUp = hasPrimaryAction ? void 0 : (e) => {
				if (e.pointerType === "mouse" && allowsSelection) onSelect(e);
			};
			itemPressProps.onPress = hasPrimaryAction ? performAction : (e) => {
				if (e.pointerType !== "keyboard" && e.pointerType !== "mouse" && allowsSelection) onSelect(e);
			};
		}
	} else {
		itemPressProps.onPressStart = (e) => {
			modality.current = e.pointerType;
			longPressEnabledOnPressStart.current = longPressEnabled;
			hadPrimaryActionOnPressStart.current = hasPrimaryAction;
			if (allowsSelection && (e.pointerType === "mouse" && !hasPrimaryAction || e.pointerType === "keyboard" && (!allowsActions || $f6ba6936bfd098a0$var$isSelectionKey(e.key)))) onSelect(e);
		};
		itemPressProps.onPress = (e) => {
			if (e.pointerType === "touch" || e.pointerType === "pen" || e.pointerType === "virtual" || e.pointerType === "keyboard" && hasAction && $f6ba6936bfd098a0$var$isActionKey(e.key) || e.pointerType === "mouse" && hadPrimaryActionOnPressStart.current) {
				if (hasAction) performAction(e);
				else if (allowsSelection) onSelect(e);
			}
		};
	}
	itemProps["data-collection"] = $22bbea12c2567021$export$6aeb1680a0ae8741(manager.collection);
	itemProps["data-key"] = key;
	itemPressProps.preventFocusOnPress = shouldUseVirtualFocus;
	if (shouldUseVirtualFocus) itemPressProps = $bbaa08b3cd72f041$export$9d1611c77c2fe928(itemPressProps, {
		onPressStart(e) {
			if (e.pointerType !== "touch") {
				manager.setFocused(true);
				manager.setFocusedKey(key);
			}
		},
		onPress(e) {
			if (e.pointerType === "touch") {
				manager.setFocused(true);
				manager.setFocusedKey(key);
			}
		}
	});
	if (collectionItemProps) {
		for (let key of [
			"onPressStart",
			"onPressEnd",
			"onPressChange",
			"onPress",
			"onPressUp",
			"onClick"
		]) if (collectionItemProps[key]) itemPressProps[key] = $a4e76a5424781910$export$e08e3b67e392101e(itemPressProps[key], collectionItemProps[key]);
	}
	let { pressProps, isPressed } = $d27d541f9569d26d$export$45712eceda6fad21(itemPressProps);
	let onDoubleClick = hasSecondaryAction ? (e) => {
		if (modality.current === "mouse") {
			e.stopPropagation();
			e.preventDefault();
			performAction(e);
		}
	} : void 0;
	let { longPressProps } = $7b01448eaad0fe7c$export$c24ed0104d07eab9({
		isDisabled: !longPressEnabled,
		onLongPress(e) {
			if (e.pointerType === "touch") {
				onSelect(e);
				manager.setSelectionBehavior("toggle");
			}
		}
	});
	let onDragStartCapture = (e) => {
		if (modality.current === "touch" && longPressEnabledOnPressStart.current) e.preventDefault();
	};
	let onClick = linkBehavior !== "none" && manager.isLink(key) ? (e) => {
		if (!$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening) e.preventDefault();
	} : void 0;
	return {
		itemProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(itemProps, allowsSelection || hasPrimaryAction || shouldUseVirtualFocus && !isDisabled ? pressProps : {}, longPressEnabled ? longPressProps : {}, {
			onDoubleClick,
			onDragStartCapture,
			onClick,
			id
		}, shouldUseVirtualFocus ? { onMouseDown: (e) => e.preventDefault() } : void 0),
		isPressed,
		isSelected: manager.isSelected(key),
		isFocused: manager.isFocused && manager.focusedKey === key,
		isDisabled,
		allowsSelection,
		hasAction
	};
}
function $f6ba6936bfd098a0$var$isActionKey(key) {
	return key === "Enter";
}
function $f6ba6936bfd098a0$var$isSelectionKey(key) {
	return key === " ";
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useOption.mjs
function $dae966e193913d1b$export$497855f14858aa34(props, state, ref) {
	let { key } = props;
	let data = $cd088b5c0d7b27b4$export$3585ede4d035bf14.get(state);
	let isDisabled = props.isDisabled ?? state.selectionManager.isDisabled(key);
	let isSelected = props.isSelected ?? state.selectionManager.isSelected(key);
	let shouldSelectOnPressUp = props.shouldSelectOnPressUp ?? data?.shouldSelectOnPressUp;
	let shouldFocusOnHover = props.shouldFocusOnHover ?? data?.shouldFocusOnHover;
	let shouldUseVirtualFocus = props.shouldUseVirtualFocus ?? data?.shouldUseVirtualFocus;
	let isVirtualized = props.isVirtualized ?? data?.isVirtualized;
	let labelId = $390e54f620492c70$export$b4cc09c592e8fdb8();
	let descriptionId = $390e54f620492c70$export$b4cc09c592e8fdb8();
	let optionProps = {
		role: "option",
		"aria-disabled": isDisabled || void 0,
		"aria-selected": state.selectionManager.selectionMode !== "none" ? isSelected : void 0,
		"aria-label": props["aria-label"],
		"aria-labelledby": labelId,
		"aria-describedby": descriptionId
	};
	let item = state.collection.getItem(key);
	if (isVirtualized) {
		let index = Number(item?.index);
		optionProps["aria-posinset"] = Number.isNaN(index) ? void 0 : index + 1;
		optionProps["aria-setsize"] = $2efe10d3f1f9e31e$export$77d5aafae4e095b2(state.collection);
	}
	let onAction = data?.onAction ? () => data?.onAction?.(key) : void 0;
	let id = $cd088b5c0d7b27b4$export$9145995848b05025(state, key);
	let { itemProps, isPressed, isFocused, hasAction, allowsSelection } = $f6ba6936bfd098a0$export$ecf600387e221c37({
		selectionManager: state.selectionManager,
		key,
		ref,
		shouldSelectOnPressUp,
		allowsDifferentPressOrigin: shouldSelectOnPressUp && shouldFocusOnHover,
		isVirtualized,
		shouldUseVirtualFocus,
		isDisabled,
		onAction: onAction || item?.props?.onAction ? $a4e76a5424781910$export$e08e3b67e392101e(item?.props?.onAction, onAction) : void 0,
		linkBehavior: data?.linkBehavior,
		UNSTABLE_itemBehavior: data?.["UNSTABLE_itemBehavior"],
		id
	});
	let { hoverProps } = $e969f22b6713ca4a$export$ae780daf29e6d456({
		isDisabled: isDisabled || !shouldFocusOnHover,
		onHoverStart() {
			if (!$8f5a2122b0992be3$export$b9b3dfddab17db27()) {
				state.selectionManager.setFocused(true);
				state.selectionManager.setFocusedKey(key);
			}
		}
	});
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(item?.props);
	delete domProps.id;
	let linkProps = $caaf0dd3060ed57c$export$7e924b3091a3bd18(item?.props);
	return {
		optionProps: {
			...optionProps,
			...$bbaa08b3cd72f041$export$9d1611c77c2fe928(domProps, itemProps, hoverProps, linkProps),
			id
		},
		labelProps: { id: labelId },
		descriptionProps: { id: descriptionId },
		isFocused,
		isFocusVisible: isFocused && state.selectionManager.isFocused && $8f5a2122b0992be3$export$b9b3dfddab17db27(),
		isSelected,
		isDisabled,
		isPressed,
		allowsSelection,
		hasAction
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useListBoxSection.mjs
function $3d6c959d2ef57b72$export$c3f9f39876e4bc7(props) {
	let { heading, "aria-label": ariaLabel } = props;
	let headingId = $390e54f620492c70$export$f680877a34711e37();
	return {
		itemProps: { role: "presentation" },
		headingProps: heading ? {
			id: headingId,
			role: "presentation",
			onMouseDown: (e) => {
				e.preventDefault();
			}
		} : {},
		groupProps: {
			role: "group",
			"aria-label": ariaLabel,
			"aria-labelledby": heading ? headingId : void 0
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/virtualizer/utils.mjs
var $3db4938a3baa5776$var$cachedRTLResult = null;
function $3db4938a3baa5776$export$faf7630257ad4304(recalculate = false) {
	if ($3db4938a3baa5776$var$cachedRTLResult === null || recalculate) {
		const outerDiv = document.createElement("div");
		const outerStyle = outerDiv.style;
		outerStyle.width = "50px";
		outerStyle.height = "50px";
		outerStyle.overflow = "scroll";
		outerStyle.direction = "rtl";
		const innerDiv = document.createElement("div");
		const innerStyle = innerDiv.style;
		innerStyle.width = "100px";
		innerStyle.height = "100px";
		outerDiv.appendChild(innerDiv);
		document.body.appendChild(outerDiv);
		if (outerDiv.scrollLeft > 0) $3db4938a3baa5776$var$cachedRTLResult = "positive-descending";
		else {
			outerDiv.scrollLeft = 1;
			if (outerDiv.scrollLeft === 0) $3db4938a3baa5776$var$cachedRTLResult = "negative";
			else $3db4938a3baa5776$var$cachedRTLResult = "positive-ascending";
		}
		document.body.removeChild(outerDiv);
		return $3db4938a3baa5776$var$cachedRTLResult;
	}
	return $3db4938a3baa5776$var$cachedRTLResult;
}
function $3db4938a3baa5776$export$1389d168952b34b5(node, direction) {
	let { scrollLeft } = node;
	if (direction === "rtl") {
		let { scrollWidth, clientWidth } = node;
		switch ($3db4938a3baa5776$export$faf7630257ad4304()) {
			case "negative":
				scrollLeft = -scrollLeft;
				break;
			case "positive-descending": scrollLeft = scrollWidth - clientWidth - scrollLeft;
		}
	}
	return scrollLeft;
}
function $3db4938a3baa5776$export$ed5fd5ffe5ab0ac(node, direction, scrollLeft) {
	if (direction === "rtl") switch ($3db4938a3baa5776$export$faf7630257ad4304()) {
		case "negative":
			scrollLeft = -scrollLeft;
			break;
		case "positive-ascending": break;
		default: {
			const { clientWidth, scrollWidth } = node;
			scrollLeft = scrollWidth - clientWidth - scrollLeft;
			break;
		}
	}
	node.scrollLeft = scrollLeft;
}
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/Point.mjs
var $b88f793813fc795e$export$baf26146a414f24a = class $b88f793813fc795e$export$baf26146a414f24a {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
	/**
	* Returns a copy of this point.
	*/ copy() {
		return new $b88f793813fc795e$export$baf26146a414f24a(this.x, this.y);
	}
	/**
	* Checks if two points are equal.
	*/ equals(point) {
		return this.x === point.x && this.y === point.y;
	}
	/**
	* Returns true if this point is the origin.
	*/ isOrigin() {
		return this.x === 0 && this.y === 0;
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/Rect.mjs
var $af827553fd3cf456$export$c79fc6492f3af13d = class $af827553fd3cf456$export$c79fc6492f3af13d {
	constructor(x = 0, y = 0, width = 0, height = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	/**
	* The maximum x-coordinate in the rectangle.
	*/ get maxX() {
		return this.x + this.width;
	}
	/**
	* The maximum y-coordinate in the rectangle.
	*/ get maxY() {
		return this.y + this.height;
	}
	/**
	* The area of the rectangle.
	*/ get area() {
		return this.width * this.height;
	}
	/**
	* The top left corner of the rectangle.
	*/ get topLeft() {
		return new $b88f793813fc795e$export$baf26146a414f24a(this.x, this.y);
	}
	/**
	* The top right corner of the rectangle.
	*/ get topRight() {
		return new $b88f793813fc795e$export$baf26146a414f24a(this.maxX, this.y);
	}
	/**
	* The bottom left corner of the rectangle.
	*/ get bottomLeft() {
		return new $b88f793813fc795e$export$baf26146a414f24a(this.x, this.maxY);
	}
	/**
	* The bottom right corner of the rectangle.
	*/ get bottomRight() {
		return new $b88f793813fc795e$export$baf26146a414f24a(this.maxX, this.maxY);
	}
	/**
	* Returns whether this rectangle intersects another rectangle.
	*
	* @param rect - The rectangle to check.
	*/ intersects(rect) {
		return this.area > 0 && rect.area > 0 && this.x <= rect.x + rect.width && rect.x <= this.x + this.width && this.y <= rect.y + rect.height && rect.y <= this.y + this.height;
	}
	/**
	* Returns whether this rectangle fully contains another rectangle.
	*
	* @param rect - The rectangle to check.
	*/ containsRect(rect) {
		return this.x <= rect.x && this.y <= rect.y && this.maxX >= rect.maxX && this.maxY >= rect.maxY;
	}
	/**
	* Returns whether the rectangle contains the given point.
	*
	* @param point - The point to check.
	*/ containsPoint(point) {
		return this.x <= point.x && this.y <= point.y && this.maxX >= point.x && this.maxY >= point.y;
	}
	/**
	* Returns the first corner of this rectangle (from top to bottom, left to right)
	* that is contained in the given rectangle, or null of the rectangles do not intersect.
	*
	* @param rect - The rectangle to check.
	*/ getCornerInRect(rect) {
		for (let key of [
			"topLeft",
			"topRight",
			"bottomLeft",
			"bottomRight"
		]) if (rect.containsPoint(this[key])) return key;
		return null;
	}
	equals(rect) {
		return rect.x === this.x && rect.y === this.y && rect.width === this.width && rect.height === this.height;
	}
	pointEquals(point) {
		return this.x === point.x && this.y === point.y;
	}
	sizeEquals(size) {
		return this.width === size.width && this.height === size.height;
	}
	/**
	* Returns the union of this Rect and another.
	*/ union(other) {
		let x = Math.min(this.x, other.x);
		let y = Math.min(this.y, other.y);
		let width = Math.max(this.maxX, other.maxX) - x;
		let height = Math.max(this.maxY, other.maxY) - y;
		return new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, width, height);
	}
	/**
	* Returns the intersection of this Rect with another.
	* If the rectangles do not intersect, an all zero Rect is returned.
	*/ intersection(other) {
		if (!this.intersects(other)) return new $af827553fd3cf456$export$c79fc6492f3af13d(0, 0, 0, 0);
		let x = Math.max(this.x, other.x);
		let y = Math.max(this.y, other.y);
		return new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, Math.min(this.maxX, other.maxX) - x, Math.min(this.maxY, other.maxY) - y);
	}
	/**
	* Returns a copy of this rectangle.
	*/ copy() {
		return new $af827553fd3cf456$export$c79fc6492f3af13d(this.x, this.y, this.width, this.height);
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/Size.mjs
var $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec = class $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec {
	constructor(width = 0, height = 0) {
		this.width = Math.max(width, 0);
		this.height = Math.max(height, 0);
	}
	/**
	* Returns a copy of this size.
	*/ copy() {
		return new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(this.width, this.height);
	}
	/**
	* Returns whether this size is equal to another one.
	*/ equals(other) {
		return this.width === other.width && this.height === other.height;
	}
	/**
	* The total area of the Size.
	*/ get area() {
		return this.width * this.height;
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/ReusableView.mjs
var $6bbafa22c92cc056$var$KEY = 0;
var $6bbafa22c92cc056$export$1a5223887c560441 = class {
	constructor(virtualizer, viewType) {
		this.virtualizer = virtualizer;
		this.key = ++$6bbafa22c92cc056$var$KEY;
		this.viewType = viewType;
		this.children = /* @__PURE__ */ new Set();
		this.reusableViews = /* @__PURE__ */ new Map();
		this.layoutInfo = null;
		this.content = null;
		this.rendered = null;
	}
	/**
	* Prepares the view for reuse. Called just before the view is removed from the DOM.
	*/ prepareForReuse() {
		this.content = null;
		this.rendered = null;
		this.layoutInfo = null;
	}
	getReusableView(reuseType) {
		let reusable = this.reusableViews.get(reuseType);
		return reusable && reusable.length > 0 ? reusable.shift() : new $6bbafa22c92cc056$export$7a41b6f219e61634(this.virtualizer, this, reuseType);
	}
	reuseChild(child) {
		child.prepareForReuse();
		let reusable = this.reusableViews.get(child.viewType);
		if (!reusable) {
			reusable = [];
			this.reusableViews.set(child.viewType, reusable);
		}
		reusable.push(child);
	}
};
var $6bbafa22c92cc056$export$e21886a4eef6b29a = class extends $6bbafa22c92cc056$export$1a5223887c560441 {
	constructor(virtualizer) {
		super(virtualizer, "root");
	}
};
var $6bbafa22c92cc056$export$7a41b6f219e61634 = class extends $6bbafa22c92cc056$export$1a5223887c560441 {
	constructor(virtualizer, parent, viewType) {
		super(virtualizer, viewType);
		this.parent = parent;
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/utils.mjs
/** Returns whether two sets are equal. */ function $5225cf049274675d$export$a8d0d0c8d1c5df64(a, b) {
	if (a === b) return true;
	if (a.size !== b.size) return false;
	for (let key of a) if (!b.has(key)) return false;
	return true;
}
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/OverscanManager.mjs
var $f64c7bdbe8bdc6dc$export$4455ee6afb38dcbb = class {
	setVisibleRect(rect) {
		let time = performance.now() - this.startTime;
		if (time < 500) {
			if (rect.x !== this.visibleRect.x && time > 0) this.velocity.x = (rect.x - this.visibleRect.x) / time;
			if (rect.y !== this.visibleRect.y && time > 0) this.velocity.y = (rect.y - this.visibleRect.y) / time;
		}
		this.startTime = performance.now();
		this.visibleRect = rect;
	}
	getOverscannedRect() {
		let overscanned = this.visibleRect.copy();
		let overscanY = this.visibleRect.height / 3;
		overscanned.height += overscanY;
		if (this.velocity.y < 0) overscanned.y -= overscanY;
		let overscanX = this.visibleRect.width / 3;
		overscanned.width += overscanX;
		if (this.velocity.x < 0) overscanned.x -= overscanX;
		return overscanned;
	}
	constructor() {
		this.startTime = 0;
		this.velocity = new $b88f793813fc795e$export$baf26146a414f24a(0, 0);
		this.visibleRect = new $af827553fd3cf456$export$c79fc6492f3af13d();
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/Virtualizer.mjs
var $4537523c0f2a47dc$export$89be5a243e59c4b2 = class {
	constructor(options) {
		this.delegate = options.delegate;
		this.collection = options.collection;
		this.layout = options.layout;
		this.contentSize = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec();
		this.visibleRect = new $af827553fd3cf456$export$c79fc6492f3af13d();
		this.size = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec();
		this.persistedKeys = /* @__PURE__ */ new Set();
		this._visibleViews = /* @__PURE__ */ new Map();
		this._renderedContent = /* @__PURE__ */ new WeakMap();
		this._rootView = new $6bbafa22c92cc056$export$e21886a4eef6b29a(this);
		this._isScrolling = false;
		this._invalidationContext = {};
		this._overscanManager = new $f64c7bdbe8bdc6dc$export$4455ee6afb38dcbb();
	}
	/** Returns whether the given key, or an ancestor, is persisted. */ isPersistedKey(key) {
		if (this.persistedKeys.has(key)) return true;
		for (let k of this.persistedKeys) while (k != null) {
			let layoutInfo = this.layout.getLayoutInfo(k);
			if (!layoutInfo || layoutInfo.parentKey == null) break;
			k = layoutInfo.parentKey;
			if (k === key) return true;
		}
		return false;
	}
	getParentView(layoutInfo) {
		return layoutInfo.parentKey != null ? this._visibleViews.get(layoutInfo.parentKey) : this._rootView;
	}
	getReusableView(layoutInfo) {
		let view = this.getParentView(layoutInfo).getReusableView(layoutInfo.type);
		view.layoutInfo = layoutInfo;
		this._renderView(view);
		return view;
	}
	_renderView(reusableView) {
		if (reusableView.layoutInfo) {
			let { type, key, content } = reusableView.layoutInfo;
			reusableView.content = content || this.collection.getItem(key);
			reusableView.rendered = this._renderContent(type, reusableView.content);
		}
	}
	_renderContent(type, content) {
		let cached = content != null ? this._renderedContent.get(content) : null;
		if (cached != null) return cached;
		let rendered = this.delegate.renderView(type, content);
		if (content) this._renderedContent.set(content, rendered);
		return rendered;
	}
	/**
	* Returns the key for the item view currently at the given point.
	*/ keyAtPoint(point) {
		let rect = new $af827553fd3cf456$export$c79fc6492f3af13d(point.x, point.y, 1, 1);
		let layoutInfos = rect.area === 0 ? [] : this.layout.getVisibleLayoutInfos(rect);
		for (let layoutInfo of layoutInfos) if (layoutInfo.rect.intersects(rect)) return layoutInfo.key;
		return null;
	}
	relayout(context = {}) {
		this.layout.update(context);
		this.contentSize = this.layout.getContentSize();
		let visibleRect = this.visibleRect;
		let contentOffsetX = context.contentChanged ? 0 : visibleRect.x;
		let contentOffsetY = context.contentChanged ? 0 : visibleRect.y;
		contentOffsetX = Math.max(0, Math.min(this.contentSize.width - visibleRect.width, contentOffsetX));
		contentOffsetY = Math.max(0, Math.min(this.contentSize.height - visibleRect.height, contentOffsetY));
		if (contentOffsetX !== visibleRect.x || contentOffsetY !== visibleRect.y) {
			let rect = new $af827553fd3cf456$export$c79fc6492f3af13d(contentOffsetX, contentOffsetY, visibleRect.width, visibleRect.height);
			this.delegate.setVisibleRect(rect);
		} else this.updateSubviews();
	}
	getVisibleLayoutInfos() {
		let rect;
		rect = this._overscanManager.getOverscannedRect();
		let layoutInfos = this.layout.getVisibleLayoutInfos(rect);
		let map = /* @__PURE__ */ new Map();
		for (let layoutInfo of layoutInfos) map.set(layoutInfo.key, layoutInfo);
		return map;
	}
	updateSubviews() {
		let visibleLayoutInfos = this.getVisibleLayoutInfos();
		let removed = /* @__PURE__ */ new Set();
		for (let [key, view] of this._visibleViews) {
			let layoutInfo = visibleLayoutInfos.get(key);
			if (!layoutInfo || view.parent !== this.getParentView(layoutInfo)) {
				this._visibleViews.delete(key);
				view.parent.reuseChild(view);
				removed.add(view);
			}
		}
		for (let [key, layoutInfo] of visibleLayoutInfos) {
			let view = this._visibleViews.get(key);
			if (!view) {
				view = this.getReusableView(layoutInfo);
				view.parent.children.add(view);
				this._visibleViews.set(key, view);
				removed.delete(view);
			} else {
				view.layoutInfo = layoutInfo;
				let item = this.collection.getItem(layoutInfo.key);
				if (view.content !== item) {
					if (view.content != null) this._renderedContent.delete(view.content);
					this._renderView(view);
				}
			}
		}
		for (let view of removed) {
			view.parent.children.delete(view);
			view.parent.reusableViews.clear();
		}
		if (!this._isScrolling) for (let key of visibleLayoutInfos.keys()) {
			let view = this._visibleViews.get(key);
			view.parent.children.delete(view);
			view.parent.children.add(view);
		}
	}
	/** Performs layout and updates visible views as needed. */ render(opts) {
		let mutableThis = this;
		let needsLayout = false;
		let offsetChanged = false;
		let sizeChanged = false;
		let itemSizeChanged = false;
		let layoutOptionsChanged = false;
		let needsUpdate = false;
		if (opts.collection !== this.collection) {
			mutableThis.collection = opts.collection;
			needsLayout = true;
		}
		if (opts.layout !== this.layout || this.layout.virtualizer !== this) {
			if (this.layout) this.layout.virtualizer = null;
			opts.layout.virtualizer = this;
			mutableThis.layout = opts.layout;
			needsLayout = true;
		}
		if (opts.persistedKeys && !$5225cf049274675d$export$a8d0d0c8d1c5df64(opts.persistedKeys, this.persistedKeys)) {
			mutableThis.persistedKeys = opts.persistedKeys;
			needsUpdate = true;
		}
		if (!this.visibleRect.equals(opts.visibleRect) || !this.size.equals(opts.size)) {
			this._overscanManager.setVisibleRect(opts.visibleRect);
			let oldRect = new $af827553fd3cf456$export$c79fc6492f3af13d(this.visibleRect.x, this.visibleRect.y, this.size.width, this.size.height);
			let newRect = new $af827553fd3cf456$export$c79fc6492f3af13d(opts.visibleRect.x, opts.visibleRect.y, opts.size.width, opts.size.height);
			if (this.layout.shouldInvalidate(newRect, oldRect)) {
				offsetChanged = !opts.visibleRect.pointEquals(this.visibleRect);
				sizeChanged = !this.size.equals(opts.size);
				needsLayout = true;
			} else needsUpdate = true;
			mutableThis.visibleRect = opts.visibleRect;
			mutableThis.size = opts.size;
		}
		if (opts.invalidationContext !== this._invalidationContext) {
			if (opts.invalidationContext) {
				sizeChanged ||= opts.invalidationContext.sizeChanged || false;
				offsetChanged ||= opts.invalidationContext.offsetChanged || false;
				itemSizeChanged ||= opts.invalidationContext.itemSizeChanged || false;
				layoutOptionsChanged ||= opts.invalidationContext.layoutOptions != null && this._invalidationContext.layoutOptions != null && opts.invalidationContext.layoutOptions !== this._invalidationContext.layoutOptions && this.layout.shouldInvalidateLayoutOptions(opts.invalidationContext.layoutOptions, this._invalidationContext.layoutOptions);
				needsLayout ||= itemSizeChanged || sizeChanged || offsetChanged || layoutOptionsChanged;
			}
			this._invalidationContext = opts.invalidationContext;
		}
		if (opts.isScrolling !== this._isScrolling) {
			this._isScrolling = opts.isScrolling;
			if (!opts.isScrolling) needsUpdate = true;
		}
		if (needsLayout) this.relayout({
			offsetChanged,
			sizeChanged,
			itemSizeChanged,
			layoutOptionsChanged,
			layoutOptions: this._invalidationContext.layoutOptions
		});
		else if (needsUpdate) this.updateSubviews();
		return Array.from(this._rootView.children);
	}
	getVisibleView(key) {
		return this._visibleViews.get(key);
	}
	invalidate(context) {
		this.delegate.invalidate(context);
	}
	updateItemSize(key, size) {
		if (!this.layout.updateItemSize) return;
		if (this.layout.updateItemSize(key, size)) this.invalidate({ itemSizeChanged: true });
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/useVirtualizerState.mjs
var $51e619e0f141c3ec$export$e5c5a5f917a5871c = typeof document !== "undefined" ? import_react.useLayoutEffect : () => {};
function $51e619e0f141c3ec$export$1505db82fe357e65(opts) {
	let [visibleRect, setVisibleRect] = (0, import_react.useState)(new $af827553fd3cf456$export$c79fc6492f3af13d(0, 0, 0, 0));
	let [size, setSize] = (0, import_react.useState)(new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec());
	let [isScrolling, setScrolling] = (0, import_react.useState)(false);
	let [invalidationContext, setInvalidationContext] = (0, import_react.useState)({});
	let visibleRectChanged = (0, import_react.useRef)(false);
	let [virtualizer] = (0, import_react.useState)(() => new $4537523c0f2a47dc$export$89be5a243e59c4b2({
		collection: opts.collection,
		layout: opts.layout,
		delegate: {
			setVisibleRect(rect) {
				setVisibleRect(rect);
				visibleRectChanged.current = true;
			},
			renderView: opts.renderView,
			invalidate: setInvalidationContext
		}
	}));
	$51e619e0f141c3ec$export$e5c5a5f917a5871c(() => {
		if (visibleRectChanged.current) {
			visibleRectChanged.current = false;
			opts.onVisibleRectChange(visibleRect);
		}
	});
	let mergedInvalidationContext = (0, import_react.useMemo)(() => {
		if (opts.layoutOptions != null) return {
			...invalidationContext,
			layoutOptions: opts.layoutOptions
		};
		return invalidationContext;
	}, [invalidationContext, opts.layoutOptions]);
	let visibleViews = virtualizer.render({
		layout: opts.layout,
		collection: opts.collection,
		persistedKeys: opts.persistedKeys,
		layoutOptions: opts.layoutOptions,
		visibleRect,
		size: opts.allowsWindowScrolling ? size : visibleRect,
		invalidationContext: mergedInvalidationContext,
		isScrolling
	});
	let contentSize = virtualizer.contentSize;
	let startScrolling = (0, import_react.useCallback)(() => {
		setScrolling(true);
	}, []);
	let endScrolling = (0, import_react.useCallback)(() => {
		setScrolling(false);
	}, []);
	return (0, import_react.useMemo)(() => ({
		virtualizer,
		visibleViews,
		setVisibleRect,
		size,
		setSize,
		contentSize,
		isScrolling,
		startScrolling,
		endScrolling
	}), [
		virtualizer,
		visibleViews,
		setVisibleRect,
		size,
		setSize,
		contentSize,
		isScrolling,
		startScrolling,
		endScrolling
	]);
}
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/Layout.mjs
var $85410e0c3cc54f1d$export$c84671f46d6a1ca = class {
	/**
	* Returns whether the layout should invalidate in response to
	* visible rectangle changes. By default, it only invalidates
	* when the virtualizer's size changes. Return true always
	* to make the layout invalidate while scrolling (e.g. sticky headers).
	*/ shouldInvalidate(newRect, oldRect) {
		return newRect.width !== oldRect.width || newRect.height !== oldRect.height;
	}
	/**
	* Returns whether the layout should invalidate when the layout options change.
	* By default it invalidates when the object identity changes. Override this
	* method to optimize layout updates based on specific option changes.
	*/ shouldInvalidateLayoutOptions(newOptions, oldOptions) {
		return newOptions !== oldOptions;
	}
	/**
	* This method allows the layout to perform any pre-computation
	* it needs to in order to prepare LayoutInfos for retrieval.
	* Called by the virtualizer before `getVisibleLayoutInfos`
	* or `getLayoutInfo` are called.
	*/ update(invalidationContext) {}
	/** @private */ getItemRect(key) {
		return this.getLayoutInfo(key)?.rect ?? null;
	}
	/** @private */ getVisibleRect() {
		return this.virtualizer.visibleRect;
	}
	constructor() {
		/** The Virtualizer the layout is currently attached to. */ this.virtualizer = null;
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/virtualizer/LayoutInfo.mjs
var $eb6255cbf080eb7d$export$7e0eeb9da702a085 = class $eb6255cbf080eb7d$export$7e0eeb9da702a085 {
	/**
	* @param type The type of element represented by this LayoutInfo. Should match the `type` of the
	*   corresponding collection node.
	* @param key A unique key for this LayoutInfo. Should match the `key` of the corresponding
	*   collection node.
	* @param rect The rectangle describing the size and position of this element.
	*/ constructor(type, key, rect) {
		this.type = type;
		this.key = key;
		this.parentKey = null;
		this.content = null;
		this.rect = rect;
		this.estimatedSize = false;
		this.isSticky = false;
		this.opacity = 1;
		this.transform = null;
		this.zIndex = 0;
		this.allowOverflow = false;
	}
	/**
	* Returns a copy of the LayoutInfo.
	*/ copy() {
		let res = new $eb6255cbf080eb7d$export$7e0eeb9da702a085(this.type, this.key, this.rect.copy());
		res.estimatedSize = this.estimatedSize;
		res.opacity = this.opacity;
		res.transform = this.transform;
		res.parentKey = this.parentKey;
		res.content = this.content;
		res.isSticky = this.isSticky;
		res.zIndex = this.zIndex;
		res.allowOverflow = this.allowOverflow;
		return res;
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/layout/ListLayout.mjs
var $942f06a693c162e2$var$DEFAULT_HEIGHT = 48;
var $942f06a693c162e2$export$cacbb3924155d68e = class extends $85410e0c3cc54f1d$export$c84671f46d6a1ca {
	/**
	* Creates a new ListLayout with options. See the list of properties below for a description
	* of the options that can be provided.
	*/ constructor(options = {}) {
		super();
		this.rowSize = options?.rowSize ?? options?.rowHeight ?? null;
		this.orientation = options.orientation ?? "vertical";
		this.estimatedRowSize = options?.estimatedRowSize ?? options?.estimatedRowHeight ?? null;
		this.headingSize = options?.headingSize ?? options?.headingHeight ?? null;
		this.estimatedHeadingSize = options?.estimatedHeadingSize ?? options?.estimatedHeadingHeight ?? null;
		this.loaderSize = options?.loaderSize ?? options?.loaderHeight ?? null;
		this.dropIndicatorThickness = options.dropIndicatorThickness || 2;
		this.gap = options.gap || 0;
		this.padding = options.padding || 0;
		this.layoutNodes = /* @__PURE__ */ new Map();
		this.rootNodes = [];
		this.lastCollection = null;
		this.invalidateEverything = false;
		this.validRect = new $af827553fd3cf456$export$c79fc6492f3af13d();
		this.requestedRect = new $af827553fd3cf456$export$c79fc6492f3af13d();
		this.contentSize = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec();
	}
	get collection() {
		return this.virtualizer.collection;
	}
	/** @deprecated Use `rowSize` instead. */ get rowHeight() {
		return this.rowSize;
	}
	/** @deprecated Use `estimatedRowSize` instead. */ get estimatedRowHeight() {
		return this.estimatedRowSize;
	}
	/** @deprecated Use `headingSize` instead. */ get headingHeight() {
		return this.headingSize;
	}
	/** @deprecated Use `estimatedHeadingSize` instead. */ get estimatedHeadingHeight() {
		return this.estimatedHeadingSize;
	}
	/** @deprecated Use `loaderSize` instead. */ get loaderHeight() {
		return this.loaderSize;
	}
	getLayoutInfo(key) {
		this.ensureLayoutInfo(key);
		return this.layoutNodes.get(key)?.layoutInfo || null;
	}
	getVisibleLayoutInfos(rect) {
		let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
		let heightProperty = this.orientation === "horizontal" ? "width" : "height";
		if (rect[heightProperty] > 1) {
			let rowHeight = (this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT) + this.gap;
			rect = rect.copy();
			let offset = Math.floor(rect[offsetProperty] / rowHeight) * rowHeight;
			let height = rect[heightProperty] + rect[offsetProperty] - offset;
			rect[offsetProperty] = offset;
			rect[heightProperty] = Math.ceil(height / rowHeight) * rowHeight;
		}
		this.layoutIfNeeded(rect);
		let res = [];
		let addNodes = (nodes) => {
			for (let node of nodes) if (this.isVisible(node, rect)) {
				res.push(node.layoutInfo);
				if (node.children) addNodes(node.children);
			}
		};
		addNodes(this.rootNodes);
		return res;
	}
	layoutIfNeeded(rect) {
		if (!this.lastCollection) return;
		if (!this.requestedRect.containsRect(rect)) {
			this.requestedRect = this.requestedRect.union(rect);
			this.rootNodes = this.buildCollection();
		}
		for (let key of this.virtualizer.persistedKeys) if (this.ensureLayoutInfo(key)) return;
	}
	ensureLayoutInfo(key) {
		if (!this.layoutNodes.has(key) && this.requestedRect.area < this.contentSize.area && this.lastCollection) {
			this.requestedRect = new $af827553fd3cf456$export$c79fc6492f3af13d(0, 0, Infinity, Infinity);
			this.rootNodes = this.buildCollection();
			this.requestedRect = new $af827553fd3cf456$export$c79fc6492f3af13d(0, 0, this.contentSize.width, this.contentSize.height);
			return true;
		}
		return false;
	}
	isVisible(node, rect) {
		return node.layoutInfo.rect.intersects(rect) || node.layoutInfo.isSticky || node.layoutInfo.type === "header" || node.layoutInfo.type === "loader" || this.virtualizer.isPersistedKey(node.layoutInfo.key);
	}
	shouldInvalidateEverything(invalidationContext) {
		let options = invalidationContext.layoutOptions;
		return invalidationContext.sizeChanged || this.rowSize !== (options?.rowSize ?? options?.rowHeight ?? this.rowSize) || this.orientation !== (options?.orientation ?? this.orientation) || this.headingSize !== (options?.headingSize ?? options?.headingHeight ?? this.headingSize) || this.loaderSize !== (options?.loaderSize ?? options?.loaderHeight ?? this.loaderSize) || this.gap !== (options?.gap ?? this.gap) || this.padding !== (options?.padding ?? this.padding);
	}
	shouldInvalidateLayoutOptions(newOptions, oldOptions) {
		return (newOptions?.rowSize ?? newOptions?.rowHeight) !== (oldOptions?.rowSize ?? oldOptions?.rowHeight) || newOptions.orientation !== oldOptions.orientation || (newOptions?.estimatedRowSize ?? newOptions?.estimatedRowHeight) !== (oldOptions?.estimatedRowSize ?? oldOptions?.estimatedRowHeight) || (newOptions?.headingSize ?? newOptions?.headingHeight) !== (oldOptions?.headingSize ?? oldOptions?.headingHeight) || (newOptions?.estimatedHeadingSize ?? newOptions?.estimatedHeadingHeight) !== (oldOptions?.estimatedHeadingSize ?? oldOptions?.estimatedHeadingHeight) || (newOptions?.loaderSize ?? newOptions?.loaderHeight) !== (oldOptions?.loaderSize ?? oldOptions?.loaderHeight) || newOptions.dropIndicatorThickness !== oldOptions.dropIndicatorThickness || newOptions.gap !== oldOptions.gap || newOptions.padding !== oldOptions.padding;
	}
	update(invalidationContext) {
		let collection = this.virtualizer.collection;
		this.invalidateEverything = this.shouldInvalidateEverything(invalidationContext);
		if (this.invalidateEverything) {
			this.requestedRect = this.virtualizer.visibleRect.copy();
			this.layoutNodes.clear();
		}
		let options = invalidationContext.layoutOptions;
		this.rowSize = options?.rowSize ?? options?.rowHeight ?? this.rowSize;
		this.orientation = options?.orientation ?? this.orientation;
		this.estimatedRowSize = options?.estimatedRowSize ?? options?.estimatedRowHeight ?? this.estimatedRowSize;
		this.headingSize = options?.headingSize ?? options?.headingHeight ?? this.headingSize;
		this.estimatedHeadingSize = options?.estimatedHeadingSize ?? options?.estimatedHeadingHeight ?? this.estimatedHeadingSize;
		this.loaderSize = options?.loaderSize ?? options?.loaderHeight ?? this.loaderSize;
		this.dropIndicatorThickness = options?.dropIndicatorThickness ?? this.dropIndicatorThickness;
		this.gap = options?.gap ?? this.gap;
		this.padding = options?.padding ?? this.padding;
		this.rootNodes = this.buildCollection();
		if (this.lastCollection && collection !== this.lastCollection) {
			for (let key of this.lastCollection.getKeys()) if (!collection.getItem(key)) {
				if (this.layoutNodes.get(key)) this.layoutNodes.delete(key);
			}
		}
		this.lastCollection = collection;
		this.invalidateEverything = false;
		this.validRect = this.requestedRect.copy();
	}
	buildCollection(offset = this.padding) {
		let collection = this.virtualizer.collection;
		let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
		let maxOffsetProperty = this.orientation === "horizontal" ? "maxX" : "maxY";
		let collectionNodes = $942f06a693c162e2$var$toArray(collection, (node) => node.type !== "content");
		let loaderNodes = collectionNodes.filter((node) => node.type === "loader");
		let nodes = [];
		let isEmptyOrLoading = collection?.size === 0;
		if (isEmptyOrLoading) offset = 0;
		for (let node of collectionNodes) {
			let rowHeight = (this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT) + this.gap;
			if (node.type === "item" && offset + rowHeight < this.requestedRect[offsetProperty] && !this.isValid(node, offset)) {
				offset += rowHeight;
				continue;
			}
			let layoutNode = this.orientation === "horizontal" ? this.buildChild(node, offset, this.padding, null) : this.buildChild(node, this.padding, offset, null);
			offset = layoutNode.layoutInfo.rect[maxOffsetProperty] + this.gap;
			nodes.push(layoutNode);
			if (node.type === "loader") {
				let index = loaderNodes.indexOf(node);
				loaderNodes.splice(index, 1);
			}
			if ((node.type === "item" || node.type === "loader") && offset > this.requestedRect[maxOffsetProperty]) {
				let lastProcessedIndex = collectionNodes.indexOf(node);
				for (let loaderNode of loaderNodes) {
					let loaderNodeIndex = collectionNodes.indexOf(loaderNode);
					offset += (loaderNodeIndex - lastProcessedIndex - 1) * rowHeight;
					let loader = this.orientation === "horizontal" ? this.buildChild(loaderNode, offset, this.padding, null) : this.buildChild(loaderNode, this.padding, offset, null);
					nodes.push(loader);
					offset = loader.layoutInfo.rect[maxOffsetProperty];
					lastProcessedIndex = loaderNodeIndex;
				}
				offset += (collectionNodes.length - lastProcessedIndex - 1) * rowHeight;
				break;
			}
		}
		offset = Math.max(offset - this.gap, 0);
		offset += isEmptyOrLoading ? 0 : this.padding;
		this.contentSize = this.orientation === "horizontal" ? new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(offset, this.virtualizer.size.height) : new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(this.virtualizer.size.width, offset);
		return nodes;
	}
	isValid(node, offset) {
		let cached = this.layoutNodes.get(node.key);
		let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
		return !this.invalidateEverything && !!cached && cached.node === node && offset === cached.layoutInfo.rect[offsetProperty] && cached.layoutInfo.rect.intersects(this.validRect) && cached.validRect.containsRect(cached.layoutInfo.rect.intersection(this.requestedRect));
	}
	buildChild(node, x, y, parentKey) {
		if (this.isValid(node, this.orientation === "horizontal" ? x : y)) return this.layoutNodes.get(node.key);
		let layoutNode = this.buildNode(node, x, y);
		layoutNode.layoutInfo.parentKey = parentKey ?? null;
		layoutNode.layoutInfo.allowOverflow = true;
		this.layoutNodes.set(node.key, layoutNode);
		return layoutNode;
	}
	buildNode(node, x, y) {
		switch (node.type) {
			case "section": return this.buildSection(node, x, y);
			case "item": return this.buildItem(node, x, y);
			case "header": return this.buildSectionHeader(node, x, y);
			case "loader": return this.buildLoader(node, x, y);
			case "separator": return this.buildItem(node, x, y);
			default: throw new Error("Unsupported node type: " + node.type);
		}
	}
	buildLoader(node, x, y) {
		let rect = new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, this.padding, 0);
		let layoutInfo = new $eb6255cbf080eb7d$export$7e0eeb9da702a085(node.type, node.key, rect);
		if (this.orientation === "horizontal") {
			rect.height = this.virtualizer.contentSize.height - this.padding - y;
			rect.width = node.props.isLoading ? this.loaderSize ?? this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT : 0;
		} else {
			rect.width = this.virtualizer.contentSize.width - this.padding - x;
			rect.height = node.props.isLoading ? this.loaderSize ?? this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT : 0;
		}
		return {
			layoutInfo,
			validRect: rect.intersection(this.requestedRect)
		};
	}
	buildSection(node, x, y) {
		let collection = this.virtualizer.collection;
		let width = this.virtualizer.size.width - this.padding - x;
		let height = this.virtualizer.size.height - this.padding - y;
		let rect = this.orientation === "horizontal" ? new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, 0, height) : new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, width, 0);
		let layoutInfo = new $eb6255cbf080eb7d$export$7e0eeb9da702a085(node.type, node.key, rect);
		let offset = this.orientation === "horizontal" ? x : y;
		let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
		let maxOffsetProperty = this.orientation === "horizontal" ? "maxX" : "maxY";
		let heightProperty = this.orientation === "horizontal" ? "width" : "height";
		let skipped = 0;
		let children = [];
		for (let child of $cd5ea4b915021f1d$export$1005530eda016c13(node, collection)) {
			if (child.type === "content") continue;
			let rowHeight = (this.rowSize ?? this.estimatedRowSize ?? $942f06a693c162e2$var$DEFAULT_HEIGHT) + this.gap;
			if (offset + rowHeight < this.requestedRect[offsetProperty] && !this.isValid(node, offset)) {
				offset += rowHeight;
				skipped++;
				continue;
			}
			let layoutNode = this.orientation === "horizontal" ? this.buildChild(child, offset, y, layoutInfo.key) : this.buildChild(child, x, offset, layoutInfo.key);
			offset = layoutNode.layoutInfo.rect[maxOffsetProperty] + this.gap;
			children.push(layoutNode);
			if (offset > this.requestedRect[maxOffsetProperty]) {
				offset += ([...$cd5ea4b915021f1d$export$1005530eda016c13(node, collection)].length - (children.length + skipped)) * rowHeight;
				break;
			}
		}
		offset -= this.gap;
		rect[heightProperty] = offset - (this.orientation === "horizontal" ? x : y);
		return {
			layoutInfo,
			children,
			validRect: layoutInfo.rect.intersection(this.requestedRect),
			node
		};
	}
	buildSectionHeader(node, x, y) {
		let widthProperty = this.orientation === "horizontal" ? "height" : "width";
		let heightProperty = this.orientation === "horizontal" ? "width" : "height";
		let width = this.virtualizer.size[widthProperty] - this.padding - (this.orientation === "horizontal" ? y : x);
		let rectHeight = this.headingSize;
		let isEstimated = false;
		if (rectHeight == null) {
			let previousLayoutNode = this.layoutNodes.get(node.key);
			let previousLayoutInfo = previousLayoutNode?.layoutInfo;
			if (previousLayoutInfo) {
				let curNode = this.virtualizer.collection.getItem(node.key);
				let lastNode = this.lastCollection ? this.lastCollection.getItem(node.key) : null;
				rectHeight = previousLayoutNode.layoutInfo.rect[heightProperty];
				isEstimated = width !== previousLayoutInfo.rect[widthProperty] || curNode !== lastNode || previousLayoutInfo.estimatedSize;
			} else {
				rectHeight = node.rendered ? this.estimatedHeadingSize : 0;
				isEstimated = true;
			}
		}
		if (rectHeight == null) rectHeight = $942f06a693c162e2$var$DEFAULT_HEIGHT;
		let headerRect = this.orientation === "horizontal" ? new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, rectHeight, width - y) : new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, width - x, rectHeight);
		let header = new $eb6255cbf080eb7d$export$7e0eeb9da702a085("header", node.key, headerRect);
		header.estimatedSize = isEstimated;
		return {
			layoutInfo: header,
			children: [],
			validRect: header.rect.intersection(this.requestedRect),
			node
		};
	}
	buildItem(node, x, y) {
		let widthProperty = this.orientation === "horizontal" ? "height" : "width";
		let heightProperty = this.orientation === "horizontal" ? "width" : "height";
		let width = this.virtualizer.size[widthProperty] - this.padding - (this.orientation === "horizontal" ? y : x);
		let rectHeight = this.rowSize;
		let isEstimated = false;
		if (rectHeight == null) {
			let previousLayoutNode = this.layoutNodes.get(node.key);
			if (previousLayoutNode) {
				rectHeight = previousLayoutNode.layoutInfo.rect[heightProperty];
				isEstimated = width !== previousLayoutNode.layoutInfo.rect[widthProperty] || node !== previousLayoutNode.node || previousLayoutNode.layoutInfo.estimatedSize;
			} else {
				rectHeight = this.estimatedRowSize;
				isEstimated = true;
			}
		}
		if (rectHeight == null) rectHeight = $942f06a693c162e2$var$DEFAULT_HEIGHT;
		let rect = this.orientation === "horizontal" ? new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, rectHeight, width) : new $af827553fd3cf456$export$c79fc6492f3af13d(x, y, width, rectHeight);
		let layoutInfo = new $eb6255cbf080eb7d$export$7e0eeb9da702a085(node.type, node.key, rect);
		layoutInfo.estimatedSize = isEstimated;
		return {
			layoutInfo,
			children: [],
			validRect: layoutInfo.rect.intersection(this.requestedRect),
			node
		};
	}
	updateItemSize(key, size) {
		let layoutNode = this.layoutNodes.get(key);
		if (!layoutNode) return false;
		let collection = this.virtualizer.collection;
		let layoutInfo = layoutNode.layoutInfo;
		let offsetProperty = this.orientation === "horizontal" ? "x" : "y";
		let heightProperty = this.orientation === "horizontal" ? "width" : "height";
		layoutInfo.estimatedSize = false;
		if (layoutInfo.rect[heightProperty] !== size[heightProperty]) {
			let newLayoutInfo = layoutInfo.copy();
			newLayoutInfo.rect[heightProperty] = size[heightProperty];
			layoutNode.layoutInfo = newLayoutInfo;
			this.validRect[heightProperty] = Math.min(this.validRect[heightProperty], layoutInfo.rect[offsetProperty] - this.validRect[offsetProperty]);
			if (layoutNode.node?.type === "item") this.requestedRect[heightProperty] += newLayoutInfo.rect[heightProperty] - layoutInfo.rect[heightProperty];
			this.updateLayoutNode(key, layoutInfo, newLayoutInfo);
			let node = layoutInfo.parentKey != null ? collection.getItem(layoutInfo.parentKey) : null;
			while (node) {
				this.updateLayoutNode(node.key, layoutInfo, newLayoutInfo);
				node = node.parentKey != null ? collection.getItem(node.parentKey) : null;
			}
			return true;
		}
		return false;
	}
	updateLayoutNode(key, oldLayoutInfo, newLayoutInfo) {
		let n = this.layoutNodes.get(key);
		if (n) {
			n.validRect = n.validRect.intersection(this.validRect);
			if (n.layoutInfo === oldLayoutInfo) n.layoutInfo = newLayoutInfo;
		}
	}
	getContentSize() {
		return this.contentSize;
	}
	getDropTargetFromPoint(x, y, isValidDropTarget) {
		x += this.virtualizer.visibleRect.x;
		y += this.virtualizer.visibleRect.y;
		let searchRect = new $af827553fd3cf456$export$c79fc6492f3af13d(x, Math.max(0, y - this.gap), 1, Math.max(1, this.gap * 2));
		let candidates = this.getVisibleLayoutInfos(searchRect);
		let key = null;
		let minDistance = Infinity;
		for (let candidate of candidates) {
			if (!candidate.rect.intersects(searchRect)) continue;
			let yDist = Math.abs(candidate.rect.y - y);
			let maxYDist = Math.abs(candidate.rect.maxY - y);
			let dist = Math.min(yDist, maxYDist);
			if (dist < minDistance) {
				minDistance = dist;
				key = candidate.key;
			}
		}
		if (key == null || this.virtualizer.collection.size === 0) return { type: "root" };
		let layoutInfo = this.getLayoutInfo(key);
		if (!layoutInfo) return null;
		let rect = layoutInfo.rect;
		let target = {
			type: "item",
			key: layoutInfo.key,
			dropPosition: "on"
		};
		if (!isValidDropTarget(target)) {
			if (y <= rect.y + rect.height / 2 && isValidDropTarget({
				...target,
				dropPosition: "before"
			})) target.dropPosition = "before";
			else if (isValidDropTarget({
				...target,
				dropPosition: "after"
			})) target.dropPosition = "after";
		} else if (y <= rect.y + 10 && isValidDropTarget({
			...target,
			dropPosition: "before"
		})) target.dropPosition = "before";
		else if (y >= rect.maxY - 10 && isValidDropTarget({
			...target,
			dropPosition: "after"
		})) target.dropPosition = "after";
		return target;
	}
	getDropTargetLayoutInfo(target) {
		let layoutInfo = this.getLayoutInfo(target.key);
		let rect;
		if (target.dropPosition === "before") rect = this.orientation === "horizontal" ? new $af827553fd3cf456$export$c79fc6492f3af13d(Math.max(0, layoutInfo.rect.x - this.dropIndicatorThickness / 2), layoutInfo.rect.y, this.dropIndicatorThickness, layoutInfo.rect.height) : new $af827553fd3cf456$export$c79fc6492f3af13d(layoutInfo.rect.x, Math.max(0, layoutInfo.rect.y - this.dropIndicatorThickness / 2), layoutInfo.rect.width, this.dropIndicatorThickness);
		else if (target.dropPosition === "after") {
			let targetNode = this.collection.getItem(target.key);
			if (targetNode) {
				let targetLevel = targetNode.level ?? 0;
				let currentKey = this.collection.getKeyAfter(target.key);
				while (currentKey != null) {
					let node = this.collection.getItem(currentKey);
					if (!node || node.level <= targetLevel) break;
					layoutInfo = this.getLayoutInfo(currentKey) || layoutInfo;
					currentKey = this.collection.getKeyAfter(currentKey);
				}
			}
			rect = this.orientation === "horizontal" ? new $af827553fd3cf456$export$c79fc6492f3af13d(layoutInfo.rect.maxX - this.dropIndicatorThickness / 2, layoutInfo.rect.y, this.dropIndicatorThickness, layoutInfo.rect.height) : new $af827553fd3cf456$export$c79fc6492f3af13d(layoutInfo.rect.x, layoutInfo.rect.maxY - this.dropIndicatorThickness / 2, layoutInfo.rect.width, this.dropIndicatorThickness);
		} else rect = layoutInfo.rect;
		return new $eb6255cbf080eb7d$export$7e0eeb9da702a085("dropIndicator", target.key + ":" + target.dropPosition, rect);
	}
};
function $942f06a693c162e2$var$toArray(collection, predicate) {
	const result = [];
	for (const node of collection) if (predicate(node)) result.push(node);
	return result;
}
//#endregion
//#region node_modules/react-aria/dist/private/virtualizer/ScrollView.mjs
function $d83ca946696b1300$var$ScrollView(props, ref) {
	ref = $03e8ab2d84d7657a$export$4338b53315abf666(ref);
	let { scrollViewProps, contentProps } = $d83ca946696b1300$export$2ea0c4974da4731b(props, ref);
	return /*#__PURE__*/ import_react.createElement("div", {
		role: "presentation",
		...scrollViewProps,
		ref
	}, /*#__PURE__*/ import_react.createElement("div", contentProps, props.children));
}
var $d83ca946696b1300$export$5665e3d6be6adea = /*#__PURE__*/ import_react.forwardRef($d83ca946696b1300$var$ScrollView);
function $d83ca946696b1300$export$2ea0c4974da4731b(props, ref) {
	let { contentSize, onVisibleRectChange, onSizeChange, innerStyle, onScrollStart, onScrollEnd, scrollDirection = "both", onScroll: onScrollProp, allowsWindowScrolling, ...otherProps } = props;
	let state = (0, import_react.useRef)({
		scrollPosition: new $b88f793813fc795e$export$baf26146a414f24a(),
		size: new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(),
		viewportOffset: new $b88f793813fc795e$export$baf26146a414f24a(),
		viewportSize: new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(),
		scrollEndTime: 0,
		scrollTimeout: null,
		isScrolling: false,
		lastVisibleRect: new $af827553fd3cf456$export$c79fc6492f3af13d()
	}).current;
	let { direction } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let updateVisibleRect = (0, import_react.useCallback)(() => {
		let visibleRect = allowsWindowScrolling ? new $af827553fd3cf456$export$c79fc6492f3af13d(state.viewportOffset.x + state.scrollPosition.x, state.viewportOffset.y + state.scrollPosition.y, Math.max(0, Math.min(state.size.width - state.viewportOffset.x, state.viewportSize.width)), Math.max(0, Math.min(state.size.height - state.viewportOffset.y, state.viewportSize.height))) : new $af827553fd3cf456$export$c79fc6492f3af13d(state.scrollPosition.x, state.scrollPosition.y, state.size.width, state.size.height);
		if (visibleRect.area > 0 || state.lastVisibleRect.area > 0) {
			onVisibleRectChange(visibleRect);
			state.lastVisibleRect = visibleRect;
		}
	}, [
		state,
		allowsWindowScrolling,
		onVisibleRectChange
	]);
	let [isScrolling, setScrolling] = (0, import_react.useState)(false);
	let onScroll = (0, import_react.useCallback)((e) => {
		let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		if (!$23f2114a1b82827e$export$4282f70798064fe0(target, ref.current)) return;
		if (onScrollProp && target === ref.current) onScrollProp(e);
		if (target !== ref.current) {
			let boundingRect = ref.current.getBoundingClientRect();
			let x = boundingRect.x < 0 ? -boundingRect.x : 0;
			let y = boundingRect.y < 0 ? -boundingRect.y : 0;
			if (x === state.viewportOffset.x && y === state.viewportOffset.y) return;
			state.viewportOffset = new $b88f793813fc795e$export$baf26146a414f24a(x, y);
		} else {
			let scrollTop = target.scrollTop;
			let scrollLeft = $3db4938a3baa5776$export$1389d168952b34b5(target, direction);
			state.scrollPosition = new $b88f793813fc795e$export$baf26146a414f24a(Math.max(0, Math.min(scrollLeft, contentSize.width - state.size.width)), Math.max(0, Math.min(scrollTop, contentSize.height - state.size.height)));
		}
		(0, import_react_dom.flushSync)(() => {
			updateVisibleRect();
			if (!state.isScrolling) {
				state.isScrolling = true;
				setScrolling(true);
				window.dispatchEvent(new Event("tk.disconnect-observer"));
				if (onScrollStart) onScrollStart();
			}
			let now = Date.now();
			if (state.scrollEndTime <= now + 50) {
				state.scrollEndTime = now + 300;
				if (state.scrollTimeout != null) clearTimeout(state.scrollTimeout);
				state.scrollTimeout = setTimeout(() => {
					state.isScrolling = false;
					setScrolling(false);
					state.scrollTimeout = null;
					window.dispatchEvent(new Event("tk.connect-observer"));
					if (onScrollEnd) onScrollEnd();
				}, 300);
			}
		});
	}, [
		onScrollProp,
		ref,
		direction,
		state,
		contentSize,
		updateVisibleRect,
		onScrollStart,
		onScrollEnd
	]);
	(0, import_react.useEffect)(() => {
		document.addEventListener("scroll", onScroll, true);
		return () => document.removeEventListener("scroll", onScroll, true);
	}, [onScroll]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (state.scrollTimeout != null) clearTimeout(state.scrollTimeout);
			if (state.isScrolling) window.dispatchEvent(new Event("tk.connect-observer"));
		};
	}, []);
	let isUpdatingSize = (0, import_react.useRef)(false);
	let updateSize = (0, import_react.useCallback)((flush) => {
		let dom = ref.current;
		if (!dom || isUpdatingSize.current) return;
		isUpdatingSize.current = true;
		Object.getOwnPropertyNames(window.HTMLElement.prototype).includes("clientWidth");
		Object.getOwnPropertyNames(window.HTMLElement.prototype).includes("clientHeight");
		let clientWidth = dom.clientWidth;
		let clientHeight = dom.clientHeight;
		let w = clientWidth;
		let h = clientHeight;
		let viewportWidth = window.innerWidth;
		let viewportHeight = window.innerHeight;
		let viewportSizeChanged = state.viewportSize.width !== viewportWidth || state.viewportSize.height !== viewportHeight;
		if (viewportSizeChanged) state.viewportSize = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(viewportWidth, viewportHeight);
		if (state.size.width !== w || state.size.height !== h || viewportSizeChanged) {
			state.size = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(w, h);
			flush(() => {
				updateVisibleRect();
				onSizeChange?.(state.size);
			});
			if (clientWidth !== dom.clientWidth || clientHeight !== dom.clientHeight) {
				state.size = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(dom.clientWidth, dom.clientHeight);
				flush(() => {
					updateVisibleRect();
					onSizeChange?.(state.size);
				});
			}
		}
		isUpdatingSize.current = false;
	}, [
		ref,
		state,
		updateVisibleRect,
		onSizeChange
	]);
	let updateSizeEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(updateSize);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		state.viewportSize = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(window.innerWidth, window.innerHeight);
		let onWindowResize = () => {
			updateSizeEvent(import_react_dom.flushSync);
		};
		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, [state]);
	let lastContentSize = (0, import_react.useRef)(null);
	let [update, setUpdate] = (0, import_react.useState)({});
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (!isUpdatingSize.current && (lastContentSize.current == null || !contentSize.equals(lastContentSize.current))) {
			if (typeof IS_REACT_ACT_ENVIRONMENT === "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest !== "undefined") {
				setUpdate({});
				lastContentSize.current = contentSize;
				return;
			} else queueMicrotask(() => updateSizeEvent(import_react_dom.flushSync));
		}
		lastContentSize.current = contentSize;
	});
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		updateSizeEvent((fn) => fn());
	}, [update]);
	let onResize = (0, import_react.useCallback)(() => {
		updateSize(import_react_dom.flushSync);
	}, [updateSize]);
	$970072cf4b13fde3$export$683480f191c0e3ea({
		ref,
		box: "border-box",
		onResize
	});
	let style = {
		padding: 0,
		...otherProps.style
	};
	if (scrollDirection === "horizontal") {
		style.overflowX = "auto";
		style.overflowY = "hidden";
	} else if (scrollDirection === "vertical" || contentSize.width === state.size.width) {
		style.overflowY = "auto";
		style.overflowX = "hidden";
	} else style.overflow = "auto";
	innerStyle = {
		width: Number.isFinite(contentSize.width) ? contentSize.width : void 0,
		height: Number.isFinite(contentSize.height) ? contentSize.height : void 0,
		pointerEvents: isScrolling ? "none" : "auto",
		position: "relative",
		...innerStyle
	};
	return {
		isScrolling,
		scrollViewProps: {
			...otherProps,
			style
		},
		contentProps: {
			role: "presentation",
			style: innerStyle
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLoadMore.mjs
function $e21c75ef2d96a1a6$export$7717c92ee915373e(props, ref) {
	let { isLoading, onLoadMore, scrollOffset = 1, items } = props;
	let isLoadingRef = (0, import_react.useRef)(isLoading);
	let prevProps = (0, import_react.useRef)(props);
	let onScroll = (0, import_react.useCallback)(() => {
		if (ref.current && !isLoadingRef.current && onLoadMore) {
			if (ref.current.scrollHeight - ref.current.scrollTop - ref.current.clientHeight < ref.current.clientHeight * scrollOffset) {
				isLoadingRef.current = true;
				onLoadMore();
			}
		}
	}, [
		onLoadMore,
		ref,
		scrollOffset
	]);
	let lastItems = (0, import_react.useRef)(items);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (props !== prevProps.current) {
			isLoadingRef.current = isLoading;
			prevProps.current = props;
		}
		if (ref?.current && !isLoadingRef.current && onLoadMore && (!items || items !== lastItems.current) && ref.current.clientHeight === ref.current.scrollHeight) {
			isLoadingRef.current = true;
			onLoadMore?.();
		}
		lastItems.current = items;
	}, [
		isLoading,
		onLoadMore,
		props,
		ref,
		items
	]);
	$600b3cf69ae46262$export$90fc3a17d93f704c(ref, "scroll", onScroll);
}
//#endregion
//#region node_modules/react-aria/dist/private/virtualizer/useVirtualizerItem.mjs
function $cd3854145620ec6a$export$1da781778207e0a2(options) {
	let { layoutInfo, virtualizer, ref } = options;
	let key = layoutInfo?.key;
	let updateSize = (0, import_react.useCallback)(() => {
		if (key != null && ref.current) {
			let size = $cd3854145620ec6a$var$getSize(ref.current);
			virtualizer.updateItemSize(key, size);
		}
	}, [
		virtualizer,
		key,
		ref
	]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (layoutInfo?.estimatedSize) updateSize();
	});
	return { updateSize };
}
function $cd3854145620ec6a$var$getSize(node) {
	let height = node.style.height;
	node.style.height = "";
	let size = new $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec(node.scrollWidth, node.scrollHeight);
	node.style.height = height;
	return size;
}
//#endregion
//#region node_modules/react-aria/dist/private/virtualizer/VirtualizerItem.mjs
function $6c92e9e346cd7b1c$export$6796df8ba7398521(props) {
	let { style, className, layoutInfo, virtualizer, parent, children } = props;
	let { direction } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let ref = (0, import_react.useRef)(null);
	$cd3854145620ec6a$export$1da781778207e0a2({
		layoutInfo,
		virtualizer,
		ref
	});
	return /*#__PURE__*/ import_react.createElement("div", {
		role: "presentation",
		ref,
		className,
		style: {
			...$6c92e9e346cd7b1c$export$1481e64fbe01b8b3(layoutInfo, direction, parent),
			...style
		}
	}, children);
}
var $6c92e9e346cd7b1c$var$cache = /* @__PURE__ */ new WeakMap();
function $6c92e9e346cd7b1c$export$1481e64fbe01b8b3(layoutInfo, dir, parent) {
	let xProperty = dir === "rtl" ? "right" : "left";
	let cached = $6c92e9e346cd7b1c$var$cache.get(layoutInfo);
	if (cached && cached[xProperty] != null) {
		if (!parent) return cached;
		let top = layoutInfo.rect.y - parent.rect.y;
		let x = layoutInfo.rect.x - parent.rect.x;
		if (cached.top === top && cached[xProperty] === x) return cached;
	}
	let rectStyles = {
		top: layoutInfo.rect.y - (parent && !(parent.allowOverflow && layoutInfo.isSticky) ? parent.rect.y : 0),
		[xProperty]: layoutInfo.rect.x - (parent && !(parent.allowOverflow && layoutInfo.isSticky) ? parent.rect.x : 0),
		width: layoutInfo.rect.width,
		height: layoutInfo.rect.height
	};
	Object.entries(rectStyles).forEach(([key, value]) => {
		if (!Number.isFinite(value)) rectStyles[key] = void 0;
	});
	let style = {
		position: layoutInfo.isSticky ? "sticky" : "absolute",
		display: layoutInfo.isSticky ? "inline-block" : void 0,
		overflow: layoutInfo.allowOverflow ? "visible" : "hidden",
		opacity: layoutInfo.opacity,
		zIndex: layoutInfo.zIndex,
		transform: layoutInfo.transform ?? void 0,
		contain: "size layout style",
		...rectStyles
	};
	$6c92e9e346cd7b1c$var$cache.set(layoutInfo, style);
	return style;
}
//#endregion
//#region node_modules/react-aria/dist/private/virtualizer/Virtualizer.mjs
var $b29c836adf9e092e$export$89be5a243e59c4b2 = /*#__PURE__*/ import_react.forwardRef(function Virtualizer(props, forwardedRef) {
	let { children: renderView, renderWrapper, layout, collection, scrollDirection, isLoading, onLoadMore, persistedKeys, layoutOptions, ...otherProps } = props;
	let ref = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let state = $51e619e0f141c3ec$export$1505db82fe357e65({
		layout,
		collection,
		renderView,
		onVisibleRectChange(rect) {
			if (ref.current) {
				ref.current.scrollLeft = rect.x;
				ref.current.scrollTop = rect.y;
			}
		},
		persistedKeys,
		layoutOptions
	});
	$e21c75ef2d96a1a6$export$7717c92ee915373e({
		isLoading,
		onLoadMore,
		scrollOffset: 1
	}, ref);
	let onVisibleRectChange = (0, import_react.useCallback)((rect) => {
		state.setVisibleRect(rect);
	}, [state]);
	return /*#__PURE__*/ import_react.createElement($d83ca946696b1300$export$5665e3d6be6adea, {
		...$bbaa08b3cd72f041$export$9d1611c77c2fe928(otherProps, { onVisibleRectChange }),
		ref,
		contentSize: state.contentSize,
		onScrollStart: state.startScrolling,
		onScrollEnd: state.endScrolling,
		scrollDirection
	}, $b29c836adf9e092e$var$renderChildren(null, state.visibleViews, renderWrapper || $b29c836adf9e092e$var$defaultRenderWrapper));
});
function $b29c836adf9e092e$var$renderChildren(parent, views, renderWrapper) {
	return views.map((view) => {
		return renderWrapper(parent, view, view.children ? Array.from(view.children) : [], (childViews) => $b29c836adf9e092e$var$renderChildren(view, childViews, renderWrapper));
	});
}
function $b29c836adf9e092e$var$defaultRenderWrapper(parent, reusableView) {
	return /*#__PURE__*/ import_react.createElement($6c92e9e346cd7b1c$export$6796df8ba7398521, {
		key: reusableView.key,
		layoutInfo: reusableView.layoutInfo,
		virtualizer: reusableView.virtualizer,
		parent: parent?.layoutInfo
	}, reusableView.rendered);
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-listbox.js
/** Common list item component for menus and pickers. */
var ListItem = forwardRefWithAs(function ListItem(props, forwardedRef) {
	let { children, elementType: ElementType = "div", descriptionProps, keyboardShortcutProps, labelProps, isFocused, isHovered, isPressed, isSelected, ...otherProps } = props;
	let gridGutter = tokenSchema.size.space.regular;
	let contentGutter = tokenSchema.size.space.medium;
	let focusIndicatorWidth = tokenSchema.size.space.xsmall;
	let gridClassname = css({
		display: "grid",
		gridTemplateAreas: "\". icon text . kbd checkmark .\" \". icon description . kbd checkmark .\"",
		gridTemplateColumns: `${gridGutter} auto 1fr ${contentGutter} auto ${tokenSchema.size.icon.regular} ${gridGutter}`,
		gridTemplateRows: "1fr auto",
		borderRadius: tokenSchema.size.radius.small,
		paddingBlock: tokenSchema.size.space.regular
	});
	let rootClassname = css({
		cursor: "default",
		color: tokenSchema.color.alias.foregroundIdle,
		display: "block",
		outline: 0,
		position: "relative",
		paddingInline: tokenSchema.size.space.small,
		"a&": { cursor: "pointer" },
		"& .list-item-text": { marginBlock: `calc((${tokenSchema.size.icon.regular} - ${tokenSchema.typography.text.regular.capheight}) / 2)` },
		[`&:not([aria-disabled=true])`]: {
			"& .list-item-checkmark": { stroke: tokenSchema.color.alias.foregroundSelected },
			"& .list-item-icon": { color: tokenSchema.color.foreground.neutralSecondary }
		},
		[`&[role=menuitem] .${gridClassname}`]: {
			gridTemplateAreas: "\". icon text . kbd .\" \". icon description . kbd .\"",
			gridTemplateColumns: `${gridGutter} auto 1fr ${contentGutter} auto ${gridGutter}`
		},
		[[`&[role=menuitemcheckbox] .${gridClassname}, &[role=menuitemradio] .${gridClassname}`, `[data-selection=single] &[role=menuitem] .${gridClassname}, [data-selection=multiple] &[role=menuitem] .${gridClassname}`].join(", ")]: {
			gridTemplateAreas: "\". checkmark icon text . kbd .\" \". checkmark icon description . kbd .\"",
			gridTemplateColumns: `${tokenSchema.size.space.small} ${tokenSchema.size.icon.medium} auto 1fr ${contentGutter} auto ${gridGutter}`
		},
		[`&[aria-disabled=false]:hover .${gridClassname}, &[data-hovered] .${gridClassname}`]: {
			backgroundColor: tokenSchema.color.alias.backgroundHovered,
			color: tokenSchema.color.alias.foregroundHovered
		},
		[`&[aria-disabled=false]:focus .${gridClassname}, &[data-focused] .${gridClassname}`]: {
			backgroundColor: tokenSchema.color.alias.backgroundHovered,
			color: tokenSchema.color.alias.foregroundHovered
		},
		"&[aria-disabled=false]:hover .list-item-icon, &[data-hovered] .list-item-icon, &[aria-disabled=false]:focus .list-item-icon, &[data-focused] .list-item-icon": { color: tokenSchema.color.alias.foregroundIdle },
		"&[aria-disabled=false]:hover kbd, &[data-hovered] kbd, &[aria-disabled=false]:focus kbd, &[data-focused] kbd": { color: tokenSchema.color.alias.foregroundIdle },
		[`&[aria-disabled=false]:active .${gridClassname}, &[data-pressed] .${gridClassname}`]: {
			backgroundColor: tokenSchema.color.alias.backgroundPressed,
			color: tokenSchema.color.alias.foregroundPressed
		},
		"&[data-focused]": { "&::before": {
			backgroundColor: tokenSchema.color.background.accentEmphasis,
			borderRadius: focusIndicatorWidth,
			content: "\"\"",
			insetBlock: tokenSchema.size.space.xsmall,
			insetInlineStart: 0,
			position: "absolute",
			width: focusIndicatorWidth
		} },
		"&[aria-disabled=true]": {
			color: tokenSchema.color.alias.foregroundDisabled,
			"& kbd": { color: "currentColor" },
			"& .list-item-checkmark": { stroke: "currentColor" }
		}
	});
	const slots = {
		text: {
			...labelProps,
			color: "inherit",
			gridArea: "text",
			UNSAFE_className: "list-item-text"
		},
		icon: {
			gridArea: "icon",
			marginEnd: "regular",
			UNSAFE_className: "list-item-icon"
		},
		description: {
			color: "neutralSecondary",
			gridArea: "description",
			marginY: "small",
			size: "small",
			...descriptionProps
		},
		kbd: {
			UNSAFE_className: css({
				alignItems: "center",
				color: tokenSchema.color.foreground.neutralTertiary,
				display: "flex",
				gridArea: "kbd",
				height: tokenSchema.size.icon.regular
			}),
			...keyboardShortcutProps
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		...toDataAttributes({
			focused: isFocused || void 0,
			hovered: isHovered || void 0,
			pressed: isPressed || void 0
		}),
		...otherProps,
		ref: forwardedRef,
		className: classNames(rootClassname),
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			className: gridClassname,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearSlots, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(SlotProvider, {
				slots,
				children: [children, isSelected && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
					src: checkIcon,
					slot: "checkmark",
					strokeScaling: false,
					gridArea: "checkmark",
					UNSAFE_className: "list-item-checkmark"
				})]
			}) })
		})
	});
});
var localizedMessages$1 = {
	"ar-AE": {
		"loading": `جارٍ التحميل...`,
		"loadingMore": `جارٍ تحميل المزيد...`
	},
	"bg-BG": {
		"loading": `Зареждане...`,
		"loadingMore": `Зареждане на още...`
	},
	"cs-CZ": {
		"loading": `Načítání...`,
		"loadingMore": `Načítání dalších...`
	},
	"da-DK": {
		"loading": `Indlæser ...`,
		"loadingMore": `Indlæser flere ...`
	},
	"de-DE": {
		"loading": `Laden...`,
		"loadingMore": `Mehr laden ...`
	},
	"el-GR": {
		"loading": `Φόρτωση...`,
		"loadingMore": `Φόρτωση περισσότερων...`
	},
	"en-US": {
		"loading": `Loading…`,
		"loadingMore": `Loading more…`
	},
	"es-ES": {
		"loading": `Cargando…`,
		"loadingMore": `Cargando más…`
	},
	"et-EE": {
		"loading": `Laadimine...`,
		"loadingMore": `Laadi rohkem...`
	},
	"fi-FI": {
		"loading": `Ladataan…`,
		"loadingMore": `Ladataan lisää…`
	},
	"fr-FR": {
		"loading": `Chargement...`,
		"loadingMore": `Chargement supplémentaire...`
	},
	"he-IL": {
		"loading": `טוען...`,
		"loadingMore": `טוען עוד...`
	},
	"hr-HR": {
		"loading": `Učitavam...`,
		"loadingMore": `Učitavam još...`
	},
	"hu-HU": {
		"loading": `Betöltés folyamatban…`,
		"loadingMore": `Továbbiak betöltése folyamatban…`
	},
	"it-IT": {
		"loading": `Caricamento...`,
		"loadingMore": `Caricamento altri...`
	},
	"ja-JP": {
		"loading": `読み込み中...`,
		"loadingMore": `さらに読み込み中...`
	},
	"ko-KR": {
		"loading": `로드 중`,
		"loadingMore": `추가 로드 중`
	},
	"lt-LT": {
		"loading": `Įkeliama...`,
		"loadingMore": `Įkeliama daugiau...`
	},
	"lv-LV": {
		"loading": `Notiek ielāde...`,
		"loadingMore": `Tiek ielādēts vēl...`
	},
	"nb-NO": {
		"loading": `Laster inn ...`,
		"loadingMore": `Laster inn flere ...`
	},
	"nl-NL": {
		"loading": `Laden...`,
		"loadingMore": `Meer laden...`
	},
	"pl-PL": {
		"loading": `Ładowanie...`,
		"loadingMore": `Wczytywanie większej liczby...`
	},
	"pt-BR": {
		"loading": `Carregando...`,
		"loadingMore": `Carregando mais...`
	},
	"pt-PT": {
		"loading": `A carregar...`,
		"loadingMore": `A carregar mais...`
	},
	"ro-RO": {
		"loading": `Se încarcă...`,
		"loadingMore": `Se încarcă mai multe...`
	},
	"ru-RU": {
		"loading": `Загрузка...`,
		"loadingMore": `Дополнительная загрузка...`
	},
	"sk-SK": {
		"loading": `Načítava sa...`,
		"loadingMore": `Načítava sa viac...`
	},
	"sl-SI": {
		"loading": `Nalaganje...`,
		"loadingMore": `Nalaganje več vsebine...`
	},
	"sr-SP": {
		"loading": `Učitavam...`,
		"loadingMore": `Učitavam još...`
	},
	"sv-SE": {
		"loading": `Läser in...`,
		"loadingMore": `Läser in mer...`
	},
	"tr-TR": {
		"loading": `Yükleniyor...`,
		"loadingMore": `Daha fazla yükleniyor...`
	},
	"uk-UA": {
		"loading": `Завантаження…`,
		"loadingMore": `Завантаження інших об’єктів...`
	},
	"zh-CN": {
		"loading": `正在加载...`,
		"loadingMore": `正在加载更多...`
	},
	"zh-T": {
		"loading": `正在載入`,
		"loadingMore": `正在載入更多…`
	}
};
var ListBoxContext = /*#__PURE__*/ (0, import_react.createContext)(null);
function useListBoxContext() {
	const context = (0, import_react.useContext)(ListBoxContext);
	assert(!!context, "ListBoxContext is missing");
	return context;
}
var ListBoxLayout = class extends $942f06a693c162e2$export$cacbb3924155d68e {
	isLoading = false;
	constructor(opts) {
		super(opts);
		this.placeholderHeight = opts.placeholderHeight;
	}
	update(invalidationContext) {
		var _invalidationContext$;
		this.isLoading = ((_invalidationContext$ = invalidationContext.layoutOptions) === null || _invalidationContext$ === void 0 ? void 0 : _invalidationContext$.isLoading) || false;
		super.update(invalidationContext);
	}
	buildCollection() {
		let nodes = super.buildCollection(this.padding);
		let y = this.contentSize.height;
		if (this.isLoading) {
			var _this$virtualizer;
			let loader = new $eb6255cbf080eb7d$export$7e0eeb9da702a085("loader", "loader", new $af827553fd3cf456$export$c79fc6492f3af13d(0, y, (_this$virtualizer = this.virtualizer) === null || _this$virtualizer === void 0 ? void 0 : _this$virtualizer.visibleRect.width, 40));
			let node = {
				layoutInfo: loader,
				validRect: loader.rect
			};
			nodes.push(node);
			this.layoutNodes.set(loader.key, node);
			y = loader.rect.maxY;
		}
		if (nodes.length === 0) {
			var _this$virtualizer2, _this$placeholderHeig, _this$virtualizer3;
			let placeholder = new $eb6255cbf080eb7d$export$7e0eeb9da702a085("placeholder", "placeholder", new $af827553fd3cf456$export$c79fc6492f3af13d(0, y, (_this$virtualizer2 = this.virtualizer) === null || _this$virtualizer2 === void 0 ? void 0 : _this$virtualizer2.visibleRect.width, (_this$placeholderHeig = this.placeholderHeight) !== null && _this$placeholderHeig !== void 0 ? _this$placeholderHeig : (_this$virtualizer3 = this.virtualizer) === null || _this$virtualizer3 === void 0 ? void 0 : _this$virtualizer3.visibleRect.height));
			let node = {
				layoutInfo: placeholder,
				validRect: placeholder.rect
			};
			nodes.push(node);
			this.layoutNodes.set(placeholder.key, node);
			y = placeholder.rect.maxY;
		}
		this.contentSize.height = y + this.padding;
		return nodes;
	}
	buildSection(node, x, y) {
		var _section$children;
		let headerNode = {
			type: "header",
			key: node.key + ":header",
			parentKey: node.key,
			value: null,
			level: node.level,
			index: node.index,
			hasChildNodes: false,
			childNodes: [],
			rendered: node.rendered,
			textValue: node.textValue
		};
		let header = this.buildSectionHeader(headerNode, x, y);
		header.node = headerNode;
		header.layoutInfo.parentKey = node.key;
		this.layoutNodes.set(headerNode.key, header);
		y += header.layoutInfo.rect.height;
		let section = super.buildSection(node, x, y);
		(_section$children = section.children) === null || _section$children === void 0 || _section$children.unshift(header);
		return section;
	}
};
/** @private */
function ListBoxOption(props) {
	const $ = c(29);
	const { item, shouldSelectOnPressUp, shouldFocusOnHover, shouldUseVirtualFocus } = props;
	const { rendered, key } = item;
	const { state } = useListBoxContext();
	const ref = (0, import_react.useRef)(null);
	const t0 = item["aria-label"];
	let t1;
	if ($[0] !== t0 || $[1] !== key || $[2] !== shouldSelectOnPressUp || $[3] !== shouldFocusOnHover || $[4] !== shouldUseVirtualFocus) {
		t1 = {
			"aria-label": t0,
			key,
			shouldSelectOnPressUp,
			shouldFocusOnHover,
			isVirtualized: true,
			shouldUseVirtualFocus
		};
		$[0] = t0;
		$[1] = key;
		$[2] = shouldSelectOnPressUp;
		$[3] = shouldFocusOnHover;
		$[4] = shouldUseVirtualFocus;
		$[5] = t1;
	} else t1 = $[5];
	const { optionProps, labelProps, descriptionProps, isSelected, isDisabled, isFocused, isPressed } = $dae966e193913d1b$export$497855f14858aa34(t1, state, ref);
	let t2;
	if ($[6] !== props || $[7] !== isDisabled) {
		t2 = {
			...props,
			isDisabled
		};
		$[6] = props;
		$[7] = isDisabled;
		$[8] = t2;
	} else t2 = $[8];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t2);
	const { isFocusVisible: isFocusVisible$1, focusProps } = $0c4a58759813079a$export$4e328f61c538687f();
	let t3;
	if ($[9] !== rendered) {
		t3 = isReactText(rendered) ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, { children: rendered }) : rendered;
		$[9] = rendered;
		$[10] = t3;
	} else t3 = $[10];
	const contents = t3;
	let t4;
	if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = $8f5a2122b0992be3$export$b9b3dfddab17db27();
		$[11] = t4;
	} else t4 = $[11];
	const isKeyboardModality = t4;
	const t5 = shouldUseVirtualFocus ? isFocused && isKeyboardModality : isFocusVisible$1;
	const t6 = isHovered && !shouldFocusOnHover || isFocused && !isKeyboardModality;
	let t7;
	if ($[12] !== shouldFocusOnHover || $[13] !== hoverProps) {
		t7 = shouldFocusOnHover ? {} : hoverProps;
		$[12] = shouldFocusOnHover;
		$[13] = hoverProps;
		$[14] = t7;
	} else t7 = $[14];
	let t8;
	if ($[15] !== optionProps || $[16] !== focusProps || $[17] !== t7) {
		t8 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(optionProps, focusProps, t7);
		$[15] = optionProps;
		$[16] = focusProps;
		$[17] = t7;
		$[18] = t8;
	} else t8 = $[18];
	let t9;
	if ($[19] !== descriptionProps || $[20] !== labelProps || $[21] !== t5 || $[22] !== t6 || $[23] !== t8 || $[24] !== isPressed || $[25] !== isSelected || $[26] !== ref || $[27] !== contents) {
		t9 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListItem, {
			descriptionProps,
			labelProps,
			isFocused: t5,
			isHovered: t6,
			...t8,
			isPressed,
			isSelected,
			ref,
			children: contents
		});
		$[19] = descriptionProps;
		$[20] = labelProps;
		$[21] = t5;
		$[22] = t6;
		$[23] = t8;
		$[24] = isPressed;
		$[25] = isSelected;
		$[26] = ref;
		$[27] = contents;
		$[28] = t9;
	} else t9 = $[28];
	return t9;
}
/** @private */
function ListBoxSection(props) {
	const $ = c(32);
	const { children, layoutInfo, headerLayoutInfo, virtualizer, item } = props;
	const t0 = item["aria-label"];
	let t1;
	if ($[0] !== item.rendered || $[1] !== t0) {
		t1 = {
			heading: item.rendered,
			"aria-label": t0
		};
		$[0] = item.rendered;
		$[1] = t0;
		$[2] = t1;
	} else t1 = $[2];
	const { headingProps, groupProps } = $3d6c959d2ef57b72$export$c3f9f39876e4bc7(t1);
	const headerRef = (0, import_react.useRef)(null);
	let t2;
	if ($[3] !== headerLayoutInfo || $[4] !== virtualizer || $[5] !== headerRef) {
		t2 = {
			layoutInfo: headerLayoutInfo,
			virtualizer,
			ref: headerRef
		};
		$[3] = headerLayoutInfo;
		$[4] = virtualizer;
		$[5] = headerRef;
		$[6] = t2;
	} else t2 = $[6];
	$cd3854145620ec6a$export$1da781778207e0a2(t2);
	const { direction } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	const { state } = useListBoxContext();
	let t3;
	if ($[7] !== headerLayoutInfo || $[8] !== direction) {
		t3 = $6c92e9e346cd7b1c$export$1481e64fbe01b8b3(headerLayoutInfo, direction);
		$[7] = headerLayoutInfo;
		$[8] = direction;
		$[9] = t3;
	} else t3 = $[9];
	let t4;
	if ($[10] !== state.collection || $[11] !== item.key) {
		t4 = item.key !== state.collection.getFirstKey() && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Divider, {
			role: "presentation",
			elementType: "div",
			size: "medium",
			UNSAFE_className: css({ margin: tokenSchema.size.space.medium })
		});
		$[10] = state.collection;
		$[11] = item.key;
		$[12] = t4;
	} else t4 = $[12];
	let t5;
	if ($[13] !== item.rendered || $[14] !== headingProps) {
		t5 = item.rendered && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
			...headingProps,
			casing: "uppercase",
			color: "neutralSecondary",
			size: "small",
			weight: "medium",
			UNSAFE_className: css({ padding: tokenSchema.size.space.medium }),
			children: item.rendered
		});
		$[13] = item.rendered;
		$[14] = headingProps;
		$[15] = t5;
	} else t5 = $[15];
	let t6;
	if ($[16] !== headerRef || $[17] !== t3 || $[18] !== t4 || $[19] !== t5) {
		t6 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			role: "presentation",
			ref: headerRef,
			style: t3,
			children: [t4, t5]
		});
		$[16] = headerRef;
		$[17] = t3;
		$[18] = t4;
		$[19] = t5;
		$[20] = t6;
	} else t6 = $[20];
	let t7;
	if ($[21] !== layoutInfo || $[22] !== direction) {
		t7 = layoutInfo ? $6c92e9e346cd7b1c$export$1481e64fbe01b8b3(layoutInfo, direction) : void 0;
		$[21] = layoutInfo;
		$[22] = direction;
		$[23] = t7;
	} else t7 = $[23];
	let t8;
	if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
		t8 = classNames(css({}), "ListBoxSection");
		$[24] = t8;
	} else t8 = $[24];
	let t9;
	if ($[25] !== groupProps || $[26] !== t7 || $[27] !== children) {
		t9 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...groupProps,
			style: t7,
			className: t8,
			children
		});
		$[25] = groupProps;
		$[26] = t7;
		$[27] = children;
		$[28] = t9;
	} else t9 = $[28];
	let t10;
	if ($[29] !== t6 || $[30] !== t9) {
		t10 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [t6, t9] });
		$[29] = t6;
		$[30] = t9;
		$[31] = t10;
	} else t10 = $[31];
	return t10;
}
/** @private */
function useListBoxLayout() {
	const $ = c(5);
	const { scale } = useProvider();
	let t0;
	const t1 = scale === "large" ? 48 : 32;
	const t2 = scale === "large" ? 33 : 26;
	const t3 = scale === "large" ? 5 : 4;
	const t4 = scale === "large" ? 48 : 32;
	let t5;
	if ($[0] !== t1 || $[1] !== t2 || $[2] !== t3 || $[3] !== t4) {
		t5 = new ListBoxLayout({
			estimatedRowHeight: t1,
			estimatedHeadingHeight: t2,
			padding: t3,
			placeholderHeight: t4
		});
		$[0] = t1;
		$[1] = t2;
		$[2] = t3;
		$[3] = t4;
		$[4] = t5;
	} else t5 = $[4];
	t0 = t5;
	return t0;
}
/** @private */
function ListBoxBase(props, forwardedRef) {
	const $ = c(39);
	const { layout, state, shouldFocusOnHover: t0, shouldUseVirtualFocus: t1, domProps: t2, isLoading, showLoadingSpinner: t3, onScroll, renderEmptyState } = props;
	const shouldFocusOnHover = t0 === void 0 ? false : t0;
	const shouldUseVirtualFocus = t1 === void 0 ? false : t1;
	let t4;
	if ($[0] !== t2) {
		t4 = t2 === void 0 ? {} : t2;
		$[0] = t2;
		$[1] = t4;
	} else t4 = $[1];
	const domProps = t4;
	const showLoadingSpinner = t3 === void 0 ? isLoading : t3;
	let t5;
	if ($[2] !== props || $[3] !== layout) {
		t5 = {
			...props,
			layoutDelegate: layout,
			isVirtualized: true
		};
		$[2] = props;
		$[3] = layout;
		$[4] = t5;
	} else t5 = $[4];
	const { listBoxProps } = $686593f99a1df089$export$50eacbbf140a3141(t5, state, forwardedRef);
	const styleProps = useStyleProps(props);
	const stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages$1);
	let t6;
	if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = (parent, reusableView, children, renderChildren) => {
			if (reusableView.viewType === "section") {
				var _children$find;
				return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListBoxSection, {
					item: reusableView.content,
					layoutInfo: reusableView.layoutInfo,
					virtualizer: reusableView.virtualizer,
					headerLayoutInfo: (_children$find = children.find((c) => c.viewType === "header")) === null || _children$find === void 0 ? void 0 : _children$find.layoutInfo,
					children: renderChildren(children.filter((c_0) => c_0.viewType === "item"))
				}, reusableView.key);
			}
			return /*#__PURE__*/ (0, import_jsx_runtime.jsx)($6c92e9e346cd7b1c$export$6796df8ba7398521, {
				layoutInfo: reusableView.layoutInfo,
				virtualizer: reusableView.virtualizer,
				parent: parent === null || parent === void 0 ? void 0 : parent.layoutInfo,
				children: reusableView.rendered
			}, reusableView.key);
		};
		$[5] = t6;
	} else t6 = $[5];
	const renderWrapper = t6;
	const focusedKey = state.selectionManager.focusedKey;
	let t7;
	let t8;
	if ($[6] !== focusedKey) {
		t8 = focusedKey != null ? /* @__PURE__ */ new Set([focusedKey]) : null;
		$[6] = focusedKey;
		$[7] = t8;
	} else t8 = $[7];
	t7 = t8;
	const persistedKeys = t7;
	let t9;
	if ($[8] !== state || $[9] !== renderEmptyState || $[10] !== shouldFocusOnHover || $[11] !== shouldUseVirtualFocus) {
		t9 = {
			state,
			renderEmptyState,
			shouldFocusOnHover,
			shouldUseVirtualFocus
		};
		$[8] = state;
		$[9] = renderEmptyState;
		$[10] = shouldFocusOnHover;
		$[11] = shouldUseVirtualFocus;
		$[12] = t9;
	} else t9 = $[12];
	let t10;
	if ($[13] !== listBoxProps || $[14] !== domProps) {
		t10 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(listBoxProps, domProps);
		$[13] = listBoxProps;
		$[14] = domProps;
		$[15] = t10;
	} else t10 = $[15];
	const t11 = !!props.autoFocus;
	let t12;
	let t13;
	if ($[16] !== showLoadingSpinner) {
		t13 = { isLoading: showLoadingSpinner };
		$[16] = showLoadingSpinner;
		$[17] = t13;
	} else t13 = $[17];
	t12 = t13;
	let t14;
	if ($[18] !== shouldUseVirtualFocus || $[19] !== state.collection.size || $[20] !== stringFormatter || $[21] !== props) {
		t14 = (type, item) => {
			if (type === "item") return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListBoxOption, {
				item,
				shouldUseVirtualFocus
			});
			else if (type === "loader") return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				role: "option",
				style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					height: "100%"
				},
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProgressCircle, {
					isIndeterminate: true,
					size: "small",
					"aria-label": state.collection.size > 0 ? stringFormatter.format("loadingMore") : stringFormatter.format("loading")
				})
			});
			else if (type === "placeholder") {
				const emptyState = props.renderEmptyState ? props.renderEmptyState() : null;
				if (emptyState == null) return null;
				return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
					role: "option",
					children: emptyState
				});
			}
		};
		$[18] = shouldUseVirtualFocus;
		$[19] = state.collection.size;
		$[20] = stringFormatter;
		$[21] = props;
		$[22] = t14;
	} else t14 = $[22];
	let t15;
	if ($[23] !== styleProps || $[24] !== t10 || $[25] !== forwardedRef || $[26] !== persistedKeys || $[27] !== t11 || $[28] !== layout || $[29] !== t12 || $[30] !== state.collection || $[31] !== props.isLoading || $[32] !== props.onLoadMore || $[33] !== onScroll || $[34] !== t14) {
		t15 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)($535772f9d2c1f38d$export$20e40289641fbbb6, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)($b29c836adf9e092e$export$89be5a243e59c4b2, {
			...styleProps,
			...t10,
			ref: forwardedRef,
			persistedKeys,
			autoFocus: t11,
			scrollDirection: "vertical",
			layout,
			layoutOptions: t12,
			collection: state.collection,
			renderWrapper,
			isLoading: props.isLoading,
			onLoadMore: props.onLoadMore,
			onScroll,
			children: t14
		}) });
		$[23] = styleProps;
		$[24] = t10;
		$[25] = forwardedRef;
		$[26] = persistedKeys;
		$[27] = t11;
		$[28] = layout;
		$[29] = t12;
		$[30] = state.collection;
		$[31] = props.isLoading;
		$[32] = props.onLoadMore;
		$[33] = onScroll;
		$[34] = t14;
		$[35] = t15;
	} else t15 = $[35];
	let t16;
	if ($[36] !== t9 || $[37] !== t15) {
		t16 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ListBoxContext.Provider, {
			value: t9,
			children: t15
		});
		$[36] = t9;
		$[37] = t15;
		$[38] = t16;
	} else t16 = $[38];
	return t16;
}
var _ListBoxBase = /*#__PURE__*/ (0, import_react.forwardRef)(ListBoxBase);
var listStyles = css({
	borderRadius: "inherit",
	maxHeight: "var(--popover-max-height, inherit)",
	outline: 0,
	overflowY: "auto",
	paddingBlock: tokenSchema.size.space.small,
	userSelect: "none"
});
//#endregion
//#region node_modules/react-stately/dist/private/menu/useMenuTriggerState.mjs
function $e3403870bfb691da$export$79fefeb1c2091ac3(props) {
	let overlayTriggerState = $f11fb0bcf1b2687a$export$61c6a8c84e605fb6(props);
	let [focusStrategy, setFocusStrategy] = (0, import_react.useState)(null);
	let [expandedKeysStack, setExpandedKeysStack] = (0, import_react.useState)([]);
	let closeAll = () => {
		setExpandedKeysStack([]);
		overlayTriggerState.close();
	};
	let openSubmenu = (triggerKey, level) => {
		setExpandedKeysStack((oldStack) => {
			if (level > oldStack.length) return oldStack;
			return [...oldStack.slice(0, level), triggerKey];
		});
	};
	let closeSubmenu = (triggerKey, level) => {
		setExpandedKeysStack((oldStack) => {
			if (oldStack[level] === triggerKey) return oldStack.slice(0, level);
			else return oldStack;
		});
	};
	return {
		focusStrategy,
		...overlayTriggerState,
		open(focusStrategy = null) {
			setFocusStrategy(focusStrategy);
			overlayTriggerState.open();
		},
		toggle(focusStrategy = null) {
			setFocusStrategy(focusStrategy);
			overlayTriggerState.toggle();
		},
		close() {
			closeAll();
		},
		expandedKeysStack,
		openSubmenu,
		closeSubmenu
	};
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-combobox.js
var comboboxClassList = new ClassList("Combobox", ["input", "mobile-trigger"]);
var localizedMessages = {
	"ar-AE": {
		"clear": `مسح`,
		"invalid": `(غير صالح)`,
		"loading": `جارٍ التحميل...`,
		"noResults": `لا توجد نتائج`,
		"buttonLabel": `عرض المقترحات`,
		"listboxLabel": `مقترحات`
	},
	"bg-BG": {
		"clear": `Изчисти`,
		"invalid": `(невалиден)`,
		"loading": `Зареждане...`,
		"noResults": `Няма резултати`,
		"buttonLabel": `Покажи предложения`,
		"listboxLabel": `Предложения`
	},
	"cs-CZ": {
		"clear": `Vymazat`,
		"invalid": `(neplatné)`,
		"loading": `Načítání...`,
		"noResults": `Žádné výsledky`,
		"buttonLabel": `Zobrazit doporučení`,
		"listboxLabel": `Návrhy`
	},
	"da-DK": {
		"clear": `Ryd`,
		"invalid": `(ugyldig)`,
		"loading": `Indlæser ...`,
		"noResults": `Ingen resultater`,
		"buttonLabel": `Vis forslag`,
		"listboxLabel": `Forslag`
	},
	"de-DE": {
		"clear": `Löschen`,
		"invalid": `(ungültig)`,
		"loading": `Wird geladen...`,
		"noResults": `Keine Ergebnisse`,
		"buttonLabel": `Empfehlungen anzeigen`,
		"listboxLabel": `Empfehlungen`
	},
	"el-GR": {
		"clear": `Καθαρισμός`,
		"invalid": `(δεν ισχύει)`,
		"loading": `Φόρτωση...`,
		"noResults": `Χωρίς αποτέλεσμα`,
		"buttonLabel": `Προβολή προτάσεων`,
		"listboxLabel": `Προτάσεις`
	},
	"en-US": {
		"clear": `Clear`,
		"invalid": `(invalid)`,
		"loading": `Loading...`,
		"noResults": `No results`,
		"buttonLabel": `Show suggestions`,
		"listboxLabel": `Suggestions`
	},
	"es-ES": {
		"clear": `Borrar`,
		"invalid": `(no válido)`,
		"loading": `Cargando...`,
		"noResults": `Sin resultados`,
		"buttonLabel": `Mostrar sugerencias`,
		"listboxLabel": `Sugerencias`
	},
	"et-EE": {
		"clear": `Puhasta`,
		"invalid": `(kehtetu)`,
		"loading": `Laadimine...`,
		"noResults": `Tulemusi pole`,
		"buttonLabel": `Kuva soovitused`,
		"listboxLabel": `Soovitused`
	},
	"fi-FI": {
		"clear": `Kirkas`,
		"invalid": `(epäkelpo)`,
		"loading": `Ladataan...`,
		"noResults": `Ei tuloksia`,
		"buttonLabel": `Näytä ehdotukset`,
		"listboxLabel": `Ehdotukset`
	},
	"fr-FR": {
		"clear": `Effacer`,
		"invalid": `(non valide)`,
		"loading": `Chargement en cours...`,
		"noResults": `Aucun résultat`,
		"buttonLabel": `Afficher les suggestions`,
		"listboxLabel": `Suggestions`
	},
	"he-IL": {
		"clear": `נקי`,
		"invalid": `(לא חוקי)`,
		"loading": `טוען...`,
		"noResults": `אין תוצאות`,
		"buttonLabel": `הצג הצעות`,
		"listboxLabel": `הצעות`
	},
	"hr-HR": {
		"clear": `Izbriši`,
		"invalid": `(nevažeće)`,
		"loading": `Učitavam...`,
		"noResults": `Nema rezultata`,
		"buttonLabel": `Prikaži prijedloge`,
		"listboxLabel": `Prijedlozi`
	},
	"hu-HU": {
		"clear": `Törlés`,
		"invalid": `(érvénytelen)`,
		"loading": `Betöltés folyamatban…`,
		"noResults": `Nincsenek találatok`,
		"buttonLabel": `Javaslatok megjelenítése`,
		"listboxLabel": `Javaslatok`
	},
	"it-IT": {
		"clear": `Cancella`,
		"invalid": `(non valido)`,
		"loading": `Caricamento in corso...`,
		"noResults": `Nessun risultato`,
		"buttonLabel": `Mostra suggerimenti`,
		"listboxLabel": `Suggerimenti`
	},
	"ja-JP": {
		"clear": `クリア`,
		"invalid": `(無効)`,
		"loading": `読み込み中...`,
		"noResults": `結果なし`,
		"buttonLabel": `候補を表示`,
		"listboxLabel": `候補`
	},
	"ko-KR": {
		"clear": `지우기`,
		"invalid": `(유효하지 않음)`,
		"loading": `로드 중...`,
		"noResults": `결과 없음`,
		"buttonLabel": `제안 사항 표시`,
		"listboxLabel": `제안`
	},
	"lt-LT": {
		"clear": `Skaidrus`,
		"invalid": `(netinkama)`,
		"loading": `Įkeliama...`,
		"noResults": `Be rezultatų`,
		"buttonLabel": `Rodyti pasiūlymus`,
		"listboxLabel": `Pasiūlymai`
	},
	"lv-LV": {
		"clear": `Notīrīt`,
		"invalid": `(nederīgs)`,
		"loading": `Notiek ielāde...`,
		"noResults": `Nav rezultātu`,
		"buttonLabel": `Rādīt ieteikumus`,
		"listboxLabel": `Ieteikumi`
	},
	"nb-NO": {
		"clear": `Tøm`,
		"invalid": `(ugyldig)`,
		"loading": `Laster inn ...`,
		"noResults": `Ingen resultater`,
		"buttonLabel": `Vis forslag`,
		"listboxLabel": `Forslag`
	},
	"nl-NL": {
		"clear": `Helder`,
		"invalid": `(ongeldig)`,
		"loading": `Laden...`,
		"noResults": `Geen resultaten`,
		"buttonLabel": `Suggesties weergeven`,
		"listboxLabel": `Suggesties`
	},
	"pl-PL": {
		"clear": `Wyczyść`,
		"invalid": `(nieprawidłowy)`,
		"loading": `Trwa ładowanie...`,
		"noResults": `Brak wyników`,
		"buttonLabel": `Wyświetlaj sugestie`,
		"listboxLabel": `Sugestie`
	},
	"pt-BR": {
		"clear": `Limpar`,
		"invalid": `(inválido)`,
		"loading": `Carregando...`,
		"noResults": `Nenhum resultado`,
		"buttonLabel": `Mostrar sugestões`,
		"listboxLabel": `Sugestões`
	},
	"pt-PT": {
		"clear": `Limpar`,
		"invalid": `(inválido)`,
		"loading": `A carregar...`,
		"noResults": `Sem resultados`,
		"buttonLabel": `Apresentar sugestões`,
		"listboxLabel": `Sugestões`
	},
	"ro-RO": {
		"clear": `Golire`,
		"invalid": `(nevalid)`,
		"loading": `Se încarcă...`,
		"noResults": `Niciun rezultat`,
		"buttonLabel": `Afișare sugestii`,
		"listboxLabel": `Sugestii`
	},
	"ru-RU": {
		"clear": `Очистить`,
		"invalid": `(недействительно)`,
		"loading": `Загрузка...`,
		"noResults": `Результаты отсутствуют`,
		"buttonLabel": `Показать предложения`,
		"listboxLabel": `Предложения`
	},
	"sk-SK": {
		"clear": `Vymazať`,
		"invalid": `(neplatné)`,
		"loading": `Načítava sa...`,
		"noResults": `Žiadne výsledky`,
		"buttonLabel": `Zobraziť návrhy`,
		"listboxLabel": `Návrhy`
	},
	"sl-SI": {
		"clear": `Jasen`,
		"invalid": `(neveljavno)`,
		"loading": `Nalaganje...`,
		"noResults": `Ni rezultatov`,
		"buttonLabel": `Prikaži predloge`,
		"listboxLabel": `Predlogi`
	},
	"sr-SP": {
		"clear": `Izbriši`,
		"invalid": `(nevažeće)`,
		"loading": `Učitavam...`,
		"noResults": `Nema rezultata`,
		"buttonLabel": `Prikaži predloge`,
		"listboxLabel": `Predlozi`
	},
	"sv-SE": {
		"clear": `Rensa`,
		"invalid": `(ogiltigt)`,
		"loading": `Läser in...`,
		"noResults": `Inga resultat`,
		"buttonLabel": `Visa förslag`,
		"listboxLabel": `Förslag`
	},
	"tr-TR": {
		"clear": `Temizle`,
		"invalid": `(geçersiz)`,
		"loading": `Yükleniyor...`,
		"noResults": `Sonuç yok`,
		"buttonLabel": `Önerileri göster`,
		"listboxLabel": `Öneriler`
	},
	"uk-UA": {
		"clear": `Очистити`,
		"invalid": `(недійсне)`,
		"loading": `Завантаження...`,
		"noResults": `Результатів немає`,
		"buttonLabel": `Показати пропозиції`,
		"listboxLabel": `Пропозиції`
	},
	"zh-CN": {
		"clear": `透明`,
		"invalid": `（无效）`,
		"loading": `正在加载...`,
		"noResults": `无结果`,
		"buttonLabel": `显示建议`,
		"listboxLabel": `建议`
	},
	"zh-TW": {
		"clear": `清除`,
		"invalid": `(無效)`,
		"loading": `正在載入...`,
		"noResults": `無任何結果`,
		"buttonLabel": `顯示建議`,
		"listboxLabel": `建議`
	}
};
function MobileCombobox(_props, forwardedRef) {
	const props = useProviderProps(_props);
	let { isDisabled, validationState, isReadOnly } = props;
	let { contains } = $ef182bb9912241d8$export$3274cf84b703fff({ sensitivity: "base" });
	let state = $120eca7b9c40f820$export$b453a3bfd4a5fa9e({
		...props,
		defaultFilter: contains,
		allowsEmptyCollection: true,
		shouldCloseOnBlur: false
	});
	let buttonRef = (0, import_react.useRef)(null);
	let domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let { triggerProps, overlayProps } = $f282e36c29c025e8$export$f9d5c8beee7d008d({ type: "listbox" }, state, buttonRef);
	let { labelProps, fieldProps } = $191c9b6d48a0a4e2$export$294aa081a6c6f55d({
		...props,
		labelElementType: "span"
	});
	labelProps = {
		...labelProps,
		onClick: () => {
			let button = buttonRef.current;
			if (button && !props.isDisabled) {
				button.focus();
				$8f5a2122b0992be3$export$8397ddfc504fdb9a("keyboard");
			}
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldPrimitive, {
		...props,
		labelProps,
		ref: domRef,
		supplementRequiredState: true,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxButton$1, {
			...$bbaa08b3cd72f041$export$9d1611c77c2fe928(triggerProps, fieldProps, { autoFocus: props.autoFocus }),
			ref: buttonRef,
			isDisabled,
			isReadOnly,
			isPlaceholder: !state.inputValue,
			validationState,
			onPress: () => !isReadOnly && state.open(null, "manual"),
			children: state.inputValue || props.placeholder || ""
		})
	}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tray, {
		state,
		isFixedHeight: true,
		...overlayProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxTray$1, {
			...props,
			onClose: state.close,
			overlayProps,
			state
		})
	})] });
}
var ComboboxButton$1 = /*#__PURE__*/ import_react.forwardRef(function ComboboxButton(props, forwardedRef) {
	let { isDisabled, isPlaceholder, validationState, children, style } = props;
	let valueId = $390e54f620492c70$export$f680877a34711e37();
	let invalidId = $390e54f620492c70$export$f680877a34711e37();
	let domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456({});
	let { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3({
		...props,
		"aria-labelledby": [
			props["aria-labelledby"],
			props["aria-label"] && !props["aria-labelledby"] ? props.id : null,
			valueId,
			validationState === "invalid" ? invalidId : null
		].filter(Boolean).join(" "),
		elementType: "div"
	}, domRef);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
		position: "relative",
		width: "alias.singleLineWidth",
		zIndex: 0,
		...toDataAttributes({ readonly: props.isReadOnly }),
		...$bbaa08b3cd72f041$export$9d1611c77c2fe928(hoverProps, buttonProps),
		"aria-haspopup": "dialog",
		ref: domRef,
		UNSAFE_className: comboboxClassList.element("mobile-trigger"),
		UNSAFE_style: {
			...style,
			outline: "none"
		},
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
				alignItems: "center",
				paddingX: "medium",
				flex: true,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
					id: valueId,
					color: isPlaceholder ? "neutralSecondary" : void 0,
					trim: false,
					truncate: true,
					children
				})
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputStateIndicator$1, {
				isHovered,
				isPressed,
				isDisabled,
				validationState
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(CosmeticFieldButton$1, {
				isHovered,
				isPressed,
				isDisabled,
				validationState,
				UNSAFE_className: css({
					borderEndStartRadius: 0,
					borderStartStartRadius: 0,
					[`${comboboxClassList.selector("mobile-trigger")}[data-focus] &`]: { borderColor: tokenSchema.color.alias.borderFocused }
				}),
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, { src: chevronDownIcon })
			})
		]
	}) });
});
var CosmeticFieldButton$1 = (props) => {
	let { isHovered, isPressed, ...otherProps } = props;
	let { children, styleProps } = useFieldButton(otherProps, {
		isHovered,
		isPressed
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		"data-disabled": props.isDisabled,
		...styleProps,
		children
	});
};
var InputStateIndicator$1 = (props) => {
	let { isDisabled, isHovered, isPressed } = props;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		role: "presentation",
		...toDataAttributes({
			disabled: isDisabled,
			interaction: isPressed ? "press" : isHovered ? "hover" : void 0,
			validation: props.validationState
		}),
		className: css({
			backgroundColor: tokenSchema.color.background.canvas,
			border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`,
			borderRadius: tokenSchema.size.radius.regular,
			inset: 0,
			position: "absolute",
			transition: transition(["border-color", "box-shadow"]),
			zIndex: -1,
			"&[data-interaction=hover]": { borderColor: tokenSchema.color.alias.borderHovered },
			"&[data-validation=invalid]": { borderColor: tokenSchema.color.alias.borderInvalid },
			[`${comboboxClassList.selector("mobile-trigger")}[data-focus] &`]: { borderColor: tokenSchema.color.alias.borderFocused },
			[`${comboboxClassList.selector("mobile-trigger")}[data-focus]:not([data-readonly]) &`]: { boxShadow: `0 0 0 1px ${tokenSchema.color.alias.borderFocused}` },
			"&[data-disabled=true]": {
				backgroundColor: tokenSchema.color.background.surfaceSecondary,
				borderColor: "transparent"
			}
		})
	});
};
function ComboboxTray$1(props) {
	let { state, isDisabled, validationState, label, overlayProps, loadingState, onLoadMore, onClose } = props;
	let timeoutRef = (0, import_react.useRef)(void 0);
	let [showLoading, setShowLoading] = (0, import_react.useState)(false);
	let inputRef = (0, import_react.useRef)(null);
	let buttonRef = (0, import_react.useRef)(null);
	let popoverRef = (0, import_react.useRef)(null);
	let listBoxRef = (0, import_react.useRef)(null);
	let layout = useListBoxLayout();
	let stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages);
	let { inputProps, listBoxProps, labelProps } = $bf505c7417d9b616$export$8c18d1b4f7232bbf({
		...props,
		layoutDelegate: layout,
		buttonRef,
		popoverRef,
		listBoxRef,
		inputRef
	}, state);
	import_react.useEffect(() => {
		let input = inputRef.current;
		if (input) $f192c2f16961cbe0$export$80f3e147d781571c(input);
		return () => {
			state.setFocused(false);
		};
	}, []);
	let { dialogProps } = $13150e6629d46e45$export$d55e7ee900f34e93({ "aria-labelledby": $390e54f620492c70$export$f680877a34711e37(labelProps.id) }, popoverRef);
	inputProps.role = "searchbox";
	inputProps["aria-haspopup"] = "listbox";
	delete inputProps.onTouchEnd;
	let clearButton = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearButton, {
		preventFocus: true,
		"aria-label": stringFormatter.format("clear"),
		excludeFromTabOrder: true,
		onPress: () => {
			state.setInputValue("");
			let input_0 = inputRef.current;
			if (input_0) input_0.focus();
		},
		isDisabled
	});
	let loadingCircle = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
		alignItems: "center",
		flexShrink: 0,
		justifyContent: "center",
		pointerEvents: "none",
		width: "element.regular",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProgressCircle, {
			"aria-label": stringFormatter.format("loading"),
			size: "small",
			isIndeterminate: true
		})
	});
	let isTouchDown = (0, import_react.useRef)(false);
	let onTouchStart = () => {
		isTouchDown.current = true;
	};
	let onTouchEnd = () => {
		isTouchDown.current = false;
	};
	let onScroll = (0, import_react.useCallback)(() => {
		let input_1 = inputRef.current;
		let popover = popoverRef.current;
		if (!input_1 || document.activeElement !== input_1 || !isTouchDown.current) return;
		if (popover) popover.focus();
	}, [
		inputRef,
		popoverRef,
		isTouchDown
	]);
	let inputValue = inputProps.value;
	let lastInputValue = (0, import_react.useRef)(inputValue);
	(0, import_react.useEffect)(() => {
		if (loadingState === "filtering" && !showLoading) {
			if (!timeoutRef.current) timeoutRef.current = setTimeout(() => {
				setShowLoading(true);
			}, 500);
			if (inputValue !== lastInputValue.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setShowLoading(true);
				}, 500);
			}
		} else if (loadingState !== "filtering") {
			setShowLoading(false);
			clearTimeout(timeoutRef.current);
			timeoutRef.current = void 0;
		}
		lastInputValue.current = inputValue;
	}, [
		loadingState,
		inputValue,
		showLoading
	]);
	let onKeyDown = (e) => {
		let popover_0 = popoverRef.current;
		if (popover_0 && e.key === "Enter" && state.selectionManager.focusedKey == null) popover_0.focus();
		else {
			var _inputProps$onKeyDown;
			(_inputProps$onKeyDown = inputProps.onKeyDown) === null || _inputProps$onKeyDown === void 0 || _inputProps$onKeyDown.call(inputProps, e);
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)($535772f9d2c1f38d$export$20e40289641fbbb6, {
		restoreFocus: true,
		contain: true,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
			direction: "column",
			height: "100%",
			ref: popoverRef,
			...$bbaa08b3cd72f041$export$9d1611c77c2fe928(overlayProps, dialogProps),
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)($081058010ef8962e$export$2317d149ed6f78c4, { onDismiss: onClose }),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextFieldPrimitive, {
					label,
					labelProps,
					inputProps: {
						...inputProps,
						onKeyDown
					},
					ref: inputRef,
					isDisabled,
					marginX: "small",
					marginTop: "regular",
					endElement: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, { children: [showLoading && loadingState === "filtering" && loadingCircle, (state.inputValue !== "" || loadingState === "filtering" || validationState != null) && !props.isReadOnly && clearButton] })
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(_ListBoxBase, {
					...listBoxProps,
					domProps: {
						onTouchStart,
						onTouchEnd
					},
					disallowEmptySelection: true,
					shouldSelectOnPressUp: true,
					focusOnPointerEnter: true,
					layout,
					state,
					shouldUseVirtualFocus: true,
					renderEmptyState: () => loadingState !== "loading" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
						height: "element.regular",
						alignItems: "center",
						paddingX: "medium",
						children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
							color: "neutralSecondary",
							children: stringFormatter.format("noResults")
						})
					}),
					ref: listBoxRef,
					onScroll,
					onLoadMore,
					isLoading: loadingState === "loading" || loadingState === "loadingMore"
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)($081058010ef8962e$export$2317d149ed6f78c4, { onDismiss: onClose })
			]
		})
	});
}
var _MobileCombobox = /*#__PURE__*/ import_react.forwardRef(MobileCombobox);
function Combobox(props, forwardedRef) {
	const $ = c(8);
	props = useProviderProps(props);
	const t0 = props;
	let t1;
	if ($[0] !== t0) {
		t1 = validateTextFieldProps(t0);
		$[0] = t0;
		$[1] = t1;
	} else t1 = $[1];
	props = t1;
	if (useIsMobileDevice()) {
		let t2;
		if ($[2] !== props || $[3] !== forwardedRef) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(_MobileCombobox, {
				...props,
				menuTrigger: "input",
				ref: forwardedRef
			});
			$[2] = props;
			$[3] = forwardedRef;
			$[4] = t2;
		} else t2 = $[4];
		return t2;
	} else {
		let t2;
		if ($[5] !== props || $[6] !== forwardedRef) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxBase, {
				...props,
				ref: forwardedRef
			});
			$[5] = props;
			$[6] = forwardedRef;
			$[7] = t2;
		} else t2 = $[7];
		return t2;
	}
}
var ComboboxBase = /*#__PURE__*/ import_react.forwardRef(function ComboboxBase(props, forwardedRef) {
	var _state$focusStrategy;
	const $ = c(57);
	const { align: t0, menuTrigger: t1, shouldFlip: t2, direction: t3, loadingState, menuWidth, onLoadMore } = props;
	const align = t0 === void 0 ? "start" : t0;
	const menuTrigger = t1 === void 0 ? "input" : t1;
	const shouldFlip = t2 === void 0 ? true : t2;
	const direction = t3 === void 0 ? "bottom" : t3;
	const isAsync = loadingState != null;
	const buttonRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const listBoxRef = (0, import_react.useRef)(null);
	const popoverRef = (0, import_react.useRef)(null);
	const fieldRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let t4;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = { sensitivity: "base" };
		$[0] = t4;
	} else t4 = $[0];
	const { contains } = $ef182bb9912241d8$export$3274cf84b703fff(t4);
	let t5;
	if ($[1] !== props || $[2] !== contains || $[3] !== isAsync) {
		t5 = {
			...props,
			defaultFilter: contains,
			allowsEmptyCollection: isAsync
		};
		$[1] = props;
		$[2] = contains;
		$[3] = isAsync;
		$[4] = t5;
	} else t5 = $[4];
	const state = $120eca7b9c40f820$export$b453a3bfd4a5fa9e(t5);
	const layout = useListBoxLayout();
	let t6;
	if ($[5] !== props || $[6] !== layout || $[7] !== buttonRef || $[8] !== popoverRef || $[9] !== listBoxRef || $[10] !== inputRef || $[11] !== menuTrigger) {
		t6 = {
			...props,
			layoutDelegate: layout,
			buttonRef,
			popoverRef,
			listBoxRef,
			inputRef,
			menuTrigger
		};
		$[5] = props;
		$[6] = layout;
		$[7] = buttonRef;
		$[8] = popoverRef;
		$[9] = listBoxRef;
		$[10] = inputRef;
		$[11] = menuTrigger;
		$[12] = t6;
	} else t6 = $[12];
	const { buttonProps, inputProps, listBoxProps, labelProps, descriptionProps, errorMessageProps } = $bf505c7417d9b616$export$8c18d1b4f7232bbf(t6, state);
	let t7;
	if ($[13] !== menuWidth || $[14] !== buttonRef || $[15] !== inputRef || $[16] !== fieldRef) {
		t7 = {
			menuWidth,
			buttonRef,
			inputRef,
			fieldRef
		};
		$[13] = menuWidth;
		$[14] = buttonRef;
		$[15] = inputRef;
		$[16] = fieldRef;
		$[17] = t7;
	} else t7 = $[17];
	const popoverStyle = usePopoverStyles(t7);
	let t8;
	if ($[18] !== props || $[19] !== state.isOpen || $[20] !== loadingState || $[21] !== inputProps || $[22] !== inputRef || $[23] !== buttonProps || $[24] !== buttonRef) {
		t8 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxInput, {
			...props,
			isOpen: state.isOpen,
			loadingState,
			inputProps,
			inputRef,
			triggerProps: buttonProps,
			triggerRef: buttonRef
		});
		$[18] = props;
		$[19] = state.isOpen;
		$[20] = loadingState;
		$[21] = inputProps;
		$[22] = inputRef;
		$[23] = buttonProps;
		$[24] = buttonRef;
		$[25] = t8;
	} else t8 = $[25];
	let t9;
	if ($[26] !== props || $[27] !== descriptionProps || $[28] !== errorMessageProps || $[29] !== labelProps || $[30] !== fieldRef || $[31] !== t8) {
		t9 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldPrimitive, {
			width: "alias.singleLineWidth",
			...props,
			descriptionProps,
			errorMessageProps,
			labelProps,
			ref: fieldRef,
			children: t8
		});
		$[26] = props;
		$[27] = descriptionProps;
		$[28] = errorMessageProps;
		$[29] = labelProps;
		$[30] = fieldRef;
		$[31] = t8;
		$[32] = t9;
	} else t9 = $[32];
	const t10 = align === "end" ? buttonRef : inputRef;
	const t11 = `${direction} ${align}`;
	const t12 = (_state$focusStrategy = state.focusStrategy) !== null && _state$focusStrategy !== void 0 ? _state$focusStrategy : void 0;
	const t13 = loadingState === "loadingMore";
	let t14;
	if ($[33] !== isAsync || $[34] !== loadingState) {
		t14 = () => isAsync && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxEmptyState, { loadingState });
		$[33] = isAsync;
		$[34] = loadingState;
		$[35] = t14;
	} else t14 = $[35];
	let t15;
	if ($[36] !== listBoxProps || $[37] !== listBoxRef || $[38] !== t12 || $[39] !== layout || $[40] !== state || $[41] !== t13 || $[42] !== onLoadMore || $[43] !== t14) {
		t15 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(_ListBoxBase, {
			...listBoxProps,
			ref: listBoxRef,
			disallowEmptySelection: true,
			autoFocus: t12,
			shouldSelectOnPressUp: true,
			focusOnPointerEnter: true,
			layout,
			state,
			shouldUseVirtualFocus: true,
			isLoading: t13,
			onLoadMore,
			UNSAFE_className: listStyles,
			renderEmptyState: t14
		});
		$[36] = listBoxProps;
		$[37] = listBoxRef;
		$[38] = t12;
		$[39] = layout;
		$[40] = state;
		$[41] = t13;
		$[42] = onLoadMore;
		$[43] = t14;
		$[44] = t15;
	} else t15 = $[44];
	let t16;
	if ($[45] !== state || $[46] !== popoverStyle || $[47] !== popoverRef || $[48] !== t10 || $[49] !== listBoxRef || $[50] !== t11 || $[51] !== shouldFlip || $[52] !== t15) {
		t16 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Popover, {
			state,
			UNSAFE_style: popoverStyle,
			ref: popoverRef,
			triggerRef: t10,
			scrollRef: listBoxRef,
			placement: t11,
			hideArrow: true,
			isNonModal: true,
			shouldFlip,
			children: t15
		});
		$[45] = state;
		$[46] = popoverStyle;
		$[47] = popoverRef;
		$[48] = t10;
		$[49] = listBoxRef;
		$[50] = t11;
		$[51] = shouldFlip;
		$[52] = t15;
		$[53] = t16;
	} else t16 = $[53];
	let t17;
	if ($[54] !== t9 || $[55] !== t16) {
		t17 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t9, t16] });
		$[54] = t9;
		$[55] = t16;
		$[56] = t17;
	} else t17 = $[56];
	return t17;
});
function ComboboxEmptyState(props) {
	const $ = c(5);
	const stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages);
	let t0;
	if ($[0] !== props.loadingState || $[1] !== stringFormatter) {
		t0 = props.loadingState === "loading" ? stringFormatter.format("loading") : stringFormatter.format("noResults");
		$[0] = props.loadingState;
		$[1] = stringFormatter;
		$[2] = t0;
	} else t0 = $[2];
	let t1;
	if ($[3] !== t0) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
			height: "element.regular",
			alignItems: "center",
			paddingX: "medium",
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
				color: "neutralSecondary",
				children: t0
			})
		});
		$[3] = t0;
		$[4] = t1;
	} else t1 = $[4];
	return t1;
}
function usePopoverStyles(props) {
	const { buttonRef, inputRef, fieldRef, menuWidth: menuWidthProp } = props;
	let [menuWidth, setMenuWidth] = (0, import_react.useState)();
	let onResize = (0, import_react.useCallback)(() => {
		if (buttonRef.current && inputRef.current) {
			let buttonWidth = buttonRef.current.offsetWidth;
			let inputWidth = inputRef.current.offsetWidth;
			setMenuWidth(inputWidth + buttonWidth);
		}
	}, [
		buttonRef,
		inputRef,
		setMenuWidth
	]);
	$970072cf4b13fde3$export$683480f191c0e3ea({
		ref: fieldRef,
		onResize
	});
	(0, import_react.useLayoutEffect)(onResize, [onResize]);
	return {
		width: menuWidth,
		minWidth: menuWidthProp !== null && menuWidthProp !== void 0 ? menuWidthProp : menuWidth
	};
}
/** @private Used by multi variant. */
var ComboboxInput = /*#__PURE__*/ import_react.forwardRef(function ComboboxInput(props, forwardedRef) {
	let { isDisabled, inputProps, inputRef, triggerProps, triggerRef, autoFocus, style, loadingState, isOpen, menuTrigger } = props;
	let stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages);
	let timeoutRef = (0, import_react.useRef)(void 0);
	let [showLoading, setShowLoading] = (0, import_react.useState)(false);
	let loadingCircle = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
		alignItems: "center",
		flexShrink: 0,
		justifyContent: "center",
		pointerEvents: "none",
		width: "element.regular",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProgressCircle, {
			"aria-label": stringFormatter.format("loading"),
			size: "small",
			isIndeterminate: true
		})
	});
	let isLoading = loadingState === "loading" || loadingState === "filtering";
	let inputValue = inputProps.value;
	let lastInputValue = (0, import_react.useRef)(inputValue);
	(0, import_react.useEffect)(() => {
		if (isLoading && !showLoading) {
			if (!timeoutRef.current) timeoutRef.current = setTimeout(() => {
				setShowLoading(true);
			}, 500);
			if (inputValue !== lastInputValue.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setShowLoading(true);
				}, 500);
			}
		} else if (!isLoading) {
			setShowLoading(false);
			clearTimeout(timeoutRef.current);
			timeoutRef.current = void 0;
		}
		lastInputValue.current = inputValue;
	}, [
		isLoading,
		showLoading,
		inputValue
	]);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
		autoFocus,
		isTextInput: true,
		within: true,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			ref: forwardedRef,
			style,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextFieldPrimitive, {
				inputProps: {
					...inputProps,
					className: comboboxClassList.element("input")
				},
				ref: inputRef,
				isDisabled,
				endElement: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [showLoading && (isOpen || menuTrigger === "manual" || loadingState === "loading") ? loadingCircle : null, /*#__PURE__*/ (0, import_jsx_runtime.jsx)($0d47b37c475c5231$export$3351871ee4b288b8, {
					preventFocusOnPress: true,
					isPressed: isOpen,
					children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldButton, {
						...triggerProps,
						ref: triggerRef,
						UNSAFE_className: css({
							borderEndStartRadius: 0,
							borderStartStartRadius: 0,
							[`${comboboxClassList.selector("input")}[aria-invalid] ~ &`]: { borderColor: tokenSchema.color.alias.borderInvalid },
							[`${comboboxClassList.selector("input")}[readonly] ~ &`]: { borderColor: tokenSchema.color.alias.borderIdle },
							[`${comboboxClassList.selector("input")}:focus ~ &`]: { borderColor: tokenSchema.color.alias.borderFocused }
						}),
						children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, { src: chevronDownIcon })
					})
				})] })
			})
		})
	});
});
/**
* A combobox combines a text input with a listbox, and allows users to filter a
* list of options.
*/
var _Combobox = /*#__PURE__*/ import_react.forwardRef(Combobox);
function useComboboxMultiState(props) {
	var _props$defaultInputVa, _props$items;
	const $ = c(72);
	const { allowsEmptyCollection: t0, menuTrigger: t1 } = props;
	const allowsEmptyCollection = t0 === void 0 ? false : t0;
	const menuTrigger = t1 === void 0 ? "input" : t1;
	const [showAllItems, setShowAllItems] = (0, import_react.useState)(false);
	const [inputValue, setInputValue] = $3e6197669829fe11$export$40bfa8c7b0832715(props.inputValue, (_props$defaultInputVa = props.defaultInputValue) !== null && _props$defaultInputVa !== void 0 ? _props$defaultInputVa : "", props.onInputChange);
	const t2 = (_props$items = props.items) !== null && _props$items !== void 0 ? _props$items : props.defaultItems;
	let t3;
	if ($[0] !== props.onSelectionChange || $[1] !== setInputValue) {
		t3 = (selection) => {
			var _props$onSelectionCha;
			(_props$onSelectionCha = props.onSelectionChange) === null || _props$onSelectionCha === void 0 || _props$onSelectionCha.call(props, selection);
			setInputValue("");
		};
		$[0] = props.onSelectionChange;
		$[1] = setInputValue;
		$[2] = t3;
	} else t3 = $[2];
	let t4;
	if ($[3] !== props || $[4] !== t2 || $[5] !== t3) {
		t4 = {
			...props,
			items: t2,
			onSelectionChange: t3,
			selectionBehavior: "toggle",
			selectionMode: "multiple"
		};
		$[3] = props;
		$[4] = t2;
		$[5] = t3;
		$[6] = t4;
	} else t4 = $[6];
	const listState = $b14b6f590b50af39$export$2f645645f7bca764(t4);
	let t5;
	if ($[7] !== props) {
		t5 = {
			...props,
			onOpenChange: props.onOpenChange,
			isOpen: void 0,
			defaultOpen: void 0
		};
		$[7] = props;
		$[8] = t5;
	} else t5 = $[8];
	const triggerState = $e3403870bfb691da$export$79fefeb1c2091ac3(t5);
	const lastInputValue = usePrevious(inputValue);
	const { collection } = listState;
	const originalCollection = collection;
	let t6;
	if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = { sensitivity: "base" };
		$[9] = t6;
	} else t6 = $[9];
	const { contains } = $ef182bb9912241d8$export$3274cf84b703fff(t6);
	let t7;
	bb0: {
		if (props.items != null) {
			t7 = collection;
			break bb0;
		}
		let t8;
		if ($[10] !== collection || $[11] !== inputValue || $[12] !== contains) {
			t8 = filterCollection(collection, inputValue, contains);
			$[10] = collection;
			$[11] = inputValue;
			$[12] = contains;
			$[13] = t8;
		} else t8 = $[13];
		t7 = t8;
	}
	const filteredCollection = t7;
	const [lastCollection, setLastCollection] = (0, import_react.useState)(filteredCollection);
	let t8;
	if ($[14] !== showAllItems || $[15] !== originalCollection || $[16] !== filteredCollection) {
		t8 = () => {
			setLastCollection(showAllItems ? originalCollection : filteredCollection);
		};
		$[14] = showAllItems;
		$[15] = originalCollection;
		$[16] = filteredCollection;
		$[17] = t8;
	} else t8 = $[17];
	const updateLastCollection = t8;
	let t9;
	if ($[18] !== updateLastCollection || $[19] !== triggerState) {
		t9 = () => {
			updateLastCollection();
			triggerState.close();
		};
		$[18] = updateLastCollection;
		$[19] = triggerState;
		$[20] = t9;
	} else t9 = $[20];
	const closeMenu = t9;
	let t10;
	if ($[21] !== setInputValue || $[22] !== closeMenu) {
		t10 = () => {
			setInputValue("");
			closeMenu();
		};
		$[21] = setInputValue;
		$[22] = closeMenu;
		$[23] = t10;
	} else t10 = $[23];
	const close = t10;
	let t11;
	if ($[24] !== menuTrigger || $[25] !== allowsEmptyCollection || $[26] !== filteredCollection.size || $[27] !== originalCollection.size || $[28] !== props.items || $[29] !== triggerState) {
		t11 = (t12) => {
			const focusStrategy = t12 === void 0 ? null : t12;
			const displayAllItems = menuTrigger === "focus";
			if (allowsEmptyCollection || filteredCollection.size > 0 || displayAllItems && originalCollection.size > 0 || props.items) {
				if (displayAllItems && !triggerState.isOpen && props.items === void 0) setShowAllItems(true);
				triggerState.open(focusStrategy);
			}
		};
		$[24] = menuTrigger;
		$[25] = allowsEmptyCollection;
		$[26] = filteredCollection.size;
		$[27] = originalCollection.size;
		$[28] = props.items;
		$[29] = triggerState;
		$[30] = t11;
	} else t11 = $[30];
	const open = t11;
	let t12;
	if ($[31] !== menuTrigger || $[32] !== allowsEmptyCollection || $[33] !== filteredCollection.size || $[34] !== originalCollection.size || $[35] !== props.items || $[36] !== triggerState || $[37] !== updateLastCollection) {
		t12 = (t13) => {
			const focusStrategy_0 = t13 === void 0 ? null : t13;
			const displayAllItems_0 = menuTrigger === "focus";
			if (!(allowsEmptyCollection || filteredCollection.size > 0 || displayAllItems_0 && originalCollection.size > 0 || props.items) && !triggerState.isOpen) return;
			if (displayAllItems_0 && !triggerState.isOpen && props.items === void 0) setShowAllItems(true);
			triggerState.toggle(focusStrategy_0);
			if (triggerState.isOpen) updateLastCollection();
		};
		$[31] = menuTrigger;
		$[32] = allowsEmptyCollection;
		$[33] = filteredCollection.size;
		$[34] = originalCollection.size;
		$[35] = props.items;
		$[36] = triggerState;
		$[37] = updateLastCollection;
		$[38] = t12;
	} else t12 = $[38];
	const toggle = t12;
	let t13;
	if ($[39] !== props.selectedKeys || $[40] !== props.inputValue || $[41] !== props.onSelectionChange || $[42] !== listState.selectionManager.selectedKeys || $[43] !== close) {
		t13 = () => {
			if (props.selectedKeys !== void 0 && props.inputValue !== void 0) {
				var _props$onSelectionCha2;
				(_props$onSelectionCha2 = props.onSelectionChange) === null || _props$onSelectionCha2 === void 0 || _props$onSelectionCha2.call(props, listState.selectionManager.selectedKeys);
			}
			close();
		};
		$[39] = props.selectedKeys;
		$[40] = props.inputValue;
		$[41] = props.onSelectionChange;
		$[42] = listState.selectionManager.selectedKeys;
		$[43] = close;
		$[44] = t13;
	} else t13 = $[44];
	const commit = t13;
	let t14;
	if ($[45] !== triggerState || $[46] !== inputValue || $[47] !== lastInputValue || $[48] !== showAllItems || $[49] !== allowsEmptyCollection || $[50] !== filteredCollection.size || $[51] !== closeMenu) {
		t14 = () => {
			if (!triggerState.isOpen && inputValue && inputValue !== lastInputValue) triggerState.open();
			if (!showAllItems && !allowsEmptyCollection && triggerState.isOpen && filteredCollection.size === 0) closeMenu();
		};
		$[45] = triggerState;
		$[46] = inputValue;
		$[47] = lastInputValue;
		$[48] = showAllItems;
		$[49] = allowsEmptyCollection;
		$[50] = filteredCollection.size;
		$[51] = closeMenu;
		$[52] = t14;
	} else t14 = $[52];
	(0, import_react.useEffect)(t14);
	let t15;
	let t16;
	if ($[53] !== inputValue || $[54] !== listState.selectionManager.selectedKeys) {
		t16 = {
			inputValue,
			selectedKeys: listState.selectionManager.selectedKeys
		};
		$[53] = inputValue;
		$[54] = listState.selectionManager.selectedKeys;
		$[55] = t16;
	} else t16 = $[55];
	t15 = t16;
	let t17;
	if ($[56] !== props || $[57] !== t15) {
		t17 = {
			...props,
			value: t15
		};
		$[56] = props;
		$[57] = t15;
		$[58] = t17;
	} else t17 = $[58];
	const validation = $fd2148440a13ec26$export$fc1a364ae1f3ff10(t17);
	let t18;
	if (triggerState.isOpen) {
		if (showAllItems) t18 = originalCollection;
		else t18 = filteredCollection;
	} else t18 = lastCollection;
	const displayedCollection = t18;
	let t19;
	if ($[59] !== validation || $[60] !== triggerState.focusStrategy || $[61] !== triggerState.isOpen || $[62] !== triggerState.setOpen || $[63] !== toggle || $[64] !== open || $[65] !== commit || $[66] !== listState.selectionManager || $[67] !== listState.disabledKeys || $[68] !== displayedCollection || $[69] !== inputValue || $[70] !== setInputValue) {
		t19 = {
			...validation,
			focusStrategy: triggerState.focusStrategy,
			isOpen: triggerState.isOpen,
			setOpen: triggerState.setOpen,
			toggle,
			open,
			close: commit,
			selectionManager: listState.selectionManager,
			disabledKeys: listState.disabledKeys,
			collection: displayedCollection,
			inputValue,
			setInputValue
		};
		$[59] = validation;
		$[60] = triggerState.focusStrategy;
		$[61] = triggerState.isOpen;
		$[62] = triggerState.setOpen;
		$[63] = toggle;
		$[64] = open;
		$[65] = commit;
		$[66] = listState.selectionManager;
		$[67] = listState.disabledKeys;
		$[68] = displayedCollection;
		$[69] = inputValue;
		$[70] = setInputValue;
		$[71] = t19;
	} else t19 = $[71];
	return t19;
}
function filterCollection(collection, inputValue, filter) {
	return new $f664a81d022446b5$export$d085fb9e920b5ca7(filterNodes(collection, collection, inputValue, filter));
}
function filterNodes(collection, nodes, inputValue, filter) {
	let filteredNode = [];
	for (let node of nodes) if (node.type === "section" && node.hasChildNodes) {
		let filtered = filterNodes(collection, $cd5ea4b915021f1d$export$1005530eda016c13(node, collection), inputValue, filter);
		if ([...filtered].some((node) => node.type === "item")) filteredNode.push({
			...node,
			childNodes: filtered
		});
	} else if (node.type === "item" && filter(node.textValue, inputValue)) filteredNode.push({ ...node });
	else if (node.type !== "item") filteredNode.push({ ...node });
	return filteredNode;
}
function useComboboxMulti(props, state) {
	let { isDisabled, isReadOnly, menuTrigger = "input", buttonRef: buttonRefProp, inputRef, keyboardDelegate, layoutDelegate, listBoxRef, popoverRef, shouldCloseOnBlur = true } = props;
	let backupBtnRef = (0, import_react.useRef)(null);
	let { menuTriggerProps, menuProps } = $f19b83c1486f45cc$export$dc9c12ed27dd1b49({
		type: "listbox",
		isDisabled: isDisabled || isReadOnly
	}, state, buttonRefProp !== null && buttonRefProp !== void 0 ? buttonRefProp : backupBtnRef);
	$cd088b5c0d7b27b4$export$3585ede4d035bf14.set(state, { id: menuProps.id });
	let stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages);
	let delegate = (0, import_react.useMemo)(() => keyboardDelegate || new $ae8f8d98b2b18f2f$export$a05409b8bb224a5a({
		collection: state.collection,
		disabledKeys: state.selectionManager.disabledKeys,
		ref: listBoxRef,
		layoutDelegate
	}), [
		keyboardDelegate,
		layoutDelegate,
		state.collection,
		state.selectionManager.disabledKeys,
		listBoxRef
	]);
	let { collectionProps } = $d667c2af82d35a98$export$d6daf82dcd84e87c({
		selectionManager: state.selectionManager,
		keyboardDelegate: delegate,
		disallowTypeAhead: true,
		disallowEmptySelection: true,
		shouldFocusWrap: true,
		ref: inputRef,
		disallowSelectAll: true,
		isVirtualized: true
	});
	(0, import_react.useEffect)(() => {
		if (state.isOpen) return $58196c8d6a1f38fc$export$1c3ebcada18427bf([inputRef.current, popoverRef.current].filter((element) => element != null));
	}, [
		state.isOpen,
		inputRef,
		popoverRef
	]);
	let onKeyDown = (e) => {
		if (e.nativeEvent.isComposing) return;
		switch (e.key) {
			case "Enter":
				if (state.isOpen) e.preventDefault();
				if (state.selectionManager.focusedKey) state.selectionManager.select(state.selectionManager.focusedKey);
				break;
			case "Escape":
				if (!state.isOpen) e.continuePropagation();
				state.close();
				break;
			case "ArrowDown":
				state.open("first");
				break;
			case "ArrowUp":
				state.open("last");
				break;
			case "ArrowLeft":
			case "ArrowRight": state.selectionManager.setFocusedKey(null);
		}
	};
	let onBlur = (e_0) => {
		var _props$onBlur;
		(_props$onBlur = props.onBlur) === null || _props$onBlur === void 0 || _props$onBlur.call(props, e_0);
		if (shouldCloseOnBlur) state.close();
	};
	let onFocus = (e_1) => {
		var _props$onFocus;
		(_props$onFocus = props.onFocus) === null || _props$onFocus === void 0 || _props$onFocus.call(props, e_1);
		if (menuTrigger === "focus" && !props.isReadOnly) state.open();
		state.selectionManager.setFocused(true);
	};
	let { labelProps, inputProps, descriptionProps, errorMessageProps } = $054f71d2330da2e3$export$712718f7aec83d5({
		...props,
		onBlur,
		onFocus,
		onChange: state.setInputValue,
		onKeyDown: !props.isReadOnly ? $a4e76a5424781910$export$e08e3b67e392101e(state.isOpen && collectionProps.onKeyDown, onKeyDown, props.onKeyDown) : props.onKeyDown,
		autoComplete: "off",
		validate: void 0,
		value: state.inputValue
	}, inputRef);
	let onPress = (e_2) => {
		if (e_2.pointerType === "touch") {
			var _inputRef$current;
			(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
			state.toggle();
		}
	};
	let onPressStart = (e_3) => {
		if (e_3.pointerType !== "touch") {
			var _inputRef$current2;
			(_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.focus();
			let strategy = e_3.pointerType === "keyboard" || e_3.pointerType === "virtual" ? "first" : null;
			state.toggle(strategy);
		}
	};
	let { isInvalid, validationErrors, validationDetails } = state.displayValidation;
	let focusedItem = state.selectionManager.focusedKey != null && state.isOpen ? state.collection.getItem(state.selectionManager.focusedKey) : void 0;
	let triggerLabelProps = $e8ac3c3f5d4bae7f$export$d6875122194c7b44({
		id: menuTriggerProps.id,
		"aria-label": stringFormatter.format("buttonLabel"),
		"aria-labelledby": props["aria-labelledby"] || labelProps.id
	});
	let listBoxProps = $e8ac3c3f5d4bae7f$export$d6875122194c7b44({
		id: menuProps.id,
		"aria-label": stringFormatter.format("listboxLabel"),
		"aria-labelledby": props["aria-labelledby"] || labelProps.id
	});
	return {
		buttonProps: {
			...menuTriggerProps,
			...triggerLabelProps,
			excludeFromTabOrder: true,
			isDisabled: props.isDisabled || props.isReadOnly,
			onPress,
			onPressStart
		},
		descriptionProps,
		errorMessageProps,
		inputProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(inputProps, {
			role: "combobox",
			"aria-expanded": menuTriggerProps["aria-expanded"],
			"aria-controls": state.isOpen ? menuProps.id : void 0,
			"aria-autocomplete": "list",
			"aria-activedescendant": focusedItem ? $cd088b5c0d7b27b4$export$9145995848b05025(state, focusedItem.key) : void 0,
			autoCorrect: "off",
			spellCheck: "false"
		}),
		listBoxProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(menuProps, listBoxProps, {
			onAction: void 0,
			shouldUseVirtualFocus: true,
			shouldSelectOnPressUp: true,
			shouldFocusOnHover: true,
			linkBehavior: "selection"
		}),
		labelProps,
		isInvalid,
		validationErrors,
		validationDetails
	};
}
function MobileComboboxMulti(_props, forwardedRef) {
	const props = useProviderProps(_props);
	let { isDisabled, isReadOnly, validationState } = props;
	let state = useComboboxMultiState({
		...props,
		allowsEmptyCollection: true
	});
	let buttonRef = (0, import_react.useRef)(null);
	let domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let { triggerProps, overlayProps } = $f282e36c29c025e8$export$f9d5c8beee7d008d({ type: "listbox" }, state, buttonRef);
	let { labelProps, fieldProps } = $191c9b6d48a0a4e2$export$294aa081a6c6f55d({
		...props,
		labelElementType: "span"
	});
	labelProps = {
		...labelProps,
		onClick: () => {
			let button = buttonRef.current;
			if (button && !props.isDisabled) {
				button.focus();
				$8f5a2122b0992be3$export$8397ddfc504fdb9a("keyboard");
			}
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldPrimitive, {
		...props,
		labelProps,
		ref: domRef,
		supplementRequiredState: true,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxButton, {
			...$bbaa08b3cd72f041$export$9d1611c77c2fe928(triggerProps, fieldProps, { autoFocus: props.autoFocus }),
			ref: buttonRef,
			isDisabled,
			isReadOnly,
			isPlaceholder: !state.inputValue,
			validationState,
			onPress: () => !isReadOnly && state.open(),
			children: state.inputValue || props.placeholder || ""
		})
	}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Tray, {
		state,
		isFixedHeight: true,
		...overlayProps,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxTray, {
			...props,
			onClose: state.close,
			overlayProps,
			state
		})
	})] });
}
var ComboboxButton = /*#__PURE__*/ import_react.forwardRef(function ComboboxButton(props, forwardedRef) {
	let { isDisabled, isPlaceholder, validationState, children, style } = props;
	let valueId = $390e54f620492c70$export$f680877a34711e37();
	let invalidId = $390e54f620492c70$export$f680877a34711e37();
	let domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456({});
	let { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3({
		...props,
		"aria-labelledby": [
			props["aria-labelledby"],
			props["aria-label"] && !props["aria-labelledby"] ? props.id : null,
			valueId,
			validationState === "invalid" ? invalidId : null
		].filter(Boolean).join(" "),
		elementType: "div"
	}, domRef);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, { children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
		position: "relative",
		width: "alias.singleLineWidth",
		zIndex: 0,
		...toDataAttributes({ readonly: props.isReadOnly }),
		...$bbaa08b3cd72f041$export$9d1611c77c2fe928(hoverProps, buttonProps),
		"aria-haspopup": "dialog",
		ref: domRef,
		UNSAFE_className: comboboxClassList.element("mobile-trigger"),
		UNSAFE_style: {
			...style,
			outline: "none"
		},
		children: [
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
				alignItems: "center",
				paddingX: "medium",
				flex: true,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
					id: valueId,
					color: isPlaceholder ? "neutralSecondary" : void 0,
					trim: false,
					truncate: true,
					children
				})
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputStateIndicator, {
				isHovered,
				isPressed,
				isDisabled,
				validationState
			}),
			/*#__PURE__*/ (0, import_jsx_runtime.jsx)(CosmeticFieldButton, {
				isHovered,
				isPressed,
				isDisabled,
				validationState,
				UNSAFE_className: css({
					borderEndStartRadius: 0,
					borderStartStartRadius: 0,
					[`${comboboxClassList.selector("mobile-trigger")}[data-focus] &`]: { borderColor: tokenSchema.color.alias.borderFocused }
				}),
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, { src: chevronDownIcon })
			})
		]
	}) });
});
var CosmeticFieldButton = (props) => {
	let { isHovered, isPressed, ...otherProps } = props;
	let { children, styleProps } = useFieldButton(otherProps, {
		isHovered,
		isPressed
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		"data-disabled": props.isDisabled,
		...styleProps,
		children
	});
};
var InputStateIndicator = (props) => {
	let { isDisabled, isHovered, isPressed } = props;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		role: "presentation",
		...toDataAttributes({
			disabled: isDisabled,
			interaction: isPressed ? "press" : isHovered ? "hover" : void 0,
			validation: props.validationState
		}),
		className: css({
			backgroundColor: tokenSchema.color.background.canvas,
			border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`,
			borderRadius: tokenSchema.size.radius.regular,
			inset: 0,
			position: "absolute",
			transition: transition(["border-color", "box-shadow"]),
			zIndex: -1,
			"&[data-interaction=hover]": { borderColor: tokenSchema.color.alias.borderHovered },
			"&[data-validation=invalid]": { borderColor: tokenSchema.color.alias.borderInvalid },
			[`${comboboxClassList.selector("mobile-trigger")}[data-focus] &`]: { borderColor: tokenSchema.color.alias.borderFocused },
			[`${comboboxClassList.selector("mobile-trigger")}[data-focus]:not([data-readonly]) &`]: { boxShadow: `0 0 0 1px ${tokenSchema.color.alias.borderFocused}` },
			"&[data-disabled=true]": {
				backgroundColor: tokenSchema.color.background.surfaceSecondary,
				borderColor: "transparent"
			}
		})
	});
};
function ComboboxTray(props) {
	let { state, isDisabled, validationState, label, overlayProps, loadingState, onLoadMore, onClose } = props;
	let timeoutRef = (0, import_react.useRef)(void 0);
	let [showLoading, setShowLoading] = (0, import_react.useState)(false);
	let inputRef = (0, import_react.useRef)(null);
	let buttonRef = (0, import_react.useRef)(null);
	let popoverRef = (0, import_react.useRef)(null);
	let listBoxRef = (0, import_react.useRef)(null);
	let layout = useListBoxLayout();
	let stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages);
	let { inputProps, listBoxProps, labelProps } = useComboboxMulti({
		...props,
		layoutDelegate: layout,
		buttonRef,
		popoverRef,
		listBoxRef,
		inputRef,
		shouldCloseOnBlur: false
	}, state);
	import_react.useEffect(() => {
		let input = inputRef.current;
		if (input) $f192c2f16961cbe0$export$80f3e147d781571c(input);
		return () => {
			state.selectionManager.setFocusedKey(null);
		};
	}, []);
	let { dialogProps } = $13150e6629d46e45$export$d55e7ee900f34e93({ "aria-labelledby": $390e54f620492c70$export$f680877a34711e37(labelProps.id) }, popoverRef);
	inputProps.role = "searchbox";
	inputProps["aria-haspopup"] = "listbox";
	delete inputProps.onTouchEnd;
	let clearButton = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearButton, {
		preventFocus: true,
		"aria-label": stringFormatter.format("clear"),
		excludeFromTabOrder: true,
		onPress: () => {
			state.setInputValue("");
			let input_0 = inputRef.current;
			if (input_0) input_0.focus();
		},
		isDisabled
	});
	let loadingCircle = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
		alignItems: "center",
		flexShrink: 0,
		justifyContent: "center",
		pointerEvents: "none",
		width: "element.regular",
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProgressCircle, {
			"aria-label": stringFormatter.format("loading"),
			size: "small",
			isIndeterminate: true
		})
	});
	let isTouchDown = (0, import_react.useRef)(false);
	let onTouchStart = () => {
		isTouchDown.current = true;
	};
	let onTouchEnd = () => {
		isTouchDown.current = false;
	};
	let onScroll = (0, import_react.useCallback)(() => {
		let input_1 = inputRef.current;
		let popover = popoverRef.current;
		if (!input_1 || document.activeElement !== input_1 || !isTouchDown.current) return;
		if (popover) popover.focus();
	}, [
		inputRef,
		popoverRef,
		isTouchDown
	]);
	let inputValue = inputProps.value;
	let lastInputValue = (0, import_react.useRef)(inputValue);
	(0, import_react.useEffect)(() => {
		if (loadingState === "filtering" && !showLoading) {
			if (!timeoutRef.current) timeoutRef.current = setTimeout(() => {
				setShowLoading(true);
			}, 500);
			if (inputValue !== lastInputValue.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					setShowLoading(true);
				}, 500);
			}
		} else if (loadingState !== "filtering") {
			setShowLoading(false);
			clearTimeout(timeoutRef.current);
			timeoutRef.current = void 0;
		}
		lastInputValue.current = inputValue;
	}, [
		loadingState,
		inputValue,
		showLoading
	]);
	let onKeyDown = (e) => {
		let popover_0 = popoverRef.current;
		if (popover_0 && e.key === "Enter" && state.selectionManager.focusedKey == null) popover_0.focus();
		else {
			var _inputProps$onKeyDown;
			(_inputProps$onKeyDown = inputProps.onKeyDown) === null || _inputProps$onKeyDown === void 0 || _inputProps$onKeyDown.call(inputProps, e);
		}
	};
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)($535772f9d2c1f38d$export$20e40289641fbbb6, {
		restoreFocus: true,
		contain: true,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
			direction: "column",
			height: "100%",
			ref: popoverRef,
			...$bbaa08b3cd72f041$export$9d1611c77c2fe928(overlayProps, dialogProps),
			children: [
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)($081058010ef8962e$export$2317d149ed6f78c4, { onDismiss: onClose }),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextFieldPrimitive, {
					label,
					labelProps,
					inputProps: {
						...inputProps,
						onKeyDown
					},
					ref: inputRef,
					isDisabled,
					marginX: "small",
					marginTop: "regular",
					endElement: /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, { children: [showLoading && loadingState === "filtering" && loadingCircle, (state.inputValue !== "" || loadingState === "filtering" || validationState != null) && !props.isReadOnly && clearButton] })
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)(_ListBoxBase, {
					...listBoxProps,
					domProps: {
						onTouchStart,
						onTouchEnd
					},
					disallowEmptySelection: true,
					shouldSelectOnPressUp: true,
					focusOnPointerEnter: true,
					layout,
					state,
					shouldUseVirtualFocus: true,
					renderEmptyState: () => loadingState !== "loading" && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Flex, {
						height: "element.regular",
						alignItems: "center",
						paddingX: "medium",
						children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
							color: "neutralSecondary",
							children: stringFormatter.format("noResults")
						})
					}),
					ref: listBoxRef,
					onScroll,
					onLoadMore,
					isLoading: loadingState === "loading" || loadingState === "loadingMore"
				}),
				/*#__PURE__*/ (0, import_jsx_runtime.jsx)($081058010ef8962e$export$2317d149ed6f78c4, { onDismiss: onClose })
			]
		})
	});
}
var _MobileComboboxMulti = /*#__PURE__*/ import_react.forwardRef(MobileComboboxMulti);
function ComboboxMulti(props, forwardedRef) {
	const $ = c(8);
	props = useProviderProps(props);
	const t0 = props;
	let t1;
	if ($[0] !== t0) {
		t1 = validateTextFieldProps(t0);
		$[0] = t0;
		$[1] = t1;
	} else t1 = $[1];
	props = t1;
	if (useIsMobileDevice()) {
		let t2;
		if ($[2] !== props || $[3] !== forwardedRef) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(_MobileComboboxMulti, {
				...props,
				menuTrigger: "input",
				ref: forwardedRef
			});
			$[2] = props;
			$[3] = forwardedRef;
			$[4] = t2;
		} else t2 = $[4];
		return t2;
	} else {
		let t2;
		if ($[5] !== props || $[6] !== forwardedRef) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxMultiBase, {
				...props,
				ref: forwardedRef
			});
			$[5] = props;
			$[6] = forwardedRef;
			$[7] = t2;
		} else t2 = $[7];
		return t2;
	}
}
var ComboboxMultiBase = /*#__PURE__*/ import_react.forwardRef(function ComboboxMultiBase(props, forwardedRef) {
	var _state$focusStrategy;
	const $ = c(51);
	const { align: t0, shouldFlip: t1, direction: t2, loadingState, menuWidth, onLoadMore } = props;
	const align = t0 === void 0 ? "start" : t0;
	const shouldFlip = t1 === void 0 ? true : t1;
	const direction = t2 === void 0 ? "bottom" : t2;
	const isAsync = loadingState != null;
	const buttonRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	const listBoxRef = (0, import_react.useRef)(null);
	const popoverRef = (0, import_react.useRef)(null);
	const fieldRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const layoutDelegate = useListBoxLayout();
	const state = useComboboxMultiState(props);
	let t3;
	if ($[0] !== props || $[1] !== buttonRef || $[2] !== inputRef || $[3] !== layoutDelegate || $[4] !== listBoxRef || $[5] !== popoverRef) {
		t3 = {
			...props,
			buttonRef,
			inputRef,
			layoutDelegate,
			listBoxRef,
			popoverRef
		};
		$[0] = props;
		$[1] = buttonRef;
		$[2] = inputRef;
		$[3] = layoutDelegate;
		$[4] = listBoxRef;
		$[5] = popoverRef;
		$[6] = t3;
	} else t3 = $[6];
	const { buttonProps, descriptionProps, errorMessageProps, inputProps, labelProps, listBoxProps } = useComboboxMulti(t3, state);
	let t4;
	if ($[7] !== menuWidth || $[8] !== buttonRef || $[9] !== inputRef || $[10] !== fieldRef) {
		t4 = {
			menuWidth,
			buttonRef,
			inputRef,
			fieldRef
		};
		$[7] = menuWidth;
		$[8] = buttonRef;
		$[9] = inputRef;
		$[10] = fieldRef;
		$[11] = t4;
	} else t4 = $[11];
	const popoverStyle = usePopoverStyles(t4);
	let t5;
	if ($[12] !== props || $[13] !== state.isOpen || $[14] !== loadingState || $[15] !== inputProps || $[16] !== inputRef || $[17] !== buttonProps || $[18] !== buttonRef) {
		t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxInput, {
			...props,
			isOpen: state.isOpen,
			loadingState,
			inputProps,
			inputRef,
			triggerProps: buttonProps,
			triggerRef: buttonRef
		});
		$[12] = props;
		$[13] = state.isOpen;
		$[14] = loadingState;
		$[15] = inputProps;
		$[16] = inputRef;
		$[17] = buttonProps;
		$[18] = buttonRef;
		$[19] = t5;
	} else t5 = $[19];
	let t6;
	if ($[20] !== props || $[21] !== descriptionProps || $[22] !== errorMessageProps || $[23] !== labelProps || $[24] !== fieldRef || $[25] !== t5) {
		t6 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldPrimitive, {
			width: "alias.singleLineWidth",
			...props,
			descriptionProps,
			errorMessageProps,
			labelProps,
			ref: fieldRef,
			children: t5
		});
		$[20] = props;
		$[21] = descriptionProps;
		$[22] = errorMessageProps;
		$[23] = labelProps;
		$[24] = fieldRef;
		$[25] = t5;
		$[26] = t6;
	} else t6 = $[26];
	const t7 = align === "end" ? buttonRef : inputRef;
	const t8 = `${direction} ${align}`;
	const t9 = (_state$focusStrategy = state.focusStrategy) !== null && _state$focusStrategy !== void 0 ? _state$focusStrategy : void 0;
	const t10 = loadingState === "loadingMore";
	let t11;
	if ($[27] !== isAsync || $[28] !== loadingState) {
		t11 = () => isAsync && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ComboboxEmptyState, { loadingState });
		$[27] = isAsync;
		$[28] = loadingState;
		$[29] = t11;
	} else t11 = $[29];
	let t12;
	if ($[30] !== listBoxProps || $[31] !== listBoxRef || $[32] !== t9 || $[33] !== t10 || $[34] !== layoutDelegate || $[35] !== onLoadMore || $[36] !== state || $[37] !== t11) {
		t12 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(_ListBoxBase, {
			...listBoxProps,
			ref: listBoxRef,
			autoFocus: t9,
			disallowEmptySelection: true,
			focusOnPointerEnter: true,
			isLoading: t10,
			layout: layoutDelegate,
			onLoadMore,
			state,
			UNSAFE_className: listStyles,
			renderEmptyState: t11
		});
		$[30] = listBoxProps;
		$[31] = listBoxRef;
		$[32] = t9;
		$[33] = t10;
		$[34] = layoutDelegate;
		$[35] = onLoadMore;
		$[36] = state;
		$[37] = t11;
		$[38] = t12;
	} else t12 = $[38];
	let t13;
	if ($[39] !== state || $[40] !== popoverStyle || $[41] !== popoverRef || $[42] !== t7 || $[43] !== listBoxRef || $[44] !== t8 || $[45] !== shouldFlip || $[46] !== t12) {
		t13 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Popover, {
			state,
			UNSAFE_style: popoverStyle,
			ref: popoverRef,
			triggerRef: t7,
			scrollRef: listBoxRef,
			placement: t8,
			hideArrow: true,
			isNonModal: true,
			shouldFlip,
			children: t12
		});
		$[39] = state;
		$[40] = popoverStyle;
		$[41] = popoverRef;
		$[42] = t7;
		$[43] = listBoxRef;
		$[44] = t8;
		$[45] = shouldFlip;
		$[46] = t12;
		$[47] = t13;
	} else t13 = $[47];
	let t14;
	if ($[48] !== t6 || $[49] !== t13) {
		t14 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [t6, t13] });
		$[48] = t6;
		$[49] = t13;
		$[50] = t14;
	} else t14 = $[50];
	return t14;
});
/**
* This component is not accessible, use with caution.
*
* A multi-combobox combines a text input with a listbox, and allows users to filter a
* list of options.
*/
var _ComboboxMulti = /*#__PURE__*/ import_react.forwardRef(ComboboxMulti);
//#endregion
export { $cd5ea4b915021f1d$export$5f3398f8733f90e2 as A, $a83747cc3f035330$export$8f5ed9ff9f511381 as B, $b14b6f590b50af39$export$2f645645f7bca764 as C, $673d46fce3e5717d$export$a16aca283550c30d as D, $60f19cefd567a3e4$export$253fe78d46329472 as E, $f5a4a9a3486154da$export$e32c88dfddc6e1d8 as F, $05678f3aee5e7d1a$export$6d08773d2e66f8f2 as H, $51a3e22a5186a962$export$53a0910f038337bd as I, $51a3e22a5186a962$export$c826860796309d1b as L, $cd5ea4b915021f1d$export$fbdeaa6a76694f71 as M, $3c71b1595a147f24$export$496315a1608d9602 as N, $2efe10d3f1f9e31e$export$77d5aafae4e095b2 as O, $d667c2af82d35a98$export$d6daf82dcd84e87c as P, $f19b83c1486f45cc$export$dc9c12ed27dd1b49 as R, checkIcon as S, $4a07ac835f260f78$export$6c8a5aaad13c9852 as T, $246727c32dbcf285$export$6e2c8f0811a474ce as V, $cc8e610d5d6e3fe4$export$cb6da89c6af1a8ec as _, ListItem as a, $f6ba6936bfd098a0$export$ecf600387e221c37 as b, useListBoxLayout as c, $6c92e9e346cd7b1c$export$6796df8ba7398521 as d, $e21c75ef2d96a1a6$export$7717c92ee915373e as f, $51e619e0f141c3ec$export$1505db82fe357e65 as g, $eb6255cbf080eb7d$export$7e0eeb9da702a085 as h, $e3403870bfb691da$export$79fefeb1c2091ac3 as i, $cd5ea4b915021f1d$export$7475b2c64539e4cf as j, $cd5ea4b915021f1d$export$1005530eda016c13 as k, $b29c836adf9e092e$export$89be5a243e59c4b2 as l, $942f06a693c162e2$export$cacbb3924155d68e as m, _ComboboxMulti as n, _ListBoxBase as o, $d83ca946696b1300$export$5665e3d6be6adea as p, comboboxClassList as r, listStyles as s, _Combobox as t, $6c92e9e346cd7b1c$export$1481e64fbe01b8b3 as u, $af827553fd3cf456$export$c79fc6492f3af13d as v, $d03379b88399b8c5$export$6cd28814d92fa9c9 as w, $64903b4b31b6bb2a$export$b95089534ab7c1fd as x, $3db4938a3baa5776$export$ed5fd5ffe5ab0ac as y, $ae8f8d98b2b18f2f$export$a05409b8bb224a5a as z };
