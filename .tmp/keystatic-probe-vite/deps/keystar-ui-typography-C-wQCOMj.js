import { i as __toESM } from "./rolldown-runtime-DbVrKiKs.js";
import { t as require_react } from "./react-eZXm9bZy.js";
import { t as require_jsx_runtime } from "./jsx-runtime-hYFZm98l.js";
//#region node_modules/@keystar/ui/dist/react-compiler-runtime-19061925.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var $empty = Symbol.for("react.memo_cache_sentinel");
function c(size) {
	return (0, import_react.useState)(() => {
		const $ = new Array(size);
		for (let ii = 0; ii < size; ii++) $[ii] = $empty;
		$[$empty] = true;
		return $;
	})[0];
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/domHelpers.mjs
var $d447af545b77c9f1$export$b204af158042fbac = (el) => {
	return el?.ownerDocument ?? document;
};
var $d447af545b77c9f1$export$f21a1ffae260145a = (el) => {
	if (el && "window" in el && el.window === el) return el;
	return $d447af545b77c9f1$export$b204af158042fbac(el).defaultView || window;
};
/**
* Type guard that checks if a value is a Node. Verifies the presence and type of the nodeType
* property.
*/ function $d447af545b77c9f1$var$isNode(value) {
	return value !== null && typeof value === "object" && "nodeType" in value && typeof value.nodeType === "number";
}
function $d447af545b77c9f1$export$af51f0f06c0f328a(node) {
	return $d447af545b77c9f1$var$isNode(node) && node.nodeType === Node.DOCUMENT_FRAGMENT_NODE && "host" in node;
}
//#endregion
//#region node_modules/react-stately/dist/private/flags/flags.mjs
var $6a20a7989e6c817a$var$_shadowDOM = false;
function $6a20a7989e6c817a$export$98658e8c59125e6a() {
	return $6a20a7989e6c817a$var$_shadowDOM;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/shadowdom/DOMFunctions.mjs
function $23f2114a1b82827e$export$4282f70798064fe0(node, otherNode) {
	if (!$6a20a7989e6c817a$export$98658e8c59125e6a()) return otherNode && node ? node.contains(otherNode) : false;
	if (!node || !otherNode) return false;
	let currentNode = otherNode;
	while (currentNode !== null) {
		if (currentNode === node) return true;
		if (currentNode.tagName === "SLOT" && currentNode.assignedSlot) currentNode = currentNode.assignedSlot.parentNode;
		else if ($d447af545b77c9f1$export$af51f0f06c0f328a(currentNode)) currentNode = currentNode.host;
		else currentNode = currentNode.parentNode;
	}
	return false;
}
var $23f2114a1b82827e$export$cd4e5573fbe2b576 = (doc = document) => {
	if (!$6a20a7989e6c817a$export$98658e8c59125e6a()) return doc.activeElement;
	let activeElement = doc.activeElement;
	while (activeElement && "shadowRoot" in activeElement && activeElement.shadowRoot?.activeElement) activeElement = activeElement.shadowRoot.activeElement;
	return activeElement;
};
function $23f2114a1b82827e$export$e58f029f0fbfdb29(event) {
	if ($6a20a7989e6c817a$export$98658e8c59125e6a() && event.target instanceof Element && event.target.shadowRoot) {
		if ("composedPath" in event) return event.composedPath()[0] ?? null;
		else if ("composedPath" in event.nativeEvent) return event.nativeEvent.composedPath()[0] ?? null;
	}
	return event.target;
}
function $23f2114a1b82827e$export$b4f377a2b6254582(node) {
	if (!node) return false;
	let root = node.getRootNode();
	let ownerWindow = $d447af545b77c9f1$export$f21a1ffae260145a(node);
	if (!(root instanceof ownerWindow.Document || root instanceof ownerWindow.ShadowRoot)) return false;
	let activeElement = root.activeElement;
	return activeElement != null && node.contains(activeElement);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/chain.mjs
/**
* Calls all functions in the order they were chained with the same arguments.
*/ function $a4e76a5424781910$export$e08e3b67e392101e(...callbacks) {
	return (...args) => {
		for (let callback of callbacks) if (typeof callback === "function") callback(...args);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/platform.mjs
function $2add3ce32c6007eb$var$testUserAgent(re) {
	if (typeof window === "undefined" || window.navigator == null) return false;
	let brands = window.navigator["userAgentData"]?.brands;
	return Array.isArray(brands) && brands.some((brand) => re.test(brand.brand)) || re.test(window.navigator.userAgent);
}
function $2add3ce32c6007eb$var$testPlatform(re) {
	return typeof window !== "undefined" && window.navigator != null ? re.test(window.navigator["userAgentData"]?.platform || window.navigator.platform) : false;
}
function $2add3ce32c6007eb$var$cached(fn) {
	let res = null;
	return () => {
		if (res == null) res = fn();
		return res;
	};
}
var $2add3ce32c6007eb$export$9ac100e40613ea10 = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testPlatform(/^Mac/i);
});
var $2add3ce32c6007eb$export$186c6964ca17d99 = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testPlatform(/^iPhone/i);
});
var $2add3ce32c6007eb$export$7bef049ce92e4224 = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testPlatform(/^iPad/i) || $2add3ce32c6007eb$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1;
});
var $2add3ce32c6007eb$export$fedb369cb70207f1 = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$export$186c6964ca17d99() || $2add3ce32c6007eb$export$7bef049ce92e4224();
});
var $2add3ce32c6007eb$export$e1865c3bedcd822b = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$export$9ac100e40613ea10() || $2add3ce32c6007eb$export$fedb369cb70207f1();
});
var $2add3ce32c6007eb$export$78551043582a6a98 = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testUserAgent(/AppleWebKit/i) && !$2add3ce32c6007eb$export$6446a186d09e379e();
});
var $2add3ce32c6007eb$export$6446a186d09e379e = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testUserAgent(/Chrome/i);
});
var $2add3ce32c6007eb$export$a11b0059900ceec8 = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testUserAgent(/Android/i);
});
var $2add3ce32c6007eb$export$b7d78993b74f766d = $2add3ce32c6007eb$var$cached(function() {
	return $2add3ce32c6007eb$var$testUserAgent(/Firefox/i);
});
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLayoutEffect.mjs
var $c4867b2f328c2698$export$e5c5a5f917a5871c = typeof document !== "undefined" ? import_react.useLayoutEffect : () => {};
//#endregion
//#region node_modules/react-aria/dist/private/ssr/SSRProvider.mjs
var $c7eafbbe1ea5834e$var$defaultContext = {
	prefix: String(Math.round(Math.random() * 1e10)),
	current: 0
};
var $c7eafbbe1ea5834e$var$SSRContext = /*#__PURE__*/ import_react.createContext($c7eafbbe1ea5834e$var$defaultContext);
var $c7eafbbe1ea5834e$var$IsSSRContext = /*#__PURE__*/ import_react.createContext(false);
var $c7eafbbe1ea5834e$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $c7eafbbe1ea5834e$var$componentIds = /* @__PURE__ */ new WeakMap();
function $c7eafbbe1ea5834e$var$useCounter(isDisabled = false) {
	let ctx = (0, import_react.useContext)($c7eafbbe1ea5834e$var$SSRContext);
	let ref = (0, import_react.useRef)(null);
	if (ref.current === null && !isDisabled) {
		let currentOwner = import_react.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;
		if (currentOwner) {
			let prevComponentValue = $c7eafbbe1ea5834e$var$componentIds.get(currentOwner);
			if (prevComponentValue == null) $c7eafbbe1ea5834e$var$componentIds.set(currentOwner, {
				id: ctx.current,
				state: currentOwner.memoizedState
			});
			else if (currentOwner.memoizedState !== prevComponentValue.state) {
				ctx.current = prevComponentValue.id;
				$c7eafbbe1ea5834e$var$componentIds.delete(currentOwner);
			}
		}
		ref.current = ++ctx.current;
	}
	return ref.current;
}
function $c7eafbbe1ea5834e$var$useLegacySSRSafeId(defaultId) {
	let ctx = (0, import_react.useContext)($c7eafbbe1ea5834e$var$SSRContext);
	if (ctx === $c7eafbbe1ea5834e$var$defaultContext && !$c7eafbbe1ea5834e$var$canUseDOM && true) console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
	let counter = $c7eafbbe1ea5834e$var$useCounter(!!defaultId);
	let prefix = `react-aria${ctx.prefix}`;
	return defaultId || `${prefix}-${counter}`;
}
function $c7eafbbe1ea5834e$var$useModernSSRSafeId(defaultId) {
	let id = import_react.useId();
	let [didSSR] = (0, import_react.useState)($c7eafbbe1ea5834e$export$535bd6ca7f90a273());
	let prefix = didSSR || false ? "react-aria" : `react-aria${$c7eafbbe1ea5834e$var$defaultContext.prefix}`;
	return defaultId || `${prefix}-${id}`;
}
var $c7eafbbe1ea5834e$export$619500959fc48b26 = typeof import_react.useId === "function" ? $c7eafbbe1ea5834e$var$useModernSSRSafeId : $c7eafbbe1ea5834e$var$useLegacySSRSafeId;
function $c7eafbbe1ea5834e$var$getSnapshot() {
	return false;
}
function $c7eafbbe1ea5834e$var$getServerSnapshot() {
	return true;
}
function $c7eafbbe1ea5834e$var$subscribe(onStoreChange) {
	return () => {};
}
function $c7eafbbe1ea5834e$export$535bd6ca7f90a273() {
	if (typeof import_react.useSyncExternalStore === "function") return import_react.useSyncExternalStore($c7eafbbe1ea5834e$var$subscribe, $c7eafbbe1ea5834e$var$getSnapshot, $c7eafbbe1ea5834e$var$getServerSnapshot);
	return (0, import_react.useContext)($c7eafbbe1ea5834e$var$IsSSRContext);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useValueEffect.mjs
function $1a716630a9e3a599$export$14d238f342723f25(defaultValue) {
	let [value, setValue] = (0, import_react.useState)(defaultValue);
	let currValue = (0, import_react.useRef)(value);
	let effect = (0, import_react.useRef)(null);
	let nextRef = (0, import_react.useRef)(() => {
		if (!effect.current) return;
		let newValue = effect.current.next();
		if (newValue.done) {
			effect.current = null;
			return;
		}
		if (currValue.current === newValue.value) nextRef.current();
		else setValue(newValue.value);
	});
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		currValue.current = value;
		if (effect.current) nextRef.current();
	});
	return [value, (0, import_react.useCallback)((fn) => {
		effect.current = fn(currValue.current);
		nextRef.current();
	}, [nextRef])];
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useId.mjs
var $390e54f620492c70$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
var $390e54f620492c70$export$d41a04c74483c6ef = /* @__PURE__ */ new Map();
var $390e54f620492c70$var$registry;
if (typeof FinalizationRegistry !== "undefined") $390e54f620492c70$var$registry = new FinalizationRegistry((heldValue) => {
	$390e54f620492c70$export$d41a04c74483c6ef.delete(heldValue);
});
function $390e54f620492c70$export$f680877a34711e37(defaultId) {
	let [value, setValue] = (0, import_react.useState)(defaultId);
	let nextId = (0, import_react.useRef)(null);
	let res = $c7eafbbe1ea5834e$export$619500959fc48b26(value);
	let cleanupRef = (0, import_react.useRef)(null);
	if ($390e54f620492c70$var$registry) $390e54f620492c70$var$registry.register(cleanupRef, res);
	if ($390e54f620492c70$var$canUseDOM) {
		const cacheIdRef = $390e54f620492c70$export$d41a04c74483c6ef.get(res);
		if (cacheIdRef && !cacheIdRef.includes(nextId)) cacheIdRef.push(nextId);
		else $390e54f620492c70$export$d41a04c74483c6ef.set(res, [nextId]);
	}
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let r = res;
		return () => {
			if ($390e54f620492c70$var$registry) $390e54f620492c70$var$registry.unregister(cleanupRef);
			$390e54f620492c70$export$d41a04c74483c6ef.delete(r);
		};
	}, [res]);
	(0, import_react.useEffect)(() => {
		let newId = nextId.current;
		if (newId) setValue(newId);
		return () => {
			if (newId) nextId.current = null;
		};
	});
	return res;
}
function $390e54f620492c70$export$cd8c9cb68f842629(idA, idB) {
	if (idA === idB) return idA;
	let setIdsA = $390e54f620492c70$export$d41a04c74483c6ef.get(idA);
	if (setIdsA) {
		setIdsA.forEach((ref) => ref.current = idB);
		return idB;
	}
	let setIdsB = $390e54f620492c70$export$d41a04c74483c6ef.get(idB);
	if (setIdsB) {
		setIdsB.forEach((ref) => ref.current = idA);
		return idA;
	}
	return idB;
}
function $390e54f620492c70$export$b4cc09c592e8fdb8(depArray = []) {
	let id = $390e54f620492c70$export$f680877a34711e37();
	let [resolvedId, setResolvedId] = $1a716630a9e3a599$export$14d238f342723f25(id);
	let updateId = (0, import_react.useCallback)(() => {
		setResolvedId(function* () {
			yield id;
			yield document.getElementById(id) ? id : void 0;
		});
	}, [id, setResolvedId]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(updateId, [
		id,
		updateId,
		...depArray
	]);
	return resolvedId;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeRefs.mjs
function $4064df0d6f9620e1$export$c9058316764c140e(...refs) {
	if (refs.length === 1 && refs[0]) return refs[0];
	return (value) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = $4064df0d6f9620e1$var$setRef(ref, value);
			hasCleanup ||= typeof cleanup == "function";
			return cleanup;
		});
		if (hasCleanup) return () => {
			cleanups.forEach((cleanup, i) => {
				if (typeof cleanup === "function") cleanup();
				else $4064df0d6f9620e1$var$setRef(refs[i], null);
			});
		};
	};
}
function $4064df0d6f9620e1$var$setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref != null) ref.current = value;
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeProps.mjs
function $bbaa08b3cd72f041$export$9d1611c77c2fe928(...args) {
	let result = { ...args[0] };
	for (let i = 1; i < args.length; i++) {
		let props = args[i];
		for (let key in props) {
			let a = result[key];
			let b = props[key];
			if (typeof a === "function" && typeof b === "function" && key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= 65 && key.charCodeAt(2) <= 90) result[key] = $a4e76a5424781910$export$e08e3b67e392101e(a, b);
			else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string") result[key] = clsx(a, b);
			else if (key === "id" && a && b) result.id = $390e54f620492c70$export$cd8c9cb68f842629(a, b);
			else if (key === "ref" && a && b) result.ref = $4064df0d6f9620e1$export$c9058316764c140e(a, b);
			else result[key] = b !== void 0 ? b : a;
		}
	}
	return result;
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/utils.mjs
var $d805ff57cab8bee2$var$RTL_SCRIPTS = /* @__PURE__ */ new Set([
	"Arab",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]);
var $d805ff57cab8bee2$var$RTL_LANGS = /* @__PURE__ */ new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function $d805ff57cab8bee2$export$702d680b21cbd764(localeString) {
	if (Intl.Locale) {
		let locale = new Intl.Locale(localeString).maximize();
		let textInfo = typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;
		if (textInfo) return textInfo.direction === "rtl";
		if (locale.script) return $d805ff57cab8bee2$var$RTL_SCRIPTS.has(locale.script);
	}
	let lang = localeString.split("-")[0];
	return $d805ff57cab8bee2$var$RTL_LANGS.has(lang);
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useDefaultLocale.mjs
var $520a025cdb0d710d$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
function $520a025cdb0d710d$export$f09106e7c6677ec5() {
	let locale = typeof window !== "undefined" && window[$520a025cdb0d710d$var$localeSymbol] || typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([locale]);
	} catch {
		locale = "en-US";
	}
	return {
		locale,
		direction: $d805ff57cab8bee2$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
	};
}
var $520a025cdb0d710d$var$currentLocale = $520a025cdb0d710d$export$f09106e7c6677ec5();
var $520a025cdb0d710d$var$listeners = /* @__PURE__ */ new Set();
function $520a025cdb0d710d$var$updateLocale() {
	$520a025cdb0d710d$var$currentLocale = $520a025cdb0d710d$export$f09106e7c6677ec5();
	for (let listener of $520a025cdb0d710d$var$listeners) listener($520a025cdb0d710d$var$currentLocale);
}
function $520a025cdb0d710d$export$188ec29ebc2bdc3a() {
	let isSSR = $c7eafbbe1ea5834e$export$535bd6ca7f90a273();
	let [defaultLocale, setDefaultLocale] = (0, import_react.useState)($520a025cdb0d710d$var$currentLocale);
	(0, import_react.useEffect)(() => {
		if ($520a025cdb0d710d$var$listeners.size === 0) window.addEventListener("languagechange", $520a025cdb0d710d$var$updateLocale);
		$520a025cdb0d710d$var$listeners.add(setDefaultLocale);
		return () => {
			$520a025cdb0d710d$var$listeners.delete(setDefaultLocale);
			if ($520a025cdb0d710d$var$listeners.size === 0) window.removeEventListener("languagechange", $520a025cdb0d710d$var$updateLocale);
		};
	}, []);
	if (isSSR) return {
		locale: typeof window !== "undefined" && window[$520a025cdb0d710d$var$localeSymbol] || "en-US",
		direction: "ltr"
	};
	return defaultLocale;
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/I18nProvider.mjs
var $2eb8e6d23f3d0cb0$var$I18nContext = /*#__PURE__*/ import_react.createContext(null);
/**
* Internal component that handles the case when locale is provided.
*/ function $2eb8e6d23f3d0cb0$var$I18nProviderWithLocale(props) {
	let { locale, children } = props;
	let value = import_react.useMemo(() => ({
		locale,
		direction: $d805ff57cab8bee2$export$702d680b21cbd764(locale) ? "rtl" : "ltr"
	}), [locale]);
	return /*#__PURE__*/ import_react.createElement($2eb8e6d23f3d0cb0$var$I18nContext.Provider, { value }, children);
}
/**
* Internal component that handles the case when no locale is provided.
*/ function $2eb8e6d23f3d0cb0$var$I18nProviderWithDefaultLocale(props) {
	let { children } = props;
	let defaultLocale = $520a025cdb0d710d$export$188ec29ebc2bdc3a();
	return /*#__PURE__*/ import_react.createElement($2eb8e6d23f3d0cb0$var$I18nContext.Provider, { value: defaultLocale }, children);
}
function $2eb8e6d23f3d0cb0$export$a54013f0d02a8f82(props) {
	let { locale, children } = props;
	if (locale) return /*#__PURE__*/ import_react.createElement($2eb8e6d23f3d0cb0$var$I18nProviderWithLocale, {
		locale,
		children
	});
	return /*#__PURE__*/ import_react.createElement($2eb8e6d23f3d0cb0$var$I18nProviderWithDefaultLocale, { children });
}
function $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7() {
	let defaultLocale = $520a025cdb0d710d$export$188ec29ebc2bdc3a();
	return (0, import_react.useContext)($2eb8e6d23f3d0cb0$var$I18nContext) || defaultLocale;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/focusWithoutScrolling.mjs
function $1969ac565cfec8d0$export$de79e2c695e052f3(element) {
	if ($1969ac565cfec8d0$var$supportsPreventScroll()) element.focus({ preventScroll: true });
	else {
		let scrollableElements = $1969ac565cfec8d0$var$getScrollableElements(element);
		element.focus();
		$1969ac565cfec8d0$var$restoreScrollPosition(scrollableElements);
	}
}
var $1969ac565cfec8d0$var$supportsPreventScrollCached = null;
function $1969ac565cfec8d0$var$supportsPreventScroll() {
	if ($1969ac565cfec8d0$var$supportsPreventScrollCached == null) {
		$1969ac565cfec8d0$var$supportsPreventScrollCached = false;
		try {
			document.createElement("div").focus({ get preventScroll() {
				$1969ac565cfec8d0$var$supportsPreventScrollCached = true;
				return true;
			} });
		} catch {}
	}
	return $1969ac565cfec8d0$var$supportsPreventScrollCached;
}
function $1969ac565cfec8d0$var$getScrollableElements(element) {
	let parent = element.parentNode;
	let scrollableElements = [];
	let rootScrollingElement = document.scrollingElement || document.documentElement;
	while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
		if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) scrollableElements.push({
			element: parent,
			scrollTop: parent.scrollTop,
			scrollLeft: parent.scrollLeft
		});
		parent = parent.parentNode;
	}
	if (rootScrollingElement instanceof HTMLElement) scrollableElements.push({
		element: rootScrollingElement,
		scrollTop: rootScrollingElement.scrollTop,
		scrollLeft: rootScrollingElement.scrollLeft
	});
	return scrollableElements;
}
function $1969ac565cfec8d0$var$restoreScrollPosition(scrollableElements) {
	for (let { element, scrollTop, scrollLeft } of scrollableElements) {
		element.scrollTop = scrollTop;
		element.scrollLeft = scrollLeft;
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useGlobalListeners.mjs
function $48a7d519b337145d$export$4eaf04e54aa8eed6() {
	let globalListeners = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	let addGlobalListener = (0, import_react.useCallback)((eventTarget, type, listener, options) => {
		let fn = options?.once ? (...args) => {
			globalListeners.current.delete(listener);
			listener(...args);
		} : listener;
		globalListeners.current.set(listener, {
			type,
			eventTarget,
			fn,
			options
		});
		eventTarget.addEventListener(type, fn, options);
	}, []);
	let removeGlobalListener = (0, import_react.useCallback)((eventTarget, type, listener, options) => {
		let fn = globalListeners.current.get(listener)?.fn || listener;
		eventTarget.removeEventListener(type, fn, options);
		globalListeners.current.delete(listener);
	}, []);
	let removeAllGlobalListeners = (0, import_react.useCallback)(() => {
		globalListeners.current.forEach((value, key) => {
			removeGlobalListener(value.eventTarget, value.type, key, value.options);
		});
	}, [removeGlobalListener]);
	(0, import_react.useEffect)(() => {
		return removeAllGlobalListeners;
	}, [removeAllGlobalListeners]);
	return {
		addGlobalListener,
		removeGlobalListener,
		removeAllGlobalListeners
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isElementVisible.mjs
var $ae77152785188400$var$supportsCheckVisibility = typeof Element !== "undefined" && "checkVisibility" in Element.prototype;
function $ae77152785188400$var$isStyleVisible(element) {
	const windowObject = $d447af545b77c9f1$export$f21a1ffae260145a(element);
	if (!(element instanceof windowObject.HTMLElement) && !(element instanceof windowObject.SVGElement)) return false;
	let { display, visibility } = element.style;
	let isVisible = display !== "none" && visibility !== "hidden" && visibility !== "collapse";
	if (isVisible) {
		const { getComputedStyle } = $d447af545b77c9f1$export$f21a1ffae260145a(element);
		let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);
		isVisible = computedDisplay !== "none" && computedVisibility !== "hidden" && computedVisibility !== "collapse";
	}
	return isVisible;
}
function $ae77152785188400$var$isAttributeVisible(element, childElement) {
	return !element.hasAttribute("hidden") && !element.hasAttribute("data-react-aria-prevent-focus") && (element.nodeName === "DETAILS" && childElement && childElement.nodeName !== "SUMMARY" ? element.hasAttribute("open") : true);
}
function $ae77152785188400$export$e989c0fffaa6b27a(element, childElement) {
	if ($ae77152785188400$var$supportsCheckVisibility) return element.checkVisibility({ visibilityProperty: true }) && !element.closest("[data-react-aria-prevent-focus]");
	return element.nodeName !== "#comment" && $ae77152785188400$var$isStyleVisible(element) && $ae77152785188400$var$isAttributeVisible(element, childElement) && (!element.parentElement || $ae77152785188400$export$e989c0fffaa6b27a(element.parentElement, element));
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isFocusable.mjs
var $3b8b240c1bf84ab9$var$focusableElements = [
	"input:not([disabled]):not([type=hidden])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"a[href]",
	"area[href]",
	"summary",
	"iframe",
	"object",
	"embed",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable^=\"false\"])",
	"permission"
];
var $3b8b240c1bf84ab9$var$FOCUSABLE_ELEMENT_SELECTOR = $3b8b240c1bf84ab9$var$focusableElements.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
$3b8b240c1bf84ab9$var$focusableElements.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
var $3b8b240c1bf84ab9$var$TABBABLE_ELEMENT_SELECTOR = $3b8b240c1bf84ab9$var$focusableElements.join(":not([hidden]):not([tabindex=\"-1\"]),");
function $3b8b240c1bf84ab9$export$4c063cf1350e6fed(element, options) {
	return element.matches($3b8b240c1bf84ab9$var$FOCUSABLE_ELEMENT_SELECTOR) && !$3b8b240c1bf84ab9$var$isInert(element) && (options?.skipVisibilityCheck || $ae77152785188400$export$e989c0fffaa6b27a(element));
}
function $3b8b240c1bf84ab9$export$bebd5a1431fec25d(element) {
	return element.matches($3b8b240c1bf84ab9$var$TABBABLE_ELEMENT_SELECTOR) && $ae77152785188400$export$e989c0fffaa6b27a(element) && !$3b8b240c1bf84ab9$var$isInert(element);
}
function $3b8b240c1bf84ab9$var$isInert(element) {
	let node = element;
	while (node != null) {
		if (node instanceof $d447af545b77c9f1$export$f21a1ffae260145a(node).HTMLElement && node.inert) return true;
		node = node.parentElement;
	}
	return false;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/utils.mjs
function $a92dc41f639950be$export$525bc4921d56d4a(nativeEvent) {
	let event = nativeEvent;
	event.nativeEvent = nativeEvent;
	event.isDefaultPrevented = () => event.defaultPrevented;
	event.isPropagationStopped = () => event.cancelBubble;
	event.persist = () => {};
	return event;
}
function $a92dc41f639950be$export$c2b7abe5d61ec696(event, target) {
	Object.defineProperty(event, "target", { value: target });
	Object.defineProperty(event, "currentTarget", { value: target });
}
function $a92dc41f639950be$export$715c682d09d639cc(onBlur) {
	let stateRef = (0, import_react.useRef)({
		isFocused: false,
		observer: null
	});
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		const state = stateRef.current;
		return () => {
			if (state.observer) {
				state.observer.disconnect();
				state.observer = null;
			}
		};
	}, []);
	return (0, import_react.useCallback)((e) => {
		let eventTarget = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		if (eventTarget instanceof HTMLButtonElement || eventTarget instanceof HTMLInputElement || eventTarget instanceof HTMLTextAreaElement || eventTarget instanceof HTMLSelectElement) {
			stateRef.current.isFocused = true;
			let target = eventTarget;
			let onBlurHandler = (e) => {
				stateRef.current.isFocused = false;
				if (target.disabled) {
					let event = $a92dc41f639950be$export$525bc4921d56d4a(e);
					onBlur?.(event);
				}
				if (stateRef.current.observer) {
					stateRef.current.observer.disconnect();
					stateRef.current.observer = null;
				}
			};
			target.addEventListener("focusout", onBlurHandler, { once: true });
			stateRef.current.observer = new MutationObserver(() => {
				if (stateRef.current.isFocused && target.disabled) {
					stateRef.current.observer?.disconnect();
					let relatedTargetEl = target === $23f2114a1b82827e$export$cd4e5573fbe2b576() ? null : $23f2114a1b82827e$export$cd4e5573fbe2b576();
					target.dispatchEvent(new FocusEvent("blur", { relatedTarget: relatedTargetEl }));
					target.dispatchEvent(new FocusEvent("focusout", {
						bubbles: true,
						relatedTarget: relatedTargetEl
					}));
				}
			});
			stateRef.current.observer.observe(target, {
				attributes: true,
				attributeFilter: ["disabled"]
			});
		}
	}, [onBlur]);
}
var $a92dc41f639950be$export$fda7da73ab5d4c48 = false;
function $a92dc41f639950be$export$cabe61c495ee3649(target) {
	while (target && !$3b8b240c1bf84ab9$export$4c063cf1350e6fed(target, { skipVisibilityCheck: true })) target = target.parentElement;
	let window = $d447af545b77c9f1$export$f21a1ffae260145a(target);
	let activeElement = window.document.activeElement;
	if (!activeElement || activeElement === target) return;
	$a92dc41f639950be$export$fda7da73ab5d4c48 = true;
	let isRefocusing = false;
	let onBlur = (e) => {
		if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === activeElement || isRefocusing) e.stopImmediatePropagation();
	};
	let onFocusOut = (e) => {
		if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === activeElement || isRefocusing) {
			e.stopImmediatePropagation();
			if (!target && !isRefocusing) {
				isRefocusing = true;
				$1969ac565cfec8d0$export$de79e2c695e052f3(activeElement);
				cleanup();
			}
		}
	};
	let onFocus = (e) => {
		if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === target || isRefocusing) e.stopImmediatePropagation();
	};
	let onFocusIn = (e) => {
		if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === target || isRefocusing) {
			e.stopImmediatePropagation();
			if (!isRefocusing) {
				isRefocusing = true;
				$1969ac565cfec8d0$export$de79e2c695e052f3(activeElement);
				cleanup();
			}
		}
	};
	window.addEventListener("blur", onBlur, true);
	window.addEventListener("focusout", onFocusOut, true);
	window.addEventListener("focusin", onFocusIn, true);
	window.addEventListener("focus", onFocus, true);
	let cleanup = () => {
		cancelAnimationFrame(raf);
		window.removeEventListener("blur", onBlur, true);
		window.removeEventListener("focusout", onFocusOut, true);
		window.removeEventListener("focusin", onFocusIn, true);
		window.removeEventListener("focus", onFocus, true);
		$a92dc41f639950be$export$fda7da73ab5d4c48 = false;
		isRefocusing = false;
	};
	let raf = requestAnimationFrame(cleanup);
	return cleanup;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isVirtualEvent.mjs
function $b5c62b033c25b96d$export$60278871457622de(event) {
	if (event.pointerType === "" && event.isTrusted) return true;
	if ($2add3ce32c6007eb$export$a11b0059900ceec8() && event.pointerType) return event.type === "click" && event.buttons === 1;
	return event.detail === 0 && !event.pointerType;
}
function $b5c62b033c25b96d$export$29bf1b5f2c56cf63(event) {
	return !$2add3ce32c6007eb$export$a11b0059900ceec8() && event.width === 0 && event.height === 0 || event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse";
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/openLink.mjs
var $caaf0dd3060ed57c$var$RouterContext = /*#__PURE__*/ (0, import_react.createContext)({
	isNative: true,
	open: $caaf0dd3060ed57c$var$openSyntheticLink,
	useHref: (href) => href
});
function $caaf0dd3060ed57c$export$323e4fc2fa4753fb(props) {
	let { children, navigate, useHref } = props;
	let ctx = (0, import_react.useMemo)(() => ({
		isNative: false,
		open: (target, modifiers, href, routerOptions) => {
			$caaf0dd3060ed57c$var$getSyntheticLink(target, (link) => {
				if ($caaf0dd3060ed57c$export$efa8c9099e530235(link, modifiers)) navigate(href, routerOptions);
				else $caaf0dd3060ed57c$export$95185d699e05d4d7(link, modifiers);
			});
		},
		useHref: useHref || ((href) => href)
	}), [navigate, useHref]);
	return /*#__PURE__*/ import_react.createElement($caaf0dd3060ed57c$var$RouterContext.Provider, { value: ctx }, children);
}
function $caaf0dd3060ed57c$export$9a302a45f65d0572() {
	return (0, import_react.useContext)($caaf0dd3060ed57c$var$RouterContext);
}
function $caaf0dd3060ed57c$export$efa8c9099e530235(link, modifiers) {
	let target = link.getAttribute("target");
	return (!target || target === "_self") && link.origin === location.origin && !link.hasAttribute("download") && !modifiers.metaKey && !modifiers.ctrlKey && !modifiers.altKey && !modifiers.shiftKey;
}
function $caaf0dd3060ed57c$export$95185d699e05d4d7(target, modifiers, setOpening = true) {
	let { metaKey, ctrlKey, altKey, shiftKey } = modifiers;
	if ($2add3ce32c6007eb$export$b7d78993b74f766d() && window.event?.type?.startsWith("key") && target.target === "_blank") {
		if ($2add3ce32c6007eb$export$9ac100e40613ea10()) metaKey = true;
		else ctrlKey = true;
	}
	let event = $2add3ce32c6007eb$export$78551043582a6a98() && $2add3ce32c6007eb$export$9ac100e40613ea10() && !$2add3ce32c6007eb$export$7bef049ce92e4224() && true ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey,
		ctrlKey,
		altKey,
		shiftKey
	}) : new MouseEvent("click", {
		metaKey,
		ctrlKey,
		altKey,
		shiftKey,
		detail: 1,
		bubbles: true,
		cancelable: true
	});
	$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening = setOpening;
	$1969ac565cfec8d0$export$de79e2c695e052f3(target);
	target.dispatchEvent(event);
	$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening = false;
}
$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening = false;
function $caaf0dd3060ed57c$var$getSyntheticLink(target, open) {
	if (target instanceof HTMLAnchorElement) open(target);
	else if (target.hasAttribute("data-href")) {
		let link = document.createElement("a");
		link.href = target.getAttribute("data-href");
		if (target.hasAttribute("data-target")) link.target = target.getAttribute("data-target");
		if (target.hasAttribute("data-rel")) link.rel = target.getAttribute("data-rel");
		if (target.hasAttribute("data-download")) link.download = target.getAttribute("data-download");
		if (target.hasAttribute("data-ping")) link.ping = target.getAttribute("data-ping");
		if (target.hasAttribute("data-referrer-policy")) link.referrerPolicy = target.getAttribute("data-referrer-policy");
		target.appendChild(link);
		open(link);
		target.removeChild(link);
	}
}
function $caaf0dd3060ed57c$var$openSyntheticLink(target, modifiers) {
	$caaf0dd3060ed57c$var$getSyntheticLink(target, (link) => $caaf0dd3060ed57c$export$95185d699e05d4d7(link, modifiers));
}
function $caaf0dd3060ed57c$export$bdc77b0c0a3a85d6(props) {
	const href = $caaf0dd3060ed57c$export$9a302a45f65d0572().useHref(props.href ?? "");
	return {
		"data-href": props.href ? href : void 0,
		"data-target": props.target,
		"data-rel": props.rel,
		"data-download": props.download,
		"data-ping": props.ping,
		"data-referrer-policy": props.referrerPolicy
	};
}
function $caaf0dd3060ed57c$export$7e924b3091a3bd18(props) {
	const href = $caaf0dd3060ed57c$export$9a302a45f65d0572().useHref(props?.href ?? "");
	let linkProps = {};
	if (props) {
		for (let key of [
			"href",
			"target",
			"rel",
			"download",
			"ping",
			"referrerPolicy"
		]) if (key in props) linkProps[key] = key === "href" ? href : props[key];
	}
	return linkProps;
}
function $caaf0dd3060ed57c$export$13aea1a3cb5e3f1f(e, router, href, routerOptions) {
	if (!router.isNative && e.currentTarget instanceof HTMLAnchorElement && e.currentTarget.href && !e.isDefaultPrevented() && $caaf0dd3060ed57c$export$efa8c9099e530235(e.currentTarget, e) && href) {
		e.preventDefault();
		router.open(e.currentTarget, e, href, routerOptions);
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusVisible.mjs
var $8f5a2122b0992be3$var$currentModality = null;
var $8f5a2122b0992be3$export$901e90a13c50a14e = /* @__PURE__ */ new Set();
var $8f5a2122b0992be3$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
var $8f5a2122b0992be3$var$hasEventBeforeFocus = false;
var $8f5a2122b0992be3$var$hasBlurredWindowRecently = false;
var $8f5a2122b0992be3$var$FOCUS_VISIBLE_INPUT_KEYS = {
	Tab: true,
	Escape: true
};
function $8f5a2122b0992be3$var$triggerChangeHandlers(modality, e) {
	for (let handler of $8f5a2122b0992be3$export$901e90a13c50a14e) handler(modality, e);
}
/**
* Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus
* styles visible.
*/ function $8f5a2122b0992be3$var$isValidKey(e) {
	return !(e.metaKey || !$2add3ce32c6007eb$export$9ac100e40613ea10() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $8f5a2122b0992be3$var$handleKeyboardEvent(e) {
	$8f5a2122b0992be3$var$hasEventBeforeFocus = true;
	if (!$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening && $8f5a2122b0992be3$var$isValidKey(e)) {
		$8f5a2122b0992be3$var$currentModality = "keyboard";
		$8f5a2122b0992be3$var$triggerChangeHandlers("keyboard", e);
	}
}
function $8f5a2122b0992be3$var$handlePointerEvent(e) {
	$8f5a2122b0992be3$var$currentModality = "pointer";
	"pointerType" in e && e.pointerType;
	if (e.type === "mousedown" || e.type === "pointerdown") {
		$8f5a2122b0992be3$var$hasEventBeforeFocus = true;
		$8f5a2122b0992be3$var$triggerChangeHandlers("pointer", e);
	}
}
function $8f5a2122b0992be3$var$handleClickEvent(e) {
	if (!$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening && $b5c62b033c25b96d$export$60278871457622de(e)) {
		$8f5a2122b0992be3$var$hasEventBeforeFocus = true;
		$8f5a2122b0992be3$var$currentModality = "virtual";
	}
}
function $8f5a2122b0992be3$var$handleFocusEvent(e) {
	let ownerWindow = $d447af545b77c9f1$export$f21a1ffae260145a($23f2114a1b82827e$export$e58f029f0fbfdb29(e));
	let ownerDocument = $d447af545b77c9f1$export$b204af158042fbac($23f2114a1b82827e$export$e58f029f0fbfdb29(e));
	if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === ownerWindow || $23f2114a1b82827e$export$e58f029f0fbfdb29(e) === ownerDocument || $a92dc41f639950be$export$fda7da73ab5d4c48 || !e.isTrusted) return;
	if (!$8f5a2122b0992be3$var$hasEventBeforeFocus && !$8f5a2122b0992be3$var$hasBlurredWindowRecently) {
		$8f5a2122b0992be3$var$currentModality = "virtual";
		$8f5a2122b0992be3$var$triggerChangeHandlers("virtual", e);
	}
	$8f5a2122b0992be3$var$hasEventBeforeFocus = false;
	$8f5a2122b0992be3$var$hasBlurredWindowRecently = false;
}
function $8f5a2122b0992be3$var$handleWindowBlur() {
	if ($a92dc41f639950be$export$fda7da73ab5d4c48) return;
	$8f5a2122b0992be3$var$hasEventBeforeFocus = false;
	$8f5a2122b0992be3$var$hasBlurredWindowRecently = true;
}
/**
* Setup global event listeners to control when keyboard focus style should be visible.
*/ function $8f5a2122b0992be3$var$setupGlobalFocusEvents(element) {
	if (typeof window === "undefined" || typeof document === "undefined") return;
	const windowObject = $d447af545b77c9f1$export$f21a1ffae260145a(element);
	const documentObject = $d447af545b77c9f1$export$b204af158042fbac(element);
	if ($8f5a2122b0992be3$export$d90243b58daecda7.get(windowObject)) return;
	let focus = windowObject.HTMLElement.prototype.focus;
	Reflect.defineProperty(windowObject.HTMLElement.prototype, "focus", {
		configurable: true,
		writable: true,
		value: function() {
			$8f5a2122b0992be3$var$hasEventBeforeFocus = true;
			focus.apply(this, arguments);
		}
	});
	documentObject.addEventListener("keydown", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
	documentObject.addEventListener("keyup", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
	documentObject.addEventListener("click", $8f5a2122b0992be3$var$handleClickEvent, true);
	windowObject.addEventListener("focus", $8f5a2122b0992be3$var$handleFocusEvent, true);
	windowObject.addEventListener("blur", $8f5a2122b0992be3$var$handleWindowBlur, false);
	if (typeof PointerEvent !== "undefined") {
		documentObject.addEventListener("pointerdown", $8f5a2122b0992be3$var$handlePointerEvent, true);
		documentObject.addEventListener("pointermove", $8f5a2122b0992be3$var$handlePointerEvent, true);
		documentObject.addEventListener("pointerup", $8f5a2122b0992be3$var$handlePointerEvent, true);
	}
	windowObject.addEventListener("beforeunload", () => {
		$8f5a2122b0992be3$var$tearDownWindowFocusTracking(element);
	}, { once: true });
	$8f5a2122b0992be3$export$d90243b58daecda7.set(windowObject, { focus });
}
var $8f5a2122b0992be3$var$tearDownWindowFocusTracking = (element, loadListener) => {
	const windowObject = $d447af545b77c9f1$export$f21a1ffae260145a(element);
	const documentObject = $d447af545b77c9f1$export$b204af158042fbac(element);
	if (loadListener) documentObject.removeEventListener("DOMContentLoaded", loadListener);
	if (!$8f5a2122b0992be3$export$d90243b58daecda7.has(windowObject)) return;
	Reflect.defineProperty(windowObject.HTMLElement.prototype, "focus", {
		configurable: true,
		writable: true,
		value: $8f5a2122b0992be3$export$d90243b58daecda7.get(windowObject).focus
	});
	documentObject.removeEventListener("keydown", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
	documentObject.removeEventListener("keyup", $8f5a2122b0992be3$var$handleKeyboardEvent, true);
	documentObject.removeEventListener("click", $8f5a2122b0992be3$var$handleClickEvent, true);
	windowObject.removeEventListener("focus", $8f5a2122b0992be3$var$handleFocusEvent, true);
	windowObject.removeEventListener("blur", $8f5a2122b0992be3$var$handleWindowBlur, false);
	if (typeof PointerEvent !== "undefined") {
		documentObject.removeEventListener("pointerdown", $8f5a2122b0992be3$var$handlePointerEvent, true);
		documentObject.removeEventListener("pointermove", $8f5a2122b0992be3$var$handlePointerEvent, true);
		documentObject.removeEventListener("pointerup", $8f5a2122b0992be3$var$handlePointerEvent, true);
	}
	$8f5a2122b0992be3$export$d90243b58daecda7.delete(windowObject);
};
function $8f5a2122b0992be3$export$2f1888112f558a7d(element) {
	const documentObject = $d447af545b77c9f1$export$b204af158042fbac(element);
	let loadListener;
	if (documentObject.readyState !== "loading") $8f5a2122b0992be3$var$setupGlobalFocusEvents(element);
	else {
		loadListener = () => {
			$8f5a2122b0992be3$var$setupGlobalFocusEvents(element);
		};
		documentObject.addEventListener("DOMContentLoaded", loadListener);
	}
	return () => $8f5a2122b0992be3$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined") $8f5a2122b0992be3$export$2f1888112f558a7d();
function $8f5a2122b0992be3$export$b9b3dfddab17db27() {
	return $8f5a2122b0992be3$var$currentModality !== "pointer";
}
function $8f5a2122b0992be3$export$630ff653c5ada6a9() {
	return $8f5a2122b0992be3$var$currentModality;
}
function $8f5a2122b0992be3$export$8397ddfc504fdb9a(modality) {
	$8f5a2122b0992be3$var$currentModality = modality;
	$8f5a2122b0992be3$var$triggerChangeHandlers(modality, null);
}
function $8f5a2122b0992be3$export$98e20ec92f614cfe() {
	$8f5a2122b0992be3$var$setupGlobalFocusEvents();
	let [modality, setModality] = (0, import_react.useState)($8f5a2122b0992be3$var$currentModality);
	(0, import_react.useEffect)(() => {
		let handler = () => {
			setModality($8f5a2122b0992be3$var$currentModality);
		};
		$8f5a2122b0992be3$export$901e90a13c50a14e.add(handler);
		return () => {
			$8f5a2122b0992be3$export$901e90a13c50a14e.delete(handler);
		};
	}, []);
	return $c7eafbbe1ea5834e$export$535bd6ca7f90a273() ? null : modality;
}
var $8f5a2122b0992be3$var$nonTextInputTypes = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
/**
* If this is attached to text input component, return if the event is a focus event (Tab/Escape
* keys pressed) so that focus visible style can be properly set.
*/ function $8f5a2122b0992be3$var$isKeyboardFocusEvent(isTextInput, modality, e) {
	let eventTarget = e ? $23f2114a1b82827e$export$e58f029f0fbfdb29(e) : void 0;
	let document1 = $d447af545b77c9f1$export$b204af158042fbac(eventTarget);
	let ownerWindow = $d447af545b77c9f1$export$f21a1ffae260145a(eventTarget);
	const IHTMLInputElement = typeof ownerWindow !== "undefined" ? ownerWindow.HTMLInputElement : HTMLInputElement;
	const IHTMLTextAreaElement = typeof ownerWindow !== "undefined" ? ownerWindow.HTMLTextAreaElement : HTMLTextAreaElement;
	const IHTMLElement = typeof ownerWindow !== "undefined" ? ownerWindow.HTMLElement : HTMLElement;
	const IKeyboardEvent = typeof ownerWindow !== "undefined" ? ownerWindow.KeyboardEvent : KeyboardEvent;
	let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(document1);
	isTextInput = isTextInput || activeElement instanceof IHTMLInputElement && !$8f5a2122b0992be3$var$nonTextInputTypes.has(activeElement.type) || activeElement instanceof IHTMLTextAreaElement || activeElement instanceof IHTMLElement && activeElement.isContentEditable;
	return !(isTextInput && modality === "keyboard" && e instanceof IKeyboardEvent && !$8f5a2122b0992be3$var$FOCUS_VISIBLE_INPUT_KEYS[e.key]);
}
function $8f5a2122b0992be3$export$ec71b4b83ac08ec3(fn, deps, opts) {
	$8f5a2122b0992be3$var$setupGlobalFocusEvents();
	(0, import_react.useEffect)(() => {
		if (opts?.enabled === false) return;
		let handler = (modality, e) => {
			if (!$8f5a2122b0992be3$var$isKeyboardFocusEvent(!!opts?.isTextInput, modality, e)) return;
			fn($8f5a2122b0992be3$export$b9b3dfddab17db27());
		};
		$8f5a2122b0992be3$export$901e90a13c50a14e.add(handler);
		return () => {
			$8f5a2122b0992be3$export$901e90a13c50a14e.delete(handler);
		};
	}, deps);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/filterDOMProps.mjs
var $8e9d2fae0ecb9001$var$DOMPropNames = /* @__PURE__ */ new Set(["id"]);
var $8e9d2fae0ecb9001$var$labelablePropNames = /* @__PURE__ */ new Set([
	"aria-label",
	"aria-labelledby",
	"aria-describedby",
	"aria-details"
]);
var $8e9d2fae0ecb9001$var$linkPropNames = /* @__PURE__ */ new Set([
	"href",
	"hrefLang",
	"target",
	"rel",
	"download",
	"ping",
	"referrerPolicy"
]);
var $8e9d2fae0ecb9001$var$globalAttrs = /* @__PURE__ */ new Set([
	"dir",
	"lang",
	"hidden",
	"inert",
	"translate"
]);
var $8e9d2fae0ecb9001$var$globalEvents = /* @__PURE__ */ new Set([
	"onClick",
	"onAuxClick",
	"onContextMenu",
	"onDoubleClick",
	"onMouseDown",
	"onMouseEnter",
	"onMouseLeave",
	"onMouseMove",
	"onMouseOut",
	"onMouseOver",
	"onMouseUp",
	"onTouchCancel",
	"onTouchEnd",
	"onTouchMove",
	"onTouchStart",
	"onPointerDown",
	"onPointerMove",
	"onPointerUp",
	"onPointerCancel",
	"onPointerEnter",
	"onPointerLeave",
	"onPointerOver",
	"onPointerOut",
	"onGotPointerCapture",
	"onLostPointerCapture",
	"onScroll",
	"onWheel",
	"onAnimationStart",
	"onAnimationEnd",
	"onAnimationIteration",
	"onTransitionCancel",
	"onTransitionEnd",
	"onTransitionRun",
	"onTransitionStart"
]);
var $8e9d2fae0ecb9001$var$propRe = /^(data-.*)$/;
function $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, opts = {}) {
	let { labelable, isLink, global, events = global, propNames } = opts;
	let filteredProps = {};
	for (const prop in props) if (Object.prototype.hasOwnProperty.call(props, prop) && ($8e9d2fae0ecb9001$var$DOMPropNames.has(prop) || labelable && $8e9d2fae0ecb9001$var$labelablePropNames.has(prop) || isLink && $8e9d2fae0ecb9001$var$linkPropNames.has(prop) || global && $8e9d2fae0ecb9001$var$globalAttrs.has(prop) || events && ($8e9d2fae0ecb9001$var$globalEvents.has(prop) || prop.endsWith("Capture") && $8e9d2fae0ecb9001$var$globalEvents.has(prop.slice(0, -7))) || propNames?.has(prop) || $8e9d2fae0ecb9001$var$propRe.test(prop))) filteredProps[prop] = props[prop];
	return filteredProps;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocus.mjs
function $1e74c67db218ce67$export$f8168d8dd8fd66e6(props) {
	let { isDisabled, onFocus: onFocusProp, onBlur: onBlurProp, onFocusChange } = props;
	const onBlur = (0, import_react.useCallback)((e) => {
		if ($23f2114a1b82827e$export$e58f029f0fbfdb29(e) === e.currentTarget) {
			if (onBlurProp) onBlurProp(e);
			if (onFocusChange) onFocusChange(false);
			return true;
		}
	}, [onBlurProp, onFocusChange]);
	const onSyntheticFocus = $a92dc41f639950be$export$715c682d09d639cc(onBlur);
	const onFocus = (0, import_react.useCallback)((e) => {
		let eventTarget = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(eventTarget);
		const activeElement = ownerDocument ? $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument) : $23f2114a1b82827e$export$cd4e5573fbe2b576();
		if (eventTarget === e.currentTarget && eventTarget === activeElement) {
			if (onFocusProp) onFocusProp(e);
			if (onFocusChange) onFocusChange(true);
			onSyntheticFocus(e);
		}
	}, [
		onFocusChange,
		onFocusProp,
		onSyntheticFocus
	]);
	return { focusProps: {
		onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : void 0,
		onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : void 0
	} };
}
//#endregion
//#region node_modules/@emotion/sheet/dist/emotion-sheet.development.esm.js
var import_jsx_runtime = require_jsx_runtime();
function sheetForTag(tag) {
	if (tag.sheet) return tag.sheet;
	/* istanbul ignore next */
	for (var i = 0; i < document.styleSheets.length; i++) if (document.styleSheets[i].ownerNode === tag) return document.styleSheets[i];
}
function createStyleElement(options) {
	var tag = document.createElement("style");
	tag.setAttribute("data-emotion", options.key);
	if (options.nonce !== void 0) tag.setAttribute("nonce", options.nonce);
	tag.appendChild(document.createTextNode(""));
	tag.setAttribute("data-s", "");
	return tag;
}
var StyleSheet = /*#__PURE__*/ function() {
	function StyleSheet(options) {
		var _this = this;
		this._insertTag = function(tag) {
			var before;
			if (_this.tags.length === 0) {
				if (_this.insertionPoint) before = _this.insertionPoint.nextSibling;
				else if (_this.prepend) before = _this.container.firstChild;
				else before = _this.before;
			} else before = _this.tags[_this.tags.length - 1].nextSibling;
			_this.container.insertBefore(tag, before);
			_this.tags.push(tag);
		};
		this.isSpeedy = options.speedy === void 0 ? false : options.speedy;
		this.tags = [];
		this.ctr = 0;
		this.nonce = options.nonce;
		this.key = options.key;
		this.container = options.container;
		this.prepend = options.prepend;
		this.insertionPoint = options.insertionPoint;
		this.before = null;
	}
	var _proto = StyleSheet.prototype;
	_proto.hydrate = function hydrate(nodes) {
		nodes.forEach(this._insertTag);
	};
	_proto.insert = function insert(rule) {
		if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) this._insertTag(createStyleElement(this));
		var tag = this.tags[this.tags.length - 1];
		var isImportRule = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
		if (isImportRule && this._alreadyInsertedOrderInsensitiveRule) console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
		this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule;
		if (this.isSpeedy) {
			var sheet = sheetForTag(tag);
			try {
				sheet.insertRule(rule, sheet.cssRules.length);
			} catch (e) {
				if (!/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) console.error("There was a problem inserting the following rule: \"" + rule + "\"", e);
			}
		} else tag.appendChild(document.createTextNode(rule));
		this.ctr++;
	};
	_proto.flush = function flush() {
		this.tags.forEach(function(tag) {
			var _tag$parentNode;
			return (_tag$parentNode = tag.parentNode) == null ? void 0 : _tag$parentNode.removeChild(tag);
		});
		this.tags = [];
		this.ctr = 0;
		this._alreadyInsertedOrderInsensitiveRule = false;
	};
	return StyleSheet;
}();
//#endregion
//#region node_modules/stylis/src/Enum.js
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
//#endregion
//#region node_modules/stylis/src/Utility.js
/**
* @param {number}
* @return {number}
*/
var abs = Math.abs;
/**
* @param {number}
* @return {string}
*/
var from = String.fromCharCode;
/**
* @param {object}
* @return {object}
*/
var assign = Object.assign;
/**
* @param {string} value
* @param {number} length
* @return {number}
*/
function hash(value, length) {
	return charat(value, 0) ^ 45 ? (((length << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
/**
* @param {string} value
* @return {string}
*/
function trim(value) {
	return value.trim();
}
/**
* @param {string} value
* @param {RegExp} pattern
* @return {string?}
*/
function match(value, pattern) {
	return (value = pattern.exec(value)) ? value[0] : value;
}
/**
* @param {string} value
* @param {(string|RegExp)} pattern
* @param {string} replacement
* @return {string}
*/
function replace(value, pattern, replacement) {
	return value.replace(pattern, replacement);
}
/**
* @param {string} value
* @param {string} search
* @return {number}
*/
function indexof(value, search) {
	return value.indexOf(search);
}
/**
* @param {string} value
* @param {number} index
* @return {number}
*/
function charat(value, index) {
	return value.charCodeAt(index) | 0;
}
/**
* @param {string} value
* @param {number} begin
* @param {number} end
* @return {string}
*/
function substr(value, begin, end) {
	return value.slice(begin, end);
}
/**
* @param {string} value
* @return {number}
*/
function strlen(value) {
	return value.length;
}
/**
* @param {any[]} value
* @return {number}
*/
function sizeof(value) {
	return value.length;
}
/**
* @param {any} value
* @param {any[]} array
* @return {any}
*/
function append(value, array) {
	return array.push(value), value;
}
/**
* @param {string[]} array
* @param {function} callback
* @return {string}
*/
function combine(array, callback) {
	return array.map(callback).join("");
}
//#endregion
//#region node_modules/stylis/src/Tokenizer.js
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
/**
* @param {string} value
* @param {object | null} root
* @param {object | null} parent
* @param {string} type
* @param {string[] | string} props
* @param {object[] | string} children
* @param {number} length
*/
function node(value, root, parent, type, props, children, length) {
	return {
		value,
		root,
		parent,
		type,
		props,
		children,
		line,
		column,
		length,
		return: ""
	};
}
/**
* @param {object} root
* @param {object} props
* @return {object}
*/
function copy(root, props) {
	return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
/**
* @return {number}
*/
function char() {
	return character;
}
/**
* @return {number}
*/
function prev() {
	character = position > 0 ? charat(characters, --position) : 0;
	if (column--, character === 10) column = 1, line--;
	return character;
}
/**
* @return {number}
*/
function next() {
	character = position < length ? charat(characters, position++) : 0;
	if (column++, character === 10) column = 1, line++;
	return character;
}
/**
* @return {number}
*/
function peek() {
	return charat(characters, position);
}
/**
* @return {number}
*/
function caret() {
	return position;
}
/**
* @param {number} begin
* @param {number} end
* @return {string}
*/
function slice(begin, end) {
	return substr(characters, begin, end);
}
/**
* @param {number} type
* @return {number}
*/
function token(type) {
	switch (type) {
		case 0:
		case 9:
		case 10:
		case 13:
		case 32: return 5;
		case 33:
		case 43:
		case 44:
		case 47:
		case 62:
		case 64:
		case 126:
		case 59:
		case 123:
		case 125: return 4;
		case 58: return 3;
		case 34:
		case 39:
		case 40:
		case 91: return 2;
		case 41:
		case 93: return 1;
	}
	return 0;
}
/**
* @param {string} value
* @return {any[]}
*/
function alloc(value) {
	return line = column = 1, length = strlen(characters = value), position = 0, [];
}
/**
* @param {any} value
* @return {any}
*/
function dealloc(value) {
	return characters = "", value;
}
/**
* @param {number} type
* @return {string}
*/
function delimit(type) {
	return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
/**
* @param {number} type
* @return {string}
*/
function whitespace(type) {
	while (character = peek()) if (character < 33) next();
	else break;
	return token(type) > 2 || token(character) > 3 ? "" : " ";
}
/**
* @param {number} index
* @param {number} count
* @return {string}
*/
function escaping(index, count) {
	while (--count && next()) if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
	return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
/**
* @param {number} type
* @return {number}
*/
function delimiter(type) {
	while (next()) switch (character) {
		case type: return position;
		case 34:
		case 39:
			if (type !== 34 && type !== 39) delimiter(character);
			break;
		case 40:
			if (type === 41) delimiter(type);
			break;
		case 92: next();
	}
	return position;
}
/**
* @param {number} type
* @param {number} index
* @return {number}
*/
function commenter(type, index) {
	while (next()) if (type + character === 57) break;
	else if (type + character === 84 && peek() === 47) break;
	return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
/**
* @param {number} index
* @return {string}
*/
function identifier(index) {
	while (!token(peek())) next();
	return slice(index, position);
}
//#endregion
//#region node_modules/stylis/src/Parser.js
/**
* @param {string} value
* @return {object[]}
*/
function compile(value) {
	return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {string[]} rule
* @param {string[]} rules
* @param {string[]} rulesets
* @param {number[]} pseudo
* @param {number[]} points
* @param {string[]} declarations
* @return {object}
*/
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
	var index = 0;
	var offset = 0;
	var length = pseudo;
	var atrule = 0;
	var property = 0;
	var previous = 0;
	var variable = 1;
	var scanning = 1;
	var ampersand = 1;
	var character = 0;
	var type = "";
	var props = rules;
	var children = rulesets;
	var reference = rule;
	var characters = type;
	while (scanning) switch (previous = character, character = next()) {
		case 40: if (previous != 108 && charat(characters, length - 1) == 58) {
			if (indexof(characters += replace(delimit(character), "&", "&\f"), "&\f") != -1) ampersand = -1;
			break;
		}
		case 34:
		case 39:
		case 91:
			characters += delimit(character);
			break;
		case 9:
		case 10:
		case 13:
		case 32:
			characters += whitespace(previous);
			break;
		case 92:
			characters += escaping(caret() - 1, 7);
			continue;
		case 47:
			switch (peek()) {
				case 42:
				case 47:
					append(comment(commenter(next(), caret()), root, parent), declarations);
					break;
				default: characters += "/";
			}
			break;
		case 123 * variable: points[index++] = strlen(characters) * ampersand;
		case 125 * variable:
		case 59:
		case 0:
			switch (character) {
				case 0:
				case 125: scanning = 0;
				case 59 + offset:
					if (ampersand == -1) characters = replace(characters, /\f/g, "");
					if (property > 0 && strlen(characters) - length) append(property > 32 ? declaration(characters + ";", rule, parent, length - 1) : declaration(replace(characters, " ", "") + ";", rule, parent, length - 2), declarations);
					break;
				case 59: characters += ";";
				default:
					append(reference = ruleset(characters, root, parent, index, offset, rules, points, type, props = [], children = [], length), rulesets);
					if (character === 123) if (offset === 0) parse(characters, root, reference, reference, props, rulesets, length, points, children);
					else switch (atrule === 99 && charat(characters, 3) === 110 ? 100 : atrule) {
						case 100:
						case 108:
						case 109:
						case 115:
							parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length), children), rules, children, length, points, rule ? props : children);
							break;
						default: parse(characters, reference, reference, reference, [""], children, 0, points, children);
					}
			}
			index = offset = property = 0, variable = ampersand = 1, type = characters = "", length = pseudo;
			break;
		case 58: length = 1 + strlen(characters), property = previous;
		default:
			if (variable < 1) {
				if (character == 123) --variable;
				else if (character == 125 && variable++ == 0 && prev() == 125) continue;
			}
			switch (characters += from(character), character * variable) {
				case 38:
					ampersand = offset > 0 ? 1 : (characters += "\f", -1);
					break;
				case 44:
					points[index++] = (strlen(characters) - 1) * ampersand, ampersand = 1;
					break;
				case 64:
					if (peek() === 45) characters += delimit(next());
					atrule = peek(), offset = length = strlen(type = characters += identifier(caret())), character++;
					break;
				case 45: if (previous === 45 && strlen(characters) == 2) variable = 0;
			}
	}
	return rulesets;
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} index
* @param {number} offset
* @param {string[]} rules
* @param {number[]} points
* @param {string} type
* @param {string[]} props
* @param {string[]} children
* @param {number} length
* @return {object}
*/
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length) {
	var post = offset - 1;
	var rule = offset === 0 ? rules : [""];
	var size = sizeof(rule);
	for (var i = 0, j = 0, k = 0; i < index; ++i) for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x) if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
	return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length);
}
/**
* @param {number} value
* @param {object} root
* @param {object?} parent
* @return {object}
*/
function comment(value, root, parent) {
	return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
/**
* @param {string} value
* @param {object} root
* @param {object?} parent
* @param {number} length
* @return {object}
*/
function declaration(value, root, parent, length) {
	return node(value, root, parent, DECLARATION, substr(value, 0, length), substr(value, length + 1, -1), length);
}
//#endregion
//#region node_modules/stylis/src/Serializer.js
/**
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function serialize(children, callback) {
	var output = "";
	var length = sizeof(children);
	for (var i = 0; i < length; i++) output += callback(children[i], i, children, callback) || "";
	return output;
}
/**
* @param {object} element
* @param {number} index
* @param {object[]} children
* @param {function} callback
* @return {string}
*/
function stringify(element, index, children, callback) {
	switch (element.type) {
		case LAYER: if (element.children.length) break;
		case IMPORT:
		case DECLARATION: return element.return = element.return || element.value;
		case COMMENT: return "";
		case KEYFRAMES: return element.return = element.value + "{" + serialize(element.children, callback) + "}";
		case RULESET: element.value = element.props.join(",");
	}
	return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
//#endregion
//#region node_modules/stylis/src/Middleware.js
/**
* @param {function[]} collection
* @return {function}
*/
function middleware(collection) {
	var length = sizeof(collection);
	return function(element, index, children, callback) {
		var output = "";
		for (var i = 0; i < length; i++) output += collection[i](element, index, children, callback) || "";
		return output;
	};
}
//#endregion
//#region node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
	var cache = Object.create(null);
	return function(arg) {
		if (cache[arg] === void 0) cache[arg] = fn(arg);
		return cache[arg];
	};
}
//#endregion
//#region node_modules/@emotion/cache/dist/emotion-cache.browser.development.esm.js
var identifierWithPointTracking = function identifierWithPointTracking(begin, points, index) {
	var previous = 0;
	var character = 0;
	while (true) {
		previous = character;
		character = peek();
		if (previous === 38 && character === 12) points[index] = 1;
		if (token(character)) break;
		next();
	}
	return slice(begin, position);
};
var toRules = function toRules(parsed, points) {
	var index = -1;
	var character = 44;
	do
		switch (token(character)) {
			case 0:
				if (character === 38 && peek() === 12) points[index] = 1;
				parsed[index] += identifierWithPointTracking(position - 1, points, index);
				break;
			case 2:
				parsed[index] += delimit(character);
				break;
			case 4: if (character === 44) {
				parsed[++index] = peek() === 58 ? "&\f" : "";
				points[index] = parsed[index].length;
				break;
			}
			default: parsed[index] += from(character);
		}
	while (character = next());
	return parsed;
};
var getRules = function getRules(value, points) {
	return dealloc(toRules(alloc(value), points));
};
var fixedElements = /* #__PURE__ */ new WeakMap();
var compat = function compat(element) {
	if (element.type !== "rule" || !element.parent || element.length < 1) return;
	var value = element.value;
	var parent = element.parent;
	var isImplicitRule = element.column === parent.column && element.line === parent.line;
	while (parent.type !== "rule") {
		parent = parent.parent;
		if (!parent) return;
	}
	if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) return;
	if (isImplicitRule) return;
	fixedElements.set(element, true);
	var points = [];
	var rules = getRules(value, points);
	var parentRules = parent.props;
	for (var i = 0, k = 0; i < rules.length; i++) for (var j = 0; j < parentRules.length; j++, k++) element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
};
var removeLabel = function removeLabel(element) {
	if (element.type === "decl") {
		var value = element.value;
		if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
			element["return"] = "";
			element.value = "";
		}
	}
};
var ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
var isIgnoringComment = function isIgnoringComment(element) {
	return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
};
var createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm(cache) {
	return function(element, index, children) {
		if (element.type !== "rule" || cache.compat) return;
		var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
		if (unsafePseudoClasses) {
			var commentContainer = !!element.parent ? element.parent.children : children;
			for (var i = commentContainer.length - 1; i >= 0; i--) {
				var node = commentContainer[i];
				if (node.line < element.line) break;
				if (node.column < element.column) {
					if (isIgnoringComment(node)) return;
					break;
				}
			}
			unsafePseudoClasses.forEach(function(unsafePseudoClass) {
				console.error("The pseudo class \"" + unsafePseudoClass + "\" is potentially unsafe when doing server-side rendering. Try changing it to \"" + unsafePseudoClass.split("-child")[0] + "-of-type\".");
			});
		}
	};
};
var isImportRule = function isImportRule(element) {
	return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
};
var isPrependedWithRegularRules = function isPrependedWithRegularRules(index, children) {
	for (var i = index - 1; i >= 0; i--) if (!isImportRule(children[i])) return true;
	return false;
};
var nullifyElement = function nullifyElement(element) {
	element.type = "";
	element.value = "";
	element["return"] = "";
	element.children = "";
	element.props = "";
};
var incorrectImportAlarm = function incorrectImportAlarm(element, index, children) {
	if (!isImportRule(element)) return;
	if (element.parent) {
		console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
		nullifyElement(element);
	} else if (isPrependedWithRegularRules(index, children)) {
		console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
		nullifyElement(element);
	}
};
function prefix(value, length) {
	switch (hash(value, length)) {
		case 5103: return WEBKIT + "print-" + value + value;
		case 5737:
		case 4201:
		case 3177:
		case 3433:
		case 1641:
		case 4457:
		case 2921:
		case 5572:
		case 6356:
		case 5844:
		case 3191:
		case 6645:
		case 3005:
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		case 4215:
		case 6389:
		case 5109:
		case 5365:
		case 5621:
		case 3829: return WEBKIT + value + value;
		case 5349:
		case 4246:
		case 4810:
		case 6968:
		case 2756: return WEBKIT + value + MOZ + value + MS + value + value;
		case 6828:
		case 4268: return WEBKIT + value + MS + value + value;
		case 6165: return WEBKIT + value + MS + "flex-" + value + value;
		case 5187: return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
		case 5443: return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
		case 4675: return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
		case 5548: return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
		case 5292: return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
		case 6060: return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
		case 4554: return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
		case 6187: return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
		case 5495:
		case 3959: return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
		case 4968: return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
		case 4095:
		case 3583:
		case 4068:
		case 2532: return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
		case 8116:
		case 7059:
		case 5753:
		case 5535:
		case 5445:
		case 5701:
		case 4933:
		case 4677:
		case 5533:
		case 5789:
		case 5021:
		case 4765:
			if (strlen(value) - 1 - length > 6) switch (charat(value, length + 1)) {
				case 109: if (charat(value, length + 4) !== 45) break;
				case 102: return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length + 3) == 108 ? "$3" : "$2-$3")) + value;
				case 115: return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length) + value : value;
			}
			break;
		case 4949: if (charat(value, length + 1) !== 115) break;
		case 6444:
			switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
				case 107: return replace(value, ":", ":" + WEBKIT) + value;
				case 101: return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
			}
			break;
		case 5936:
			switch (charat(value, length + 11)) {
				case 114: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
				case 108: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
				case 45: return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
			}
			return WEBKIT + value + MS + value + value;
	}
	return value;
}
var defaultStylisPlugins = [function prefixer(element, index, children, callback) {
	if (element.length > -1) {
		if (!element["return"]) switch (element.type) {
			case DECLARATION:
				element["return"] = prefix(element.value, element.length);
				break;
			case KEYFRAMES: return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
			case RULESET: if (element.length) return combine(element.props, function(value) {
				switch (match(value, /(::plac\w+|:read-\w+)/)) {
					case ":read-only":
					case ":read-write": return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
					case "::placeholder": return serialize([
						copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
						copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
						copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
					], callback);
				}
				return "";
			});
		}
	}
}];
var getSourceMap;
var sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
getSourceMap = function getSourceMap(styles) {
	var matches = styles.match(sourceMapPattern);
	if (!matches) return;
	return matches[matches.length - 1];
};
var createCache = function createCache(options) {
	var key = options.key;
	if (!key) throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
	if (key === "css") {
		var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
		Array.prototype.forEach.call(ssrStyles, function(node) {
			if (node.getAttribute("data-emotion").indexOf(" ") === -1) return;
			document.head.appendChild(node);
			node.setAttribute("data-s", "");
		});
	}
	var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
	if (/[^a-z-]/.test(key)) throw new Error("Emotion key must only contain lower case alphabetical characters and - but \"" + key + "\" was passed");
	var inserted = {};
	var container;
	var nodesToHydrate = [];
	container = options.container || document.head;
	Array.prototype.forEach.call(document.querySelectorAll("style[data-emotion^=\"" + key + " \"]"), function(node) {
		var attrib = node.getAttribute("data-emotion").split(" ");
		for (var i = 1; i < attrib.length; i++) inserted[attrib[i]] = true;
		nodesToHydrate.push(node);
	});
	var _insert;
	var omnipresentPlugins = [compat, removeLabel];
	omnipresentPlugins.push(createUnsafeSelectorsAlarm({ get compat() {
		return cache.compat;
	} }), incorrectImportAlarm);
	var currentSheet;
	var finalizingPlugins = [stringify, function(element) {
		if (!element.root) {
			if (element["return"]) currentSheet.insert(element["return"]);
			else if (element.value && element.type !== "comm") currentSheet.insert(element.value + "{}");
		}
	}];
	var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
	var stylis = function stylis(styles) {
		return serialize(compile(styles), serializer);
	};
	_insert = function insert(selector, serialized, sheet, shouldCache) {
		currentSheet = sheet;
		if (getSourceMap) {
			var sourceMap = getSourceMap(serialized.styles);
			if (sourceMap) currentSheet = { insert: function insert(rule) {
				sheet.insert(rule + sourceMap);
			} };
		}
		stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
		if (shouldCache) cache.inserted[serialized.name] = true;
	};
	var cache = {
		key,
		sheet: new StyleSheet({
			key,
			container,
			nonce: options.nonce,
			speedy: options.speedy,
			prepend: options.prepend,
			insertionPoint: options.insertionPoint
		}),
		nonce: options.nonce,
		inserted,
		registered: {},
		insert: _insert
	};
	cache.sheet.hydrate(nodesToHydrate);
	return cache;
};
//#endregion
//#region node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
	var h = 0;
	var k, i = 0, len = str.length;
	for (; len >= 4; ++i, len -= 4) {
		k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
		k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
		k ^= k >>> 24;
		h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	switch (len) {
		case 3: h ^= (str.charCodeAt(i + 2) & 255) << 16;
		case 2: h ^= (str.charCodeAt(i + 1) & 255) << 8;
		case 1:
			h ^= str.charCodeAt(i) & 255;
			h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	}
	h ^= h >>> 13;
	h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
	return ((h ^ h >>> 15) >>> 0).toString(36);
}
//#endregion
//#region node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys = {
	animationIterationCount: 1,
	aspectRatio: 1,
	borderImageOutset: 1,
	borderImageSlice: 1,
	borderImageWidth: 1,
	boxFlex: 1,
	boxFlexGroup: 1,
	boxOrdinalGroup: 1,
	columnCount: 1,
	columns: 1,
	flex: 1,
	flexGrow: 1,
	flexPositive: 1,
	flexShrink: 1,
	flexNegative: 1,
	flexOrder: 1,
	gridRow: 1,
	gridRowEnd: 1,
	gridRowSpan: 1,
	gridRowStart: 1,
	gridColumn: 1,
	gridColumnEnd: 1,
	gridColumnSpan: 1,
	gridColumnStart: 1,
	msGridRow: 1,
	msGridRowSpan: 1,
	msGridColumn: 1,
	msGridColumnSpan: 1,
	fontWeight: 1,
	lineHeight: 1,
	opacity: 1,
	order: 1,
	orphans: 1,
	scale: 1,
	tabSize: 1,
	widows: 1,
	zIndex: 1,
	zoom: 1,
	WebkitLineClamp: 1,
	fillOpacity: 1,
	floodOpacity: 1,
	stopOpacity: 1,
	strokeDasharray: 1,
	strokeDashoffset: 1,
	strokeMiterlimit: 1,
	strokeOpacity: 1,
	strokeWidth: 1
};
//#endregion
//#region node_modules/@emotion/serialize/dist/emotion-serialize.development.esm.js
var isDevelopment = true;
var ILLEGAL_ESCAPE_SEQUENCE_ERROR = "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences";
var UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty(property) {
	return property.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue(value) {
	return value != null && typeof value !== "boolean";
};
var processStyleName = /* #__PURE__ */ memoize(function(styleName) {
	return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue(key, value) {
	switch (key) {
		case "animation":
		case "animationName": if (typeof value === "string") return value.replace(animationRegex, function(match, p1, p2) {
			cursor = {
				name: p1,
				styles: p2,
				next: cursor
			};
			return p1;
		});
	}
	if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) return value + "px";
	return value;
};
var contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
var contentValues = [
	"normal",
	"none",
	"initial",
	"inherit",
	"unset"
];
var oldProcessStyleValue = processStyleValue;
var msPattern = /^-ms-/;
var hyphenPattern = /-(.)/g;
var hyphenatedCache = {};
processStyleValue = function processStyleValue(key, value) {
	if (key === "content") {
		if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== "\"" && value.charAt(0) !== "'")) throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
	}
	var processed = oldProcessStyleValue(key, value);
	if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
		hyphenatedCache[key] = true;
		console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
			return _char.toUpperCase();
		}) + "?");
	}
	return processed;
};
var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function handleInterpolation(mergedProps, registered, interpolation) {
	if (interpolation == null) return "";
	var componentSelector = interpolation;
	if (componentSelector.__emotion_styles !== void 0) {
		if (String(componentSelector) === "NO_COMPONENT_SELECTOR") throw new Error(noComponentSelectorMessage);
		return componentSelector;
	}
	switch (typeof interpolation) {
		case "boolean": return "";
		case "object":
			var keyframes = interpolation;
			if (keyframes.anim === 1) {
				cursor = {
					name: keyframes.name,
					styles: keyframes.styles,
					next: cursor
				};
				return keyframes.name;
			}
			var serializedStyles = interpolation;
			if (serializedStyles.styles !== void 0) {
				var next = serializedStyles.next;
				if (next !== void 0) while (next !== void 0) {
					cursor = {
						name: next.name,
						styles: next.styles,
						next: cursor
					};
					next = next.next;
				}
				return serializedStyles.styles + ";";
			}
			return createStringFromObject(mergedProps, registered, interpolation);
		case "function":
			if (mergedProps !== void 0) {
				var previousCursor = cursor;
				var result = interpolation(mergedProps);
				cursor = previousCursor;
				return handleInterpolation(mergedProps, registered, result);
			} else console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
			break;
		case "string":
			var matched = [];
			var replaced = interpolation.replace(animationRegex, function(_match, _p1, p2) {
				var fakeVarName = "animation" + matched.length;
				matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
				return "${" + fakeVarName + "}";
			});
			if (matched.length) console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\ncss`" + replaced + "`");
	}
	var asString = interpolation;
	if (registered == null) return asString;
	var cached = registered[asString];
	return cached !== void 0 ? cached : asString;
}
function createStringFromObject(mergedProps, registered, obj) {
	var string = "";
	if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
	else for (var key in obj) {
		var value = obj[key];
		if (typeof value !== "object") {
			var asString = value;
			if (registered != null && registered[asString] !== void 0) string += key + "{" + registered[asString] + "}";
			else if (isProcessableValue(asString)) string += processStyleName(key) + ":" + processStyleValue(key, asString) + ";";
		} else {
			if (key === "NO_COMPONENT_SELECTOR" && isDevelopment) throw new Error(noComponentSelectorMessage);
			if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
				for (var _i = 0; _i < value.length; _i++) if (isProcessableValue(value[_i])) string += processStyleName(key) + ":" + processStyleValue(key, value[_i]) + ";";
			} else {
				var interpolated = handleInterpolation(mergedProps, registered, value);
				switch (key) {
					case "animation":
					case "animationName":
						string += processStyleName(key) + ":" + interpolated + ";";
						break;
					default:
						if (key === "undefined") console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
						string += key + "{" + interpolated + "}";
				}
			}
		}
	}
	return string;
}
var labelPattern = /label:\s*([^\s;{]+)\s*(;|$)/g;
var cursor;
function serializeStyles(args, registered, mergedProps) {
	if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) return args[0];
	var stringMode = true;
	var styles = "";
	cursor = void 0;
	var strings = args[0];
	if (strings == null || strings.raw === void 0) {
		stringMode = false;
		styles += handleInterpolation(mergedProps, registered, strings);
	} else {
		var asTemplateStringsArr = strings;
		if (asTemplateStringsArr[0] === void 0) console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
		styles += asTemplateStringsArr[0];
	}
	for (var i = 1; i < args.length; i++) {
		styles += handleInterpolation(mergedProps, registered, args[i]);
		if (stringMode) {
			var templateStringsArr = strings;
			if (templateStringsArr[i] === void 0) console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
			styles += templateStringsArr[i];
		}
	}
	labelPattern.lastIndex = 0;
	var identifierName = "";
	var match;
	while ((match = labelPattern.exec(styles)) !== null) identifierName += "-" + match[1];
	return {
		name: murmur2(styles) + identifierName,
		styles,
		next: cursor,
		toString: function toString() {
			return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
		}
	};
}
//#endregion
//#region node_modules/@emotion/utils/dist/emotion-utils.browser.esm.js
function getRegisteredStyles(registered, registeredStyles, classNames) {
	var rawClassName = "";
	classNames.split(" ").forEach(function(className) {
		if (registered[className] !== void 0) registeredStyles.push(registered[className] + ";");
		else if (className) rawClassName += className + " ";
	});
	return rawClassName;
}
var registerStyles = function registerStyles(cache, serialized, isStringTag) {
	var className = cache.key + "-" + serialized.name;
	if ((isStringTag === false || false) && cache.registered[className] === void 0) cache.registered[className] = serialized.styles;
};
var insertStyles = function insertStyles(cache, serialized, isStringTag) {
	registerStyles(cache, serialized, isStringTag);
	var className = cache.key + "-" + serialized.name;
	if (cache.inserted[serialized.name] === void 0) {
		var current = serialized;
		do {
			cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
			current = current.next;
		} while (current !== void 0);
	}
};
var THEME_DEFAULT = `kui-theme`;
var SCHEME_AUTO = `kui-scheme--auto`;
var SCHEME_LIGHT = `kui-scheme--light`;
var SCHEME_DARK = `kui-scheme--dark`;
//#endregion
//#region node_modules/emery/assertions/dist/emery-assertions.esm.js
/**
* Asserts that a condition is `true`, ensuring that whatever condition is being
* checked must be true for the remainder of the containing scope.
*
* @throws when the condition is `false`
*/
function assert(condition) {
	var message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Assert failed";
	if (!condition) throw new TypeError(message);
}
/**
* Asserts that allegedly unreachable code has been executed.
*
* @throws always
*/
function assertNever(arg) {
	throw new Error("Expected never to be called, but received: " + JSON.stringify(arg));
}
/**
* Similar to `assert` but only logs a warning if the condition is not met. Only
* logs in development.
*/
function warning(condition, message) {
	if (condition) return;
	var text = "Warning: ".concat(message);
	if (typeof console !== "undefined") console.warn(text);
	try {
		throw Error(text);
	} catch (x) {}
}
Number.isFinite;
/** Checks whether a number is an integer */
var isInteger = Number.isInteger;
//#endregion
//#region node_modules/emery/guards/dist/emery-guards.esm.js
/** Checks whether a value is a number */
function isNumber(value) {
	return typeof value === "number" && !isNaN(value);
}
/** Checks whether a value is a string */
function isString(value) {
	return typeof value === "string";
}
/** Checks whether a value is null or undefined */
function isNullish(value) {
	return value === null || value === void 0;
}
/** Checks whether a value is defined */
function isDefined(value) {
	return !isNullish(value);
}
//#endregion
//#region node_modules/emery/dist/object-bfe68c26.esm.js
/**
* An alternative to `Object.entries()` that avoids type widening.
*
* @example
* Object.entries({ foo: 1, bar: 2 }) // [string, number][]
* typedEntries({ foo: 1, bar: 2 }) // ["foo" | "bar", number][]
*/
function typedEntries(value) {
	return Object.entries(value);
}
/**
* An alternative to `Object.keys()` that avoids type widening.
*
* @example
* Object.keys({ foo: 1, bar: 2 }) // string[]
* typedKeys({ foo: 1, bar: 2 }) // ("foo" | "bar")[]
*/
function typedKeys(value) {
	return Object.keys(value);
}
//#endregion
//#region node_modules/facepaint/dist/index.es.js
var index = function(breakpoints) {
	var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, literal = _ref.literal, overlap = _ref.overlap;
	var mq = literal ? breakpoints : ["&"].concat(breakpoints);
	function flatten(obj) {
		if (typeof obj !== "object" || obj == null) return [];
		if (Array.isArray(obj)) return obj.map(flatten);
		var slots = {};
		var objects = {};
		var props = {};
		Object.keys(obj).forEach(function(key) {
			var item = obj[key];
			if (!Array.isArray(item) && literal) item = [item];
			if ((literal || Array.isArray(item)) && key.charCodeAt(0) !== 38) {
				var prior = void 0;
				item.forEach(function(v, index) {
					if (overlap && prior === v) return;
					if (v == null) return;
					prior = v;
					if (index === 0 && !literal) props[key] = v;
					else if (slots[mq[index]] === void 0) {
						var _slots$mq$index;
						slots[mq[index]] = (_slots$mq$index = {}, _slots$mq$index[key] = v, _slots$mq$index);
					} else slots[mq[index]][key] = v;
				});
			} else if (typeof item === "object") objects[key] = flatten(item);
			else props[key] = item;
		});
		mq.forEach(function(el) {
			if (slots[el]) props[el] = slots[el];
		});
		Object.assign(props, objects);
		return props;
	}
	return function() {
		for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) values[_key] = arguments[_key];
		return values.map(flatten);
	};
};
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusWithin.mjs
function $2c9edc598a03d523$export$420e68273165f4ec(props) {
	let { isDisabled, onBlurWithin, onFocusWithin, onFocusWithinChange } = props;
	let state = (0, import_react.useRef)({ isFocusWithin: false });
	let { addGlobalListener, removeAllGlobalListeners } = $48a7d519b337145d$export$4eaf04e54aa8eed6();
	let onBlur = (0, import_react.useCallback)((e) => {
		if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
		if (state.current.isFocusWithin && !$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, e.relatedTarget)) {
			state.current.isFocusWithin = false;
			removeAllGlobalListeners();
			if (onBlurWithin) onBlurWithin(e);
			if (onFocusWithinChange) onFocusWithinChange(false);
		}
	}, [
		onBlurWithin,
		onFocusWithinChange,
		state,
		removeAllGlobalListeners
	]);
	let onSyntheticFocus = $a92dc41f639950be$export$715c682d09d639cc(onBlur);
	let onFocus = (0, import_react.useCallback)((e) => {
		if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
		let eventTarget = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(eventTarget);
		const activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument);
		if (!state.current.isFocusWithin && activeElement === eventTarget) {
			if (onFocusWithin) onFocusWithin(e);
			if (onFocusWithinChange) onFocusWithinChange(true);
			state.current.isFocusWithin = true;
			onSyntheticFocus(e);
			let currentTarget = e.currentTarget;
			addGlobalListener(ownerDocument, "focus", (e) => {
				let eventTarget = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
				if (state.current.isFocusWithin && !$23f2114a1b82827e$export$4282f70798064fe0(currentTarget, eventTarget)) {
					let nativeEvent = new ownerDocument.defaultView.FocusEvent("blur", { relatedTarget: eventTarget });
					$a92dc41f639950be$export$c2b7abe5d61ec696(nativeEvent, currentTarget);
					let event = $a92dc41f639950be$export$525bc4921d56d4a(nativeEvent);
					onBlur(event);
				}
			}, { capture: true });
		}
	}, [
		onFocusWithin,
		onFocusWithinChange,
		onSyntheticFocus,
		addGlobalListener,
		onBlur
	]);
	if (isDisabled) return { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} };
	return { focusWithinProps: {
		onFocus,
		onBlur
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/useFocusRing.mjs
function $0c4a58759813079a$export$4e328f61c538687f(props = {}) {
	let { autoFocus = false, isTextInput, within } = props;
	let state = (0, import_react.useRef)({
		isFocused: false,
		isFocusVisible: autoFocus || $8f5a2122b0992be3$export$b9b3dfddab17db27()
	});
	let [isFocused, setFocused] = (0, import_react.useState)(false);
	let [isFocusVisibleState, setFocusVisible] = (0, import_react.useState)(() => state.current.isFocused && state.current.isFocusVisible);
	let updateState = (0, import_react.useCallback)(() => setFocusVisible(state.current.isFocused && state.current.isFocusVisible), []);
	let onFocusChange = (0, import_react.useCallback)((isFocused) => {
		state.current.isFocused = isFocused;
		state.current.isFocusVisible = $8f5a2122b0992be3$export$b9b3dfddab17db27();
		setFocused(isFocused);
		updateState();
	}, [updateState]);
	$8f5a2122b0992be3$export$ec71b4b83ac08ec3((isFocusVisible) => {
		state.current.isFocusVisible = isFocusVisible;
		updateState();
	}, [isTextInput, isFocused], {
		enabled: isFocused,
		isTextInput
	});
	let { focusProps } = $1e74c67db218ce67$export$f8168d8dd8fd66e6({
		isDisabled: within,
		onFocusChange
	});
	let { focusWithinProps } = $2c9edc598a03d523$export$420e68273165f4ec({
		isDisabled: !within,
		onFocusWithinChange: onFocusChange
	});
	return {
		isFocused,
		isFocusVisible: isFocusVisibleState,
		focusProps: within ? focusWithinProps : focusProps
	};
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-style.js
function insertWithoutScoping(cache, serialized) {
	if (cache.inserted[serialized.name] === void 0) return cache.insert("", serialized, cache.sheet, true);
}
function merge(registered, css, className) {
	const registeredStyles = [];
	const rawClassName = getRegisteredStyles(registered, registeredStyles, className);
	if (registeredStyles.length < 2) return className;
	return rawClassName + css(registeredStyles);
}
var createEmotion = (options) => {
	let cache = createCache(options);
	cache.sheet.speedy = function(value) {
		this.isSpeedy = value;
	};
	cache.compat = true;
	let css = (...args) => {
		let serialized = serializeStyles(args, cache.registered, void 0);
		insertStyles(cache, serialized, false);
		return `${cache.key}-${serialized.name}`;
	};
	let keyframes = (...args) => {
		let serialized = serializeStyles(args, cache.registered);
		let animation = `animation-${serialized.name}`;
		insertWithoutScoping(cache, {
			name: serialized.name,
			styles: `@keyframes ${animation}{${serialized.styles}}`
		});
		return animation;
	};
	let injectGlobal = (...args) => {
		let serialized = serializeStyles(args, cache.registered);
		insertWithoutScoping(cache, serialized);
	};
	let cx = (...args) => {
		return merge(cache.registered, css, classnames(args));
	};
	return {
		css,
		cx,
		injectGlobal,
		keyframes,
		hydrate(ids) {
			ids.forEach((key) => {
				cache.inserted[key] = true;
			});
		},
		flush() {
			cache.registered = {};
			cache.inserted = {};
			cache.sheet.flush();
		},
		sheet: cache.sheet,
		cache,
		getRegisteredStyles: getRegisteredStyles.bind(null, cache.registered),
		merge: merge.bind(null, cache.registered, css)
	};
};
var classnames = (args) => {
	let cls = "";
	for (let i = 0; i < args.length; i++) {
		let arg = args[i];
		if (arg == null) continue;
		let toAdd;
		switch (typeof arg) {
			case "boolean": break;
			case "object":
				if (Array.isArray(arg)) toAdd = classnames(arg);
				else {
					toAdd = "";
					for (const k in arg) if (arg[k] && k) {
						toAdd && (toAdd += " ");
						toAdd += k;
					}
				}
				break;
			default: toAdd = arg;
		}
		if (toAdd) {
			cls && (cls += " ");
			cls += toAdd;
		}
	}
	return cls;
};
var { cx, css, keyframes, injectGlobal, cache } = createEmotion({ key: "kui" });
/**
* Do not edit directly
* Generated on Fri, 03 Nov 2023 05:52:12 GMT
*/
var tokenSchema = {
	animation: {
		duration: {
			short: "var(--kui-animation-duration-short)",
			regular: "var(--kui-animation-duration-regular)",
			long: "var(--kui-animation-duration-long)",
			xlong: "var(--kui-animation-duration-xlong)"
		},
		easing: {
			easeInOut: "var(--kui-animation-easing-ease-in-out)",
			easeIn: "var(--kui-animation-easing-ease-in)",
			easeOut: "var(--kui-animation-easing-ease-out)"
		}
	},
	size: {
		alias: {
			focusRing: "var(--kui-size-alias-focus-ring)",
			focusRingGap: "var(--kui-size-alias-focus-ring-gap)",
			singleLineHeight: "var(--kui-size-alias-single-line-height)",
			singleLineWidth: "var(--kui-size-alias-single-line-width)"
		},
		element: {
			xsmall: "var(--kui-size-element-xsmall)",
			small: "var(--kui-size-element-small)",
			regular: "var(--kui-size-element-regular)",
			medium: "var(--kui-size-element-medium)",
			large: "var(--kui-size-element-large)",
			xlarge: "var(--kui-size-element-xlarge)"
		},
		icon: {
			small: "var(--kui-size-icon-small)",
			regular: "var(--kui-size-icon-regular)",
			medium: "var(--kui-size-icon-medium)",
			large: "var(--kui-size-icon-large)"
		},
		container: {
			xsmall: "var(--kui-size-container-xsmall)",
			small: "var(--kui-size-container-small)",
			medium: "var(--kui-size-container-medium)",
			large: "var(--kui-size-container-large)",
			xlarge: "var(--kui-size-container-xlarge)"
		},
		dialog: {
			xsmall: "var(--kui-size-dialog-xsmall)",
			small: "var(--kui-size-dialog-small)",
			medium: "var(--kui-size-dialog-medium)",
			large: "var(--kui-size-dialog-large)"
		},
		border: {
			regular: "var(--kui-size-border-regular)",
			medium: "var(--kui-size-border-medium)",
			large: "var(--kui-size-border-large)"
		},
		radius: {
			full: "var(--kui-size-radius-full)",
			xsmall: "var(--kui-size-radius-xsmall)",
			small: "var(--kui-size-radius-small)",
			regular: "var(--kui-size-radius-regular)",
			medium: "var(--kui-size-radius-medium)",
			large: "var(--kui-size-radius-large)",
			xlarge: "var(--kui-size-radius-xlarge)"
		},
		shadow: {
			small: "var(--kui-size-shadow-small)",
			medium: "var(--kui-size-shadow-medium)",
			large: "var(--kui-size-shadow-large)"
		},
		space: {
			xsmall: "var(--kui-size-space-xsmall)",
			small: "var(--kui-size-space-small)",
			regular: "var(--kui-size-space-regular)",
			medium: "var(--kui-size-space-medium)",
			large: "var(--kui-size-space-large)",
			xlarge: "var(--kui-size-space-xlarge)",
			xxlarge: "var(--kui-size-space-xxlarge)"
		},
		scale: {
			"0": "var(--kui-size-scale-0)",
			"10": "var(--kui-size-scale-10)",
			"25": "var(--kui-size-scale-25)",
			"40": "var(--kui-size-scale-40)",
			"50": "var(--kui-size-scale-50)",
			"65": "var(--kui-size-scale-65)",
			"75": "var(--kui-size-scale-75)",
			"85": "var(--kui-size-scale-85)",
			"100": "var(--kui-size-scale-100)",
			"115": "var(--kui-size-scale-115)",
			"125": "var(--kui-size-scale-125)",
			"130": "var(--kui-size-scale-130)",
			"150": "var(--kui-size-scale-150)",
			"160": "var(--kui-size-scale-160)",
			"175": "var(--kui-size-scale-175)",
			"200": "var(--kui-size-scale-200)",
			"225": "var(--kui-size-scale-225)",
			"250": "var(--kui-size-scale-250)",
			"275": "var(--kui-size-scale-275)",
			"300": "var(--kui-size-scale-300)",
			"325": "var(--kui-size-scale-325)",
			"350": "var(--kui-size-scale-350)",
			"400": "var(--kui-size-scale-400)",
			"450": "var(--kui-size-scale-450)",
			"500": "var(--kui-size-scale-500)",
			"550": "var(--kui-size-scale-550)",
			"600": "var(--kui-size-scale-600)",
			"675": "var(--kui-size-scale-675)",
			"700": "var(--kui-size-scale-700)",
			"800": "var(--kui-size-scale-800)",
			"900": "var(--kui-size-scale-900)",
			"1000": "var(--kui-size-scale-1000)",
			"1200": "var(--kui-size-scale-1200)",
			"1250": "var(--kui-size-scale-1250)",
			"1600": "var(--kui-size-scale-1600)",
			"1700": "var(--kui-size-scale-1700)",
			"2000": "var(--kui-size-scale-2000)",
			"2400": "var(--kui-size-scale-2400)",
			"3000": "var(--kui-size-scale-3000)",
			"3400": "var(--kui-size-scale-3400)",
			"3600": "var(--kui-size-scale-3600)",
			"4600": "var(--kui-size-scale-4600)",
			"5000": "var(--kui-size-scale-5000)",
			"6000": "var(--kui-size-scale-6000)"
		}
	},
	typography: {
		fontFamily: {
			base: "var(--kui-typography-font-family-base)",
			code: "var(--kui-typography-font-family-code)"
		},
		fontWeight: {
			regular: "var(--kui-typography-font-weight-regular)",
			medium: "var(--kui-typography-font-weight-medium)",
			semibold: "var(--kui-typography-font-weight-semibold)",
			bold: "var(--kui-typography-font-weight-bold)"
		},
		lineheight: {
			large: "var(--kui-typography-lineheight-large)",
			medium: "var(--kui-typography-lineheight-medium)",
			small: "var(--kui-typography-lineheight-small)"
		},
		text: {
			small: {
				size: "var(--kui-typography-text-small-size)",
				lineheight: "var(--kui-typography-text-small-lineheight)",
				baselineTrim: "var(--kui-typography-text-small-baseline-trim)",
				capheightTrim: "var(--kui-typography-text-small-capheight-trim)",
				capheight: "var(--kui-typography-text-small-capheight)"
			},
			regular: {
				size: "var(--kui-typography-text-regular-size)",
				lineheight: "var(--kui-typography-text-regular-lineheight)",
				baselineTrim: "var(--kui-typography-text-regular-baseline-trim)",
				capheightTrim: "var(--kui-typography-text-regular-capheight-trim)",
				capheight: "var(--kui-typography-text-regular-capheight)"
			},
			medium: {
				size: "var(--kui-typography-text-medium-size)",
				lineheight: "var(--kui-typography-text-medium-lineheight)",
				baselineTrim: "var(--kui-typography-text-medium-baseline-trim)",
				capheightTrim: "var(--kui-typography-text-medium-capheight-trim)",
				capheight: "var(--kui-typography-text-medium-capheight)"
			},
			large: {
				size: "var(--kui-typography-text-large-size)",
				lineheight: "var(--kui-typography-text-large-lineheight)",
				baselineTrim: "var(--kui-typography-text-large-baseline-trim)",
				capheightTrim: "var(--kui-typography-text-large-capheight-trim)",
				capheight: "var(--kui-typography-text-large-capheight)"
			}
		},
		heading: {
			small: {
				size: "var(--kui-typography-heading-small-size)",
				lineheight: "var(--kui-typography-heading-small-lineheight)",
				baselineTrim: "var(--kui-typography-heading-small-baseline-trim)",
				capheightTrim: "var(--kui-typography-heading-small-capheight-trim)",
				capheight: "var(--kui-typography-heading-small-capheight)"
			},
			regular: {
				size: "var(--kui-typography-heading-regular-size)",
				lineheight: "var(--kui-typography-heading-regular-lineheight)",
				baselineTrim: "var(--kui-typography-heading-regular-baseline-trim)",
				capheightTrim: "var(--kui-typography-heading-regular-capheight-trim)",
				capheight: "var(--kui-typography-heading-regular-capheight)"
			},
			medium: {
				size: "var(--kui-typography-heading-medium-size)",
				lineheight: "var(--kui-typography-heading-medium-lineheight)",
				baselineTrim: "var(--kui-typography-heading-medium-baseline-trim)",
				capheightTrim: "var(--kui-typography-heading-medium-capheight-trim)",
				capheight: "var(--kui-typography-heading-medium-capheight)"
			},
			large: {
				size: "var(--kui-typography-heading-large-size)",
				lineheight: "var(--kui-typography-heading-large-lineheight)",
				baselineTrim: "var(--kui-typography-heading-large-baseline-trim)",
				capheightTrim: "var(--kui-typography-heading-large-capheight-trim)",
				capheight: "var(--kui-typography-heading-large-capheight)"
			}
		}
	},
	color: {
		alias: {
			blanket: "var(--kui-color-alias-blanket)",
			backgroundIdle: "var(--kui-color-alias-background-idle)",
			backgroundDisabled: "var(--kui-color-alias-background-disabled)",
			backgroundHovered: "var(--kui-color-alias-background-hovered)",
			backgroundFocused: "var(--kui-color-alias-background-focused)",
			backgroundPressed: "var(--kui-color-alias-background-pressed)",
			backgroundSelected: "var(--kui-color-alias-background-selected)",
			backgroundSelectedHovered: "var(--kui-color-alias-background-selected-hovered)",
			focusRing: "var(--kui-color-alias-focus-ring)",
			borderIdle: "var(--kui-color-alias-border-idle)",
			borderHovered: "var(--kui-color-alias-border-hovered)",
			borderPressed: "var(--kui-color-alias-border-pressed)",
			borderFocused: "var(--kui-color-alias-border-focused)",
			borderDisabled: "var(--kui-color-alias-border-disabled)",
			borderSelected: "var(--kui-color-alias-border-selected)",
			borderInvalid: "var(--kui-color-alias-border-invalid)",
			foregroundIdle: "var(--kui-color-alias-foreground-idle)",
			foregroundHovered: "var(--kui-color-alias-foreground-hovered)",
			foregroundPressed: "var(--kui-color-alias-foreground-pressed)",
			foregroundFocused: "var(--kui-color-alias-foreground-focused)",
			foregroundDisabled: "var(--kui-color-alias-foreground-disabled)",
			foregroundSelected: "var(--kui-color-alias-foreground-selected)"
		},
		background: {
			canvas: "var(--kui-color-background-canvas)",
			surface: "var(--kui-color-background-surface)",
			surfaceSecondary: "var(--kui-color-background-surface-secondary)",
			surfaceTertiary: "var(--kui-color-background-surface-tertiary)",
			inverse: "var(--kui-color-background-inverse)",
			accent: "var(--kui-color-background-accent)",
			accentEmphasis: "var(--kui-color-background-accent-emphasis)",
			positive: "var(--kui-color-background-positive)",
			positiveEmphasis: "var(--kui-color-background-positive-emphasis)",
			caution: "var(--kui-color-background-caution)",
			cautionEmphasis: "var(--kui-color-background-caution-emphasis)",
			critical: "var(--kui-color-background-critical)",
			criticalEmphasis: "var(--kui-color-background-critical-emphasis)",
			pending: "var(--kui-color-background-pending)",
			pendingEmphasis: "var(--kui-color-background-pending-emphasis)",
			highlight: "var(--kui-color-background-highlight)",
			highlightEmphasis: "var(--kui-color-background-highlight-emphasis)"
		},
		border: {
			muted: "var(--kui-color-border-muted)",
			neutral: "var(--kui-color-border-neutral)",
			emphasis: "var(--kui-color-border-emphasis)",
			accent: "var(--kui-color-border-accent)",
			positive: "var(--kui-color-border-positive)",
			caution: "var(--kui-color-border-caution)",
			critical: "var(--kui-color-border-critical)",
			pending: "var(--kui-color-border-pending)",
			highlight: "var(--kui-color-border-highlight)"
		},
		foreground: {
			neutral: "var(--kui-color-foreground-neutral)",
			neutralEmphasis: "var(--kui-color-foreground-neutral-emphasis)",
			neutralSecondary: "var(--kui-color-foreground-neutral-secondary)",
			neutralTertiary: "var(--kui-color-foreground-neutral-tertiary)",
			onEmphasis: "var(--kui-color-foreground-on-emphasis)",
			inverse: "var(--kui-color-foreground-inverse)",
			inverseSecondary: "var(--kui-color-foreground-inverse-secondary)",
			accent: "var(--kui-color-foreground-accent)",
			positive: "var(--kui-color-foreground-positive)",
			caution: "var(--kui-color-foreground-caution)",
			critical: "var(--kui-color-foreground-critical)",
			pending: "var(--kui-color-foreground-pending)",
			highlight: "var(--kui-color-foreground-highlight)"
		},
		shadow: {
			muted: "var(--kui-color-shadow-muted)",
			regular: "var(--kui-color-shadow-regular)",
			emphasis: "var(--kui-color-shadow-emphasis)"
		},
		scale: {
			black: "var(--kui-color-scale-black)",
			white: "var(--kui-color-scale-white)",
			amber1: "var(--kui-color-scale-amber1)",
			amber2: "var(--kui-color-scale-amber2)",
			amber3: "var(--kui-color-scale-amber3)",
			amber4: "var(--kui-color-scale-amber4)",
			amber5: "var(--kui-color-scale-amber5)",
			amber6: "var(--kui-color-scale-amber6)",
			amber7: "var(--kui-color-scale-amber7)",
			amber8: "var(--kui-color-scale-amber8)",
			amber9: "var(--kui-color-scale-amber9)",
			amber10: "var(--kui-color-scale-amber10)",
			amber11: "var(--kui-color-scale-amber11)",
			green1: "var(--kui-color-scale-green1)",
			green2: "var(--kui-color-scale-green2)",
			green3: "var(--kui-color-scale-green3)",
			green4: "var(--kui-color-scale-green4)",
			green5: "var(--kui-color-scale-green5)",
			green6: "var(--kui-color-scale-green6)",
			green7: "var(--kui-color-scale-green7)",
			green8: "var(--kui-color-scale-green8)",
			green9: "var(--kui-color-scale-green9)",
			green10: "var(--kui-color-scale-green10)",
			green11: "var(--kui-color-scale-green11)",
			indigo1: "var(--kui-color-scale-indigo1)",
			indigo2: "var(--kui-color-scale-indigo2)",
			indigo3: "var(--kui-color-scale-indigo3)",
			indigo4: "var(--kui-color-scale-indigo4)",
			indigo5: "var(--kui-color-scale-indigo5)",
			indigo6: "var(--kui-color-scale-indigo6)",
			indigo7: "var(--kui-color-scale-indigo7)",
			indigo8: "var(--kui-color-scale-indigo8)",
			indigo9: "var(--kui-color-scale-indigo9)",
			indigo10: "var(--kui-color-scale-indigo10)",
			indigo11: "var(--kui-color-scale-indigo11)",
			pink1: "var(--kui-color-scale-pink1)",
			pink2: "var(--kui-color-scale-pink2)",
			pink3: "var(--kui-color-scale-pink3)",
			pink4: "var(--kui-color-scale-pink4)",
			pink5: "var(--kui-color-scale-pink5)",
			pink6: "var(--kui-color-scale-pink6)",
			pink7: "var(--kui-color-scale-pink7)",
			pink8: "var(--kui-color-scale-pink8)",
			pink9: "var(--kui-color-scale-pink9)",
			pink10: "var(--kui-color-scale-pink10)",
			pink11: "var(--kui-color-scale-pink11)",
			purple1: "var(--kui-color-scale-purple1)",
			purple2: "var(--kui-color-scale-purple2)",
			purple3: "var(--kui-color-scale-purple3)",
			purple4: "var(--kui-color-scale-purple4)",
			purple5: "var(--kui-color-scale-purple5)",
			purple6: "var(--kui-color-scale-purple6)",
			purple7: "var(--kui-color-scale-purple7)",
			purple8: "var(--kui-color-scale-purple8)",
			purple9: "var(--kui-color-scale-purple9)",
			purple10: "var(--kui-color-scale-purple10)",
			purple11: "var(--kui-color-scale-purple11)",
			red1: "var(--kui-color-scale-red1)",
			red2: "var(--kui-color-scale-red2)",
			red3: "var(--kui-color-scale-red3)",
			red4: "var(--kui-color-scale-red4)",
			red5: "var(--kui-color-scale-red5)",
			red6: "var(--kui-color-scale-red6)",
			red7: "var(--kui-color-scale-red7)",
			red8: "var(--kui-color-scale-red8)",
			red9: "var(--kui-color-scale-red9)",
			red10: "var(--kui-color-scale-red10)",
			red11: "var(--kui-color-scale-red11)",
			slate1: "var(--kui-color-scale-slate1)",
			slate2: "var(--kui-color-scale-slate2)",
			slate3: "var(--kui-color-scale-slate3)",
			slate4: "var(--kui-color-scale-slate4)",
			slate5: "var(--kui-color-scale-slate5)",
			slate6: "var(--kui-color-scale-slate6)",
			slate7: "var(--kui-color-scale-slate7)",
			slate8: "var(--kui-color-scale-slate8)",
			slate9: "var(--kui-color-scale-slate9)",
			slate10: "var(--kui-color-scale-slate10)",
			slate11: "var(--kui-color-scale-slate11)"
		}
	}
};
/** Helper function for resolving animation tokens.  */
function transition(prop, options = {}) {
	let { delay = 0, duration = "short", easing = "easeInOut" } = options;
	let easingValue = easing === "linear" ? "linear" : tokenSchema.animation.easing[easing];
	let durationValue = resolveDuration(duration);
	if (Array.isArray(prop)) return prop.map((p) => transition(p, options)).join(", ");
	return `${prop} ${durationValue} ${easingValue}` + (delay ? ` ${resolveDuration(delay)}` : "");
}
function resolveDuration(duration) {
	return isNumber(duration) ? `${duration}ms` : tokenSchema.animation.duration[duration];
}
var classNamePrefix = "kui";
var resetClassName = voussoirClassName("reset");
function voussoirClassName(className) {
	return `${classNamePrefix}:${className}`;
}
/**
* A thin wrapper around [Emotion's `cx`
* function](https://emotion.sh/docs/@emotion/css#cx) that includes the reset
* class name.
*/
function classNames(...inputs) {
	let resolved = cx(inputs);
	if (resolved.includes(resetClassName)) return resolved;
	return cx(resetClassName, resolved);
}
/**
* A ClassList organises component class names with appropriate prefixes,
* offering strongly-typed methods for declaration in JSX and styles.
*/
var ClassList = class {
	/** The component name for this class list. */
	#componentName;
	/** The root class name. */
	#root;
	/** The list of element class names. */
	#elements;
	constructor(componentName, elements = []) {
		this.#componentName = componentName;
		this.#root = voussoirClassName(componentName);
		this.#elements = new Map(elements.map((element) => [element, `${this.#root}-${element}`]));
	}
	element(name) {
		if (name === "root") return this.#root;
		let className = this.#elements.get(name);
		assert(!!className, `Element "${name}" not found in "${this.#componentName}" class list. All elements must be defined when the ClassList is instantiated.`);
		return className;
	}
	selector(element, combinator) {
		let className = this.element(element);
		if (!combinator) return safeClassName(className);
		return combinators[combinator] + safeClassName(className);
	}
};
function safeClassName(className) {
	return `.${className.replace(/:/g, "\\:")}`;
}
var combinators = {
	descendant: "& ",
	child: "& > ",
	sibling: "& ~ ",
	"adjacent-sibling": "& + "
};
var breakpoints = {
	mobile: 0,
	tablet: 740,
	desktop: 992,
	wide: 1200
};
var mediaAbove = (bp) => `@media (min-width: ${bp}px)`;
var mediaBelow = (bp) => `@media (max-width: ${bp - 1}px)`;
var containerAbove = (bp) => `@container (min-width: ${bp}px)`;
var containerBelow = (bp) => `@container (max-width: ${bp - 1}px)`;
var breakpointQueries$1 = {
	above: {
		mobile: mediaAbove(breakpoints.tablet),
		tablet: mediaAbove(breakpoints.desktop),
		desktop: mediaAbove(breakpoints.wide)
	},
	below: {
		tablet: mediaBelow(breakpoints.tablet),
		desktop: mediaBelow(breakpoints.desktop),
		wide: mediaBelow(breakpoints.wide)
	}
};
var containerQueries = {
	above: {
		mobile: containerAbove(breakpoints.tablet),
		tablet: containerAbove(breakpoints.desktop),
		desktop: containerAbove(breakpoints.wide)
	},
	below: {
		tablet: containerBelow(breakpoints.tablet),
		desktop: containerBelow(breakpoints.desktop),
		wide: containerBelow(breakpoints.wide)
	}
};
var breakpointNames = typedKeys(breakpoints);
var { mobile: _mobile$1, ...breakpointsWithoutMobile$1 } = breakpoints;
var mapToMediaQueries = index(Object.values(breakpointsWithoutMobile$1).map(mediaAbove));
function mapResponsiveValue(propResolver, value) {
	if (value == null) return null;
	if (typeof value === "object" && !Array.isArray(value)) return objectToArray(propResolver, value);
	return propResolver(value);
}
function objectToArray(propResolver, value) {
	const valueArray = [];
	for (let i = 0; i < breakpointNames.length; i++) {
		const key = breakpointNames[i];
		valueArray.push(value[key] != null ? propResolver(value[key]) : null);
	}
	return valueArray;
}
function getResponsiveProp(prop, matchedBreakpoints) {
	if (typeof prop === "object" && prop !== null) {
		for (let i = 0; i < matchedBreakpoints.length; i++) {
			let value = prop[matchedBreakpoints[i]];
			if (value != null) return value;
		}
		return prop.mobile;
	}
	return prop;
}
function getResponsiveRange(range, matchedBreakpoints) {
	if (typeof range === "boolean") return range;
	if (!("above" in range) && !("below" in range)) return getResponsiveProp(range, matchedBreakpoints);
	const startIndex = "above" in range ? breakpointNames.indexOf(range.above) + 1 : 0;
	const endIndex = "below" in range ? breakpointNames.indexOf(range.below) - 1 : breakpointNames.length - 1;
	return getResponsiveProp(Object.fromEntries(breakpointNames.map((key, index) => {
		return [key, index >= startIndex && index <= endIndex];
	})), matchedBreakpoints);
}
var BreakpointContext = /*#__PURE__*/ import_react.createContext(["mobile"]);
function BreakpointProvider(props) {
	const $ = c(3);
	const { children, value } = props;
	let t0;
	if ($[0] !== value || $[1] !== children) {
		t0 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(BreakpointContext.Provider, {
			value,
			children
		});
		$[0] = value;
		$[1] = children;
		$[2] = t0;
	} else t0 = $[2];
	return t0;
}
function useBreakpoint() {
	return (0, import_react.useContext)(BreakpointContext);
}
var { mobile: _mobile, ...breakpointsWithoutMobile } = breakpoints;
var breakpointEntries = typedEntries(breakpointsWithoutMobile).sort(([, valueA], [, valueB]) => valueB - valueA);
var breakpointQueries = breakpointEntries.map(([, value]) => `(min-width: ${value}px)`);
function useMatchedBreakpoints() {
	const $ = c(4);
	const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => {
			const matched = [];
			for (const i in breakpointQueries) {
				const query = breakpointQueries[i];
				if (window.matchMedia(query).matches) matched.push(breakpointEntries[i][0]);
			}
			matched.push("mobile");
			return matched;
		};
		$[0] = t0;
	} else t0 = $[0];
	const getMatchedBreakpoints = t0;
	let t1;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = () => supportsMatchMedia ? getMatchedBreakpoints() : ["mobile"];
		$[1] = t1;
	} else t1 = $[1];
	const [breakpoint, setBreakpoint] = (0, import_react.useState)(t1);
	let t2;
	let t3;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = () => {
			if (!supportsMatchMedia) return;
			const onResize = () => {
				const matched_0 = getMatchedBreakpoints();
				setBreakpoint((prevMatched) => {
					if (prevMatched.length !== matched_0.length || prevMatched.some((breakpoint_0, idx) => breakpoint_0 !== matched_0[idx])) return matched_0;
					return prevMatched;
				});
			};
			onResize();
			window.addEventListener("resize", onResize);
			return () => {
				window.removeEventListener("resize", onResize);
			};
		};
		t3 = [supportsMatchMedia];
		$[2] = t2;
		$[3] = t3;
	} else {
		t2 = $[2];
		t3 = $[3];
	}
	(0, import_react.useLayoutEffect)(t2, t3);
	return breakpoint;
}
function useResponsiveRange() {
	const $ = c(2);
	const matchedBreakpoints = useBreakpoint();
	let t0;
	if ($[0] !== matchedBreakpoints) {
		t0 = function responsiveRange(range) {
			return getResponsiveRange(range, matchedBreakpoints);
		};
		$[0] = matchedBreakpoints;
		$[1] = t0;
	} else t0 = $[1];
	return t0;
}
function get(val, path) {
	for (const part of path.split(".")) {
		if (typeof val !== "object" || val === null || !Object.prototype.hasOwnProperty.call(val, part)) return;
		val = val[part];
	}
	return val;
}
function maybeTokenByKey(path, keyOrValue) {
	var _get;
	if (typeof keyOrValue !== "string") return keyOrValue;
	path = keyOrValue.includes(".") ? keyOrValue : `${path}.${keyOrValue}`;
	return (_get = get(tokenSchema, path)) !== null && _get !== void 0 ? _get : keyOrValue;
}
function resolvePropWithPath(prop, path) {
	const resolver = (value) => maybeTokenByKey(path, value);
	return [prop, resolver];
}
var identity = (value) => value;
function resolveProp(prop, fn = identity) {
	return [prop, fn];
}
function border(prop) {
	const resolver = (value) => {
		const color = maybeTokenByKey("color.border", value);
		return `${tokenSchema.size.border.regular} solid ${color}`;
	};
	return [prop, resolver];
}
function isDimensionKey(value) {
	let [prop, key] = value.split(".");
	if (!prop || !key) return false;
	return !!tokenSchema.size[prop][key];
}
function sizeResolver(value) {
	if (typeof value === "number") {
		if (value === 0) return `${value}px`;
		assertNever(value);
	}
	if (isDimensionKey(value)) {
		let [prop, key] = value.split(".");
		return tokenSchema.size[prop][key];
	}
	if (value === "auto" || value === "inherit" || value === "100%" || value === "100vh" || value === "100vw") return value;
	assertNever(value);
}
function size(cssProp) {
	return [cssProp, sizeResolver];
}
function space(prop) {
	return resolvePropWithPath(prop, "size.space");
}
function radius(prop) {
	return resolvePropWithPath(prop, "size.radius");
}
var defaultStyleProps = {
	backgroundColor: resolvePropWithPath("backgroundColor", "color.background"),
	boxShadow: ["boxShadow", boxShadowResolver],
	height: size("height"),
	maxHeight: size("maxHeight"),
	minHeight: size("minHeight"),
	maxWidth: size("maxWidth"),
	minWidth: size("minWidth"),
	width: size("width"),
	margin: space("margin"),
	marginStart: space("marginInlineStart"),
	marginEnd: space("marginInlineEnd"),
	marginTop: space("marginBlockStart"),
	marginBottom: space("marginBlockEnd"),
	marginX: space("marginInline"),
	marginY: space("marginBlock"),
	padding: space("padding"),
	paddingStart: space("paddingInlineStart"),
	paddingEnd: space("paddingInlineEnd"),
	paddingTop: space("paddingBlockStart"),
	paddingBottom: space("paddingBlockEnd"),
	paddingX: space("paddingInline"),
	paddingY: space("paddingBlock"),
	border: border("border"),
	borderStart: border("borderInlineStart"),
	borderEnd: border("borderInlineEnd"),
	borderTop: border("borderTop"),
	borderBottom: border("borderBottom"),
	borderColor: resolvePropWithPath("borderColor", "color.border"),
	borderStartColor: resolvePropWithPath("borderInlineStartColor", "color.border"),
	borderEndColor: resolvePropWithPath("borderInlineEndColor", "color.border"),
	borderTopColor: resolvePropWithPath("borderTopColor", "color.border"),
	borderBottomColor: resolvePropWithPath("borderBottomColor", "color.border"),
	borderStyle: resolveProp("borderStyle"),
	borderStartStyle: resolveProp("borderInlineStartStyle"),
	borderEndStyle: resolveProp("borderInlineEndStyle"),
	borderTopStyle: resolveProp("borderTopStyle"),
	borderBottomStyle: resolveProp("borderBottomStyle"),
	borderWidth: resolvePropWithPath("borderWidth", "size.border"),
	borderStartWidth: resolvePropWithPath("borderInlineStartWidth", "size.border"),
	borderEndWidth: resolvePropWithPath("borderInlineEndWidth", "size.border"),
	borderTopWidth: resolvePropWithPath("borderTopWidth", "size.border"),
	borderBottomWidth: resolvePropWithPath("borderBottomWidth", "size.border"),
	borderRadius: radius("borderRadius"),
	borderTopStartRadius: radius("borderStartStartRadius"),
	borderTopEndRadius: radius("borderStartEndRadius"),
	borderBottomStartRadius: radius("borderEndStartRadius"),
	borderBottomEndRadius: radius("borderEndEndRadius"),
	borderTopRadius: radius(["borderStartStartRadius", "borderStartEndRadius"]),
	borderBottomRadius: radius(["borderEndStartRadius", "borderEndEndRadius"]),
	borderStartRadius: radius(["borderStartStartRadius", "borderEndStartRadius"]),
	borderEndRadius: radius(["borderEndEndRadius", "borderStartEndRadius"]),
	inset: space("inset"),
	insetBottom: space("insetBlockEnd"),
	insetEnd: space("insetInlineEnd"),
	insetStart: space("insetInlineStart"),
	insetTop: space("insetBlockStart"),
	insetX: space("insetInline"),
	insetY: space("insetBlock"),
	position: resolveProp("position"),
	zIndex: resolveProp("zIndex"),
	order: resolveProp("order"),
	alignSelf: resolveProp("alignSelf"),
	flex: resolveProp("flex", flexResolver),
	flexBasis: size("flexBasis"),
	flexGrow: resolveProp("flexGrow", flexResolver),
	flexShrink: resolveProp("flexShrink", flexResolver),
	justifySelf: resolveProp("justifySelf"),
	gridArea: resolveProp("gridArea"),
	gridColumn: resolveProp("gridColumn"),
	gridColumnEnd: resolveProp("gridColumnEnd"),
	gridColumnStart: resolveProp("gridColumnStart"),
	gridRow: resolveProp("gridRow"),
	gridRowEnd: resolveProp("gridRowEnd"),
	gridRowStart: resolveProp("gridRowStart"),
	cursor: resolveProp("cursor"),
	opacity: resolveProp("opacity"),
	pointerEvents: resolveProp("pointerEvents"),
	overflow: resolveProp("overflow"),
	userSelect: resolveProp("userSelect")
};
function flexResolver(value) {
	if (typeof value === "boolean") return value ? "1" : void 0;
	return "" + value;
}
function boxShadowResolver(value) {
	const sizeToColorKey = {
		small: "muted",
		medium: "regular",
		large: "emphasis"
	};
	const [sizeKey, maybeColorKey] = value.split(" ");
	const color = maybeTokenByKey("color.shadow", maybeColorKey !== null && maybeColorKey !== void 0 ? maybeColorKey : sizeToColorKey[sizeKey]);
	return `${maybeTokenByKey("size.shadow", sizeKey)} ${color}`;
}
var defaultStyleKeys = Object.keys(defaultStyleProps);
/**
* Filters out style props.
* @param props - The component props to be filtered.
* @param otherPropNames - An array of other style property names that should be omitted.
*/
function filterStyleProps(props, otherPropNames = []) {
	let filteredProps = {};
	let omit = /* @__PURE__ */ new Set([
		"isHidden",
		"UNSAFE_className",
		"UNSAFE_style",
		...defaultStyleKeys,
		...otherPropNames
	]);
	for (const prop in props) if (Object.prototype.hasOwnProperty.call(props, prop) && !omit.has(prop)) filteredProps[prop] = props[prop];
	return filteredProps;
}
/**
* Filters out non-style props.
* @param props - The component props to be filtered.
*/
function onlyStyleProps(props) {
	let filteredProps = {};
	let include = /* @__PURE__ */ new Set([
		"isHidden",
		"UNSAFE_className",
		"UNSAFE_style",
		...defaultStyleKeys
	]);
	for (const prop in props) if (Object.prototype.hasOwnProperty.call(props, prop) && include.has(prop)) filteredProps[prop] = props[prop];
	return filteredProps;
}
/** Converts an object to a set of data attributes. */
function toDataAttributes(data, options = {}) {
	let dataAttributes = {};
	for (let key in data) {
		let prop = key;
		let value = data[key];
		if (value == null || options.omitFalsyValues && (value === false || value === "")) continue;
		if (options.trimBooleanKeys && key.startsWith("is")) prop = prop.charAt(2).toLowerCase() + prop.slice(3);
		prop = prop.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
		dataAttributes[`data-${prop}`] = value;
	}
	return dataAttributes;
}
/**
* A utility component for styling interactions. Applies data-attributes to the
* child element when it receives different types of focus.
*/
function FocusRing(props) {
	const $ = c(6);
	const { children } = props;
	const { isFocused, isFocusVisible, focusProps } = $0c4a58759813079a$export$4e328f61c538687f(props);
	let t0;
	if ($[0] !== children || $[1] !== isFocusVisible || $[2] !== props || $[3] !== isFocused || $[4] !== focusProps) {
		const child = import_react.Children.only(children);
		t0 = /*#__PURE__*/ (0, import_react.cloneElement)(child, $bbaa08b3cd72f041$export$9d1611c77c2fe928(child.props, {
			...focusProps,
			...toDataAttributes({ focus: isFocusVisible ? "visible" : props.within ? "within" : isFocused || void 0 })
		}));
		$[0] = children;
		$[1] = isFocusVisible;
		$[2] = props;
		$[3] = isFocused;
		$[4] = focusProps;
		$[5] = t0;
	} else t0 = $[5];
	return t0;
}
function useIsMobileDevice() {
	if ($c7eafbbe1ea5834e$export$535bd6ca7f90a273() || typeof window === "undefined") return false;
	return window.screen.width <= breakpoints.tablet;
}
/**
* React hook that listens for matches to a given media query.
* @example
* let isBelowTablet = useMediaQuery('(max-width: 768px)');
*/
function useMediaQuery(_query) {
	const $ = c(7);
	let t0;
	if ($[0] !== _query) {
		t0 = normalizeQuery(_query);
		$[0] = _query;
		$[1] = t0;
	} else t0 = $[1];
	const query = t0;
	const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
	let t1;
	if ($[2] !== query) {
		t1 = () => supportsMatchMedia ? window.matchMedia(query).matches : false;
		$[2] = query;
		$[3] = t1;
	} else t1 = $[3];
	const [matches, setMatches] = (0, import_react.useState)(t1);
	let t2;
	let t3;
	if ($[4] !== query) {
		t2 = () => {
			if (!supportsMatchMedia) return;
			const mediaQueryList = window.matchMedia(query);
			const supportsEventListener = typeof mediaQueryList.addEventListener === "function";
			const onChange = (evt) => {
				setMatches(evt.matches);
			};
			if (supportsEventListener) mediaQueryList.addEventListener("change", onChange);
			else mediaQueryList.addListener(onChange);
			return () => {
				if (supportsEventListener) mediaQueryList.removeEventListener("change", onChange);
				else mediaQueryList.removeListener(onChange);
			};
		};
		t3 = [supportsMatchMedia, query];
		$[4] = query;
		$[5] = t2;
		$[6] = t3;
	} else {
		t2 = $[5];
		t3 = $[6];
	}
	(0, import_react.useEffect)(t2, t3);
	return $c7eafbbe1ea5834e$export$535bd6ca7f90a273() ? false : matches;
}
function normalizeQuery(query) {
	return query.replace(/^@media( ?)/m, "");
}
function convertStyleProps(props, propResolvers) {
	let style = {};
	for (let key in props) {
		let styleProp = propResolvers[key];
		if (!styleProp || props[key] == null) continue;
		let [name, convert] = styleProp;
		let value = mapResponsiveValue(convert, props[key]);
		if (Array.isArray(name)) for (let k of name) style[k] = value;
		else style[name] = value;
	}
	return style;
}
function useStyleProps(props, customResolvers = {}) {
	let propResolvers = {
		...defaultStyleProps,
		...customResolvers
	};
	let { isHidden, UNSAFE_className, UNSAFE_style, ...otherProps } = props;
	let resolvedStyles = mapToMediaQueries(convertStyleProps(props, propResolvers));
	warning(!otherProps.className, "The className prop is unsafe and is unsupported. Please use style props, or UNSAFE_className if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
	warning(!otherProps.style, "The style prop is unsafe and is unsupported. Please use style props, or UNSAFE_style if you absolutely must do something custom. Note that this may break in future versions due to DOM structure changes.");
	let hiddenStyles = [];
	if (isHidden) {
		if (isHidden === true) hiddenStyles.push({ display: "none" });
		else {
			const styles = {};
			if ("above" in isHidden) styles[breakpointQueries$1.above[isHidden.above]] = { display: "none" };
			if ("below" in isHidden) styles[breakpointQueries$1.below[isHidden.below]] = { display: "none" };
			hiddenStyles.push(styles);
		}
	}
	return {
		className: classNames(css(resolvedStyles), UNSAFE_className, css(hiddenStyles)),
		style: UNSAFE_style
	};
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-utils-ts.js
/**
* This is a hack for sure. The thing is, getting a component to intelligently
* infer props based on a component or JSX string passed into an `elementType` prop is
* kind of a huge pain. Getting it to work and satisfy the constraints of
* `forwardRef` seems dang near impossible. To avoid needing to do this awkward
* type song-and-dance every time we want to forward a ref into a component
* that accepts an `elementType` prop, we abstract all of that mess to this function for
* the time time being.
*/
function forwardRefWithAs(render) {
	return /*#__PURE__*/ (0, import_react.forwardRef)(render);
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-slots.js
var SlotContext = /*#__PURE__*/ import_react.createContext({});
/**
* Merge component props with ancestral slot props. With the exception of "id",
* consumer props are overriden by slot props, while event handlers will be
* chained so all are called.
*/
function useSlotProps(props, defaultSlot) {
	let slot = props.slot || defaultSlot;
	let { [slot]: slotProps = {} } = (0, import_react.useContext)(SlotContext);
	return $bbaa08b3cd72f041$export$9d1611c77c2fe928(props, $bbaa08b3cd72f041$export$9d1611c77c2fe928(slotProps, { id: props.id }));
}
/**
* Not really "slots" like web components, more like "prop portalling" or
* something. Default and override the props of descendent components.
*
* @example
* <SlotProvider slots={{ text: { size: 'small' } }}>
*   {children}
* </SlotProvider>
*/
var SlotProvider = (props) => {
	const $ = c(6);
	const { children, slots } = props;
	const parentSlots = (0, import_react.useContext)(SlotContext);
	let t0;
	let t1;
	if ($[0] !== parentSlots || $[1] !== slots) {
		t1 = Object.keys(parentSlots).concat(Object.keys(slots)).reduce((obj, key) => ({
			...obj,
			[key]: $bbaa08b3cd72f041$export$9d1611c77c2fe928(parentSlots[key], slots[key])
		}), {});
		$[0] = parentSlots;
		$[1] = slots;
		$[2] = t1;
	} else t1 = $[2];
	t0 = t1;
	const value = t0;
	let t2;
	if ($[3] !== value || $[4] !== children) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SlotContext.Provider, {
			value,
			children
		});
		$[3] = value;
		$[4] = children;
		$[5] = t2;
	} else t2 = $[5];
	return t2;
};
var ClearSlots = (t0) => {
	const $ = c(3);
	const { children } = t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = {};
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] !== children) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SlotContext.Provider, {
			value: t1,
			children
		});
		$[1] = children;
		$[2] = t2;
	} else t2 = $[2];
	return t2;
};
/** A block of content within a container. */
var Content = forwardRefWithAs((props, ref) => {
	props = useSlotProps(props, "content");
	let { elementType: Element = "section", children, ...otherProps } = props;
	let styleProps = useStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Element, {
		...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps),
		...styleProps,
		ref,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ClearSlots, { children })
	});
});
/** A footer within a container. */
var Footer = forwardRefWithAs((props, ref) => {
	props = useSlotProps(props, "footer");
	let { elementType: Element = "footer", children, ...otherProps } = props;
	let styleProps = useStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Element, {
		...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps),
		...styleProps,
		ref,
		children
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/visually-hidden/VisuallyHidden.mjs
var $ea3928288112382f$var$styles = {
	border: 0,
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	width: "1px",
	whiteSpace: "nowrap"
};
function $ea3928288112382f$export$a966af930f325cab(props = {}) {
	let { style, isFocusable } = props;
	let [isFocused, setFocused] = (0, import_react.useState)(false);
	let { focusWithinProps } = $2c9edc598a03d523$export$420e68273165f4ec({
		isDisabled: !isFocusable,
		onFocusWithinChange: (val) => setFocused(val)
	});
	let combinedStyles = (0, import_react.useMemo)(() => {
		if (isFocused) return style;
		else if (style) return {
			...$ea3928288112382f$var$styles,
			...style
		};
		else return $ea3928288112382f$var$styles;
	}, [isFocused]);
	return { visuallyHiddenProps: {
		...focusWithinProps,
		style: combinedStyles
	} };
}
function $ea3928288112382f$export$439d29a4e110a164(props) {
	let { children, elementType: Element = "div", isFocusable, style, ...otherProps } = props;
	let { visuallyHiddenProps } = $ea3928288112382f$export$a966af930f325cab(props);
	return /*#__PURE__*/ import_react.createElement(Element, $bbaa08b3cd72f041$export$9d1611c77c2fe928(otherProps, visuallyHiddenProps), children);
}
//#endregion
//#region node_modules/@keystar/ui/dist/children-cc41db6d.js
function useHasChild(query, ref) {
	const $ = c(6);
	const [hasChild, setHasChild] = (0, import_react.useState)(true);
	let t0;
	if ($[0] !== ref.current || $[1] !== query) {
		t0 = () => {
			setHasChild(!!(ref.current && ref.current.querySelector(query)));
		};
		$[0] = ref.current;
		$[1] = query;
		$[2] = t0;
	} else t0 = $[2];
	let t1;
	if ($[3] !== query || $[4] !== ref) {
		t1 = [
			setHasChild,
			query,
			ref
		];
		$[3] = query;
		$[4] = ref;
		$[5] = t1;
	} else t1 = $[5];
	(0, import_react.useLayoutEffect)(t0, t1);
	return hasChild;
}
/**
* Clone a React element, with optional props. If the value is
* not a valid React element, return null.
*/
function cloneValidElement(child, props) {
	if (!/*#__PURE__*/ (0, import_react.isValidElement)(child)) return null;
	return /*#__PURE__*/ (0, import_react.cloneElement)(child, props);
}
//#endregion
//#region node_modules/@keystar/ui/dist/usePrevious-6abf6421.js
/**
* Tracks the previous value of a variable.
*
* This is useful for comparing the previous value of some prop or state to the
* current value, and taking action based on the change.
*/
function usePrevious(value) {
	const $ = c(2);
	const ref = (0, import_react.useRef)(void 0);
	let t0;
	if ($[0] !== value) {
		t0 = () => {
			ref.current = value;
		};
		$[0] = value;
		$[1] = t0;
	} else t0 = $[1];
	(0, import_react.useEffect)(t0);
	return ref.current;
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-utils.js
/**
* Checks if an unknown value is valid React text (string | number)?[]. This is
* useful for conditionally wrapping some value when an element is required.
*/
function isReactText(value) {
	if (Array.isArray(value)) return value.every(isReactText);
	return typeof value === "string" || typeof value === "number";
}
/**
* A thin wrapper around `React.useId()` that supports a consumer provided ID.
*/
function useId(id) {
	const generatedId = import_react.useId();
	return id || generatedId;
}
/**
* Returns a function that returns `true` if the component is mounted, and
* `false` otherwise.
*/
function useIsMounted() {
	const $ = c(3);
	const isMounted = (0, import_react.useRef)(false);
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => {
			isMounted.current = true;
			return () => {
				isMounted.current = false;
			};
		};
		t1 = [];
		$[0] = t0;
		$[1] = t1;
	} else {
		t0 = $[0];
		t1 = $[1];
	}
	(0, import_react.useEffect)(t0, t1);
	let t2;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = () => isMounted.current;
		$[2] = t2;
	} else t2 = $[2];
	return t2;
}
/**
* Render the children of a component, either as a function or a ReactNode.
*
* @param props The props of the component.
* @param values A **memoized** object, which is passed as the argument to your `props.children` render fn.
*/
function useRenderProps(props, values) {
	const $ = c(3);
	const { children } = props;
	let t0;
	bb0: {
		if (typeof children === "function") {
			let t1;
			if ($[0] !== children || $[1] !== values) {
				t1 = children(values);
				$[0] = children;
				$[1] = values;
				$[2] = t1;
			} else t1 = $[2];
			t0 = t1;
			break bb0;
		}
		t0 = children;
	}
	return t0;
}
//#endregion
//#region node_modules/@internationalized/number/dist/private/NumberFormatter.mjs
var $1dfb119a85e764e5$var$formatterCache = /* @__PURE__ */ new Map();
var $1dfb119a85e764e5$var$supportsSignDisplay = false;
try {
	$1dfb119a85e764e5$var$supportsSignDisplay = new Intl.NumberFormat("de-DE", { signDisplay: "exceptZero" }).resolvedOptions().signDisplay === "exceptZero";
} catch {}
var $1dfb119a85e764e5$export$cc77c4ff7e8673c5 = class {
	constructor(locale, options = {}) {
		this.numberFormatter = $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options);
		this.options = options;
	}
	/**
	* Formats a number value as a string, according to the locale and options provided to the
	* constructor.
	*/ format(value) {
		let res = "";
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) res = $1dfb119a85e764e5$export$711b50b3c525e0f2(this.numberFormatter, this.options.signDisplay, value);
		else res = this.numberFormatter.format(value);
		return res;
	}
	/** Formats a number to an array of parts such as separators, digits, punctuation, and more. */ formatToParts(value) {
		return this.numberFormatter.formatToParts(value);
	}
	/** Formats a number range as a string. */ formatRange(start, end) {
		if (typeof this.numberFormatter.formatRange === "function") return this.numberFormatter.formatRange(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		return `${this.format(start)} \u{2013} ${this.format(end)}`;
	}
	/** Formats a number range as an array of parts. */ formatRangeToParts(start, end) {
		if (typeof this.numberFormatter.formatRangeToParts === "function") return this.numberFormatter.formatRangeToParts(start, end);
		if (end < start) throw new RangeError("End date must be >= start date");
		let startParts = this.numberFormatter.formatToParts(start);
		let endParts = this.numberFormatter.formatToParts(end);
		return [
			...startParts.map((p) => ({
				...p,
				source: "startRange"
			})),
			{
				type: "literal",
				value: " – ",
				source: "shared"
			},
			...endParts.map((p) => ({
				...p,
				source: "endRange"
			}))
		];
	}
	/** Returns the resolved formatting options based on the values passed to the constructor. */ resolvedOptions() {
		let options = this.numberFormatter.resolvedOptions();
		if (!$1dfb119a85e764e5$var$supportsSignDisplay && this.options.signDisplay != null) options = {
			...options,
			signDisplay: this.options.signDisplay
		};
		return options;
	}
};
function $1dfb119a85e764e5$var$getCachedNumberFormatter(locale, options = {}) {
	let { numberingSystem } = options;
	if (numberingSystem && locale.includes("-nu-")) {
		if (!locale.includes("-u-")) locale += "-u-";
		locale += `-nu-${numberingSystem}`;
	}
	let cacheKey = locale + (options ? Object.entries(options).sort((a, b) => a[0] < b[0] ? -1 : 1).join() : "");
	if ($1dfb119a85e764e5$var$formatterCache.has(cacheKey)) return $1dfb119a85e764e5$var$formatterCache.get(cacheKey);
	let numberFormatter = new Intl.NumberFormat(locale, options);
	$1dfb119a85e764e5$var$formatterCache.set(cacheKey, numberFormatter);
	return numberFormatter;
}
function $1dfb119a85e764e5$export$711b50b3c525e0f2(numberFormat, signDisplay, num) {
	if (signDisplay === "auto") return numberFormat.format(num);
	else if (signDisplay === "never") return numberFormat.format(Math.abs(num));
	else {
		let needsPositiveSign = false;
		if (signDisplay === "always") needsPositiveSign = num > 0 || Object.is(num, 0);
		else if (signDisplay === "exceptZero") {
			if (Object.is(num, -0) || Object.is(num, 0)) num = Math.abs(num);
			else needsPositiveSign = num > 0;
		}
		if (needsPositiveSign) {
			let negative = numberFormat.format(-num);
			let noSign = numberFormat.format(num);
			let minus = negative.replace(noSign, "").replace(/\u200e|\u061C/, "");
			if ([...minus].length !== 1) console.warn("@react-aria/i18n polyfill for NumberFormat signDisplay: Unsupported case");
			return negative.replace(noSign, "!!!").replace(minus, "+").replace("!!!", noSign);
		} else return numberFormat.format(num);
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useNumberFormatter.mjs
function $bd90acf18e792be6$export$b7a616150fdb9f44(options = {}) {
	let { locale } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	return (0, import_react.useMemo)(() => new $1dfb119a85e764e5$export$cc77c4ff7e8673c5(locale, options), [locale, options]);
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-typography.js
var HeadingContext = /*#__PURE__*/ (0, import_react.createContext)(void 0);
function useHeadingContext() {
	return (0, import_react.useContext)(HeadingContext);
}
/**
* Using [capsize](https://seek-oss.github.io/capsize/), get the leading-trim
* styles for a text element.
*/
function getTrimStyles(fontDefinition) {
	const { capheightTrim: marginBottom, baselineTrim: marginTop } = fontDefinition;
	return {
		display: "block",
		lineHeight: fontDefinition.lineheight,
		"::before": {
			content: "\" \"",
			display: "table",
			marginBottom
		},
		"::after": {
			content: "\" \"",
			display: "table",
			marginTop
		}
	};
}
var TextContext = /*#__PURE__*/ (0, import_react.createContext)(void 0);
function useTextContext() {
	return (0, import_react.useContext)(TextContext);
}
var textClassList = new ClassList("Text");
function useTextStyles(props) {
	const $ = c(30);
	const prevContext = useTextContext();
	let t0;
	let t1;
	let size;
	let color;
	let weight;
	let align;
	let variant;
	let casing;
	let otherProps;
	let UNSAFE_className;
	if ($[0] !== props) {
		({align, casing, overflow: t0, size, color, trim: t1, variant, weight, UNSAFE_className, ...otherProps} = props);
		$[0] = props;
		$[1] = t0;
		$[2] = t1;
		$[3] = size;
		$[4] = color;
		$[5] = weight;
		$[6] = align;
		$[7] = variant;
		$[8] = casing;
		$[9] = otherProps;
		$[10] = UNSAFE_className;
	} else {
		t0 = $[1];
		t1 = $[2];
		size = $[3];
		color = $[4];
		weight = $[5];
		align = $[6];
		variant = $[7];
		casing = $[8];
		otherProps = $[9];
		UNSAFE_className = $[10];
	}
	const overflow = t0 === void 0 ? "breakword" : t0;
	const trim = t1 === void 0 ? !prevContext : t1;
	const fontDefinition = tokenSchema.typography.text[size];
	let t2;
	let t3;
	let t4;
	if ($[11] !== trim || $[12] !== fontDefinition || $[13] !== color || $[14] !== weight || $[15] !== align || $[16] !== variant || $[17] !== casing || $[18] !== overflow || $[19] !== otherProps) {
		const trimStyles = trim ? getTrimStyles(fontDefinition) : null;
		const styles = [
			{
				color: maybeTokenByKey("color.foreground", color),
				fontFamily: tokenSchema.typography.fontFamily.base,
				fontSize: fontDefinition.size,
				fontVariantNumeric: variant,
				fontWeight: weight === "inherit" ? void 0 : tokenSchema.typography.fontWeight[weight],
				minWidth: 0,
				textAlign: align ? alignmentMap[align] : void 0,
				textTransform: casing
			},
			textOptimizationStyles,
			overflow && overflowMap[overflow],
			trimStyles
		];
		t4 = useStyleProps;
		t3 = otherProps;
		t2 = css(styles);
		$[11] = trim;
		$[12] = fontDefinition;
		$[13] = color;
		$[14] = weight;
		$[15] = align;
		$[16] = variant;
		$[17] = casing;
		$[18] = overflow;
		$[19] = otherProps;
		$[20] = t2;
		$[21] = t3;
		$[22] = t4;
	} else {
		t2 = $[20];
		t3 = $[21];
		t4 = $[22];
	}
	let t5;
	if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = textClassList.element("root");
		$[23] = t5;
	} else t5 = $[23];
	let t6;
	if ($[24] !== t2 || $[25] !== UNSAFE_className) {
		t6 = [
			t2,
			UNSAFE_className,
			t5
		];
		$[24] = t2;
		$[25] = UNSAFE_className;
		$[26] = t6;
	} else t6 = $[26];
	let t7;
	if ($[27] !== t3 || $[28] !== t6) {
		t7 = {
			...t3,
			UNSAFE_className: t6
		};
		$[27] = t3;
		$[28] = t6;
		$[29] = t7;
	} else t7 = $[29];
	return t4(t7);
}
var textOptimizationStyles = {
	MozOsxFontSmoothing: "auto",
	WebkitFontSmoothing: "auto"
};
var alignmentMap = {
	start: "start",
	center: "center",
	end: "end",
	FORCE_left: "left",
	FORCE_right: "right"
};
var overflowMap = {
	unset: {},
	nowrap: { whiteSpace: "nowrap" },
	breakword: { overflowWrap: "break-word" }
};
var headingClassList = new ClassList("Heading");
function useHeadingStyles(t0) {
	const $ = c(19);
	let size;
	let align;
	let otherProps;
	let UNSAFE_className;
	if ($[0] !== t0) {
		({align, size, UNSAFE_className, ...otherProps} = t0);
		$[0] = t0;
		$[1] = size;
		$[2] = align;
		$[3] = otherProps;
		$[4] = UNSAFE_className;
	} else {
		size = $[1];
		align = $[2];
		otherProps = $[3];
		UNSAFE_className = $[4];
	}
	const fontDefinition = tokenSchema.typography.heading[size];
	let t1;
	let t2;
	let t3;
	if ($[5] !== fontDefinition || $[6] !== size || $[7] !== align || $[8] !== otherProps) {
		const trimStyles = getTrimStyles(fontDefinition);
		const styles = [
			{
				color: tokenSchema.color.foreground.neutralEmphasis,
				fontSize: fontDefinition.size,
				fontFamily: tokenSchema.typography.fontFamily.base,
				fontWeight: sizeToWeight[size],
				textAlign: align
			},
			textOptimizationStyles,
			trimStyles
		];
		t3 = useStyleProps;
		t2 = otherProps;
		t1 = css(styles);
		$[5] = fontDefinition;
		$[6] = size;
		$[7] = align;
		$[8] = otherProps;
		$[9] = t1;
		$[10] = t2;
		$[11] = t3;
	} else {
		t1 = $[9];
		t2 = $[10];
		t3 = $[11];
	}
	let t4;
	if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = headingClassList.element("root");
		$[12] = t4;
	} else t4 = $[12];
	let t5;
	if ($[13] !== t1 || $[14] !== UNSAFE_className) {
		t5 = [
			t1,
			UNSAFE_className,
			t4
		];
		$[13] = t1;
		$[14] = UNSAFE_className;
		$[15] = t5;
	} else t5 = $[15];
	let t6;
	if ($[16] !== t2 || $[17] !== t5) {
		t6 = {
			...t2,
			UNSAFE_className: t5
		};
		$[16] = t2;
		$[17] = t5;
		$[18] = t6;
	} else t6 = $[18];
	return t3(t6);
}
var sizeToWeight = {
	small: tokenSchema.typography.fontWeight.semibold,
	regular: tokenSchema.typography.fontWeight.bold,
	medium: tokenSchema.typography.fontWeight.medium,
	large: tokenSchema.typography.fontWeight.bold
};
/** @private Truncate text with an ellipsis after the specified number of lines */
function Truncate(t0) {
	const $ = c(11);
	let lines;
	let title;
	let props;
	if ($[0] !== t0) {
		({lines, title, ...props} = t0);
		$[0] = t0;
		$[1] = lines;
		$[2] = title;
		$[3] = props;
	} else {
		lines = $[1];
		title = $[2];
		props = $[3];
	}
	const className = useTruncateStyles(typeof lines === "boolean" ? 1 : lines);
	let t1;
	if ($[4] !== title || $[5] !== props) {
		var _title;
		t1 = (_title = title) !== null && _title !== void 0 ? _title : isReactText(props.children) ? props.children.toString() : void 0;
		$[4] = title;
		$[5] = props;
		$[6] = t1;
	} else t1 = $[6];
	let t2;
	if ($[7] !== className || $[8] !== t1 || $[9] !== props) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			className,
			title: t1,
			...props
		});
		$[7] = className;
		$[8] = t1;
		$[9] = props;
		$[10] = t2;
	} else t2 = $[10];
	return t2;
}
function useTruncateStyles(lineClamp) {
	return css({
		display: "-webkit-box",
		WebkitLineClamp: lineClamp,
		textOverflow: "ellipsis",
		WebkitBoxOrient: "vertical",
		overflow: "hidden"
	});
}
function useVisuallyHiddenRange(range) {
	const matchedBreakpoints = useResponsiveRange();
	const { visuallyHiddenProps } = $ea3928288112382f$export$a966af930f325cab();
	if (range && matchedBreakpoints(range)) return visuallyHiddenProps;
}
var sizeToElement = {
	small: "h4",
	regular: "h3",
	medium: "h2",
	large: "h1"
};
var filterOptions$1 = { propNames: /* @__PURE__ */ new Set(["aria-hidden"]) };
/** A typographic device used to communicate levels of hierarchy between text. */
var Heading = forwardRefWithAs((props, ref) => {
	props = useSlotProps(props, "heading");
	const { children, size = "regular", truncate, elementType: ElementType = sizeToElement[size], ...otherProps } = props;
	const styleProps = useHeadingStyles({
		size,
		...props
	});
	const headingContext = (0, import_react.useMemo)(() => ({ size }), [size]);
	const visuallyHiddenProps = useVisuallyHiddenRange(props.visuallyHidden);
	const content = truncate ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Truncate, {
		lines: truncate,
		children
	}) : children;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(HeadingContext.Provider, {
		value: headingContext,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
			ref,
			...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, filterOptions$1),
			...styleProps,
			...visuallyHiddenProps,
			children: content
		})
	});
});
var filterOptions = { propNames: /* @__PURE__ */ new Set(["aria-hidden", "role"]) };
var Text = forwardRefWithAs((props, forwardedRef) => {
	var _prevContext$color, _prevContext$size, _prevContext$weight;
	props = useSlotProps(props, "text");
	const headingContext = useHeadingContext();
	const prevContext = useTextContext();
	validateProps$1(props, prevContext);
	warning(!headingContext, "The `Text` component is not supported within `Heading` components.");
	if (headingContext) return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", { children: props.children });
	const { children, color = (_prevContext$color = prevContext === null || prevContext === void 0 ? void 0 : prevContext.color) !== null && _prevContext$color !== void 0 ? _prevContext$color : "neutral", elementType: ElementType = "span", size = (_prevContext$size = prevContext === null || prevContext === void 0 ? void 0 : prevContext.size) !== null && _prevContext$size !== void 0 ? _prevContext$size : "regular", trim = !prevContext, truncate, visuallyHidden, weight = (_prevContext$weight = prevContext === null || prevContext === void 0 ? void 0 : prevContext.weight) !== null && _prevContext$weight !== void 0 ? _prevContext$weight : "regular", ...otherProps } = props;
	const styleProps = useTextStyles({
		color,
		size,
		trim,
		weight,
		...otherProps
	});
	const visuallyHiddenProps = useVisuallyHiddenRange(visuallyHidden);
	const content = truncate ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Truncate, {
		lines: truncate,
		children
	}) : children;
	const element = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref: forwardedRef,
		...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, filterOptions),
		...styleProps,
		...visuallyHiddenProps,
		children: content
	});
	const nextContext = (0, import_react.useMemo)(() => ({
		size,
		color,
		weight
	}), [
		size,
		color,
		weight
	]);
	if (prevContext || visuallyHidden) return element;
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextContext.Provider, {
		value: nextContext,
		children: element
	});
});
function validateProps$1(props, context) {
	assert(!context || !props.align, "The \"align\" prop is unsupported on nested Text.");
	assert(!context || !props.trim, "The \"trim\" prop is unsupported on nested Text.");
}
/**
* A utility component for displaying emoji characters accessibly. Emojis can
* add playfulness to your interface, but require formatting to ensure that they
* are accessible for all users.
*/
var Emoji = /*#__PURE__*/ (0, import_react.forwardRef)(function Emoji(props, forwardedRef) {
	const $ = c(13);
	let otherProps;
	let label;
	let symbol;
	if ($[0] !== props) {
		({label, symbol, ...otherProps} = props);
		$[0] = props;
		$[1] = otherProps;
		$[2] = label;
		$[3] = symbol;
	} else {
		otherProps = $[1];
		label = $[2];
		symbol = $[3];
	}
	const styleProps = useStyleProps(otherProps);
	const t0 = label ? void 0 : true;
	let t1;
	if ($[4] !== otherProps) {
		t1 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
		$[4] = otherProps;
		$[5] = t1;
	} else t1 = $[5];
	let t2;
	if ($[6] !== t0 || $[7] !== label || $[8] !== forwardedRef || $[9] !== styleProps || $[10] !== t1 || $[11] !== symbol) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": t0,
			"aria-label": label,
			ref: forwardedRef,
			role: "img",
			...styleProps,
			...t1,
			children: symbol
		});
		$[6] = t0;
		$[7] = label;
		$[8] = forwardedRef;
		$[9] = styleProps;
		$[10] = t1;
		$[11] = symbol;
		$[12] = t2;
	} else t2 = $[12];
	return t2;
});
function noopSubscribe() {
	return () => {};
}
function useIsMac() {
	const $ = c(1);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = () => false;
		$[0] = t0;
	} else t0 = $[0];
	return (0, import_react.useSyncExternalStore)(noopSubscribe, $2add3ce32c6007eb$export$9ac100e40613ea10, t0);
}
/** Represents text that specifies a keyboard command. */
var Kbd = /*#__PURE__*/ (0, import_react.forwardRef)(function Kbd(props, forwardedRef) {
	const $ = c(25);
	props = useSlotProps(props, "kbd");
	let otherProps;
	let alt;
	let meta;
	let shift;
	let children;
	if ($[0] !== props) {
		({alt, meta, shift, children, ...otherProps} = props);
		$[0] = props;
		$[1] = otherProps;
		$[2] = alt;
		$[3] = meta;
		$[4] = shift;
		$[5] = children;
	} else {
		otherProps = $[1];
		alt = $[2];
		meta = $[3];
		shift = $[4];
		children = $[5];
	}
	let t0;
	if ($[6] !== otherProps) {
		t0 = {
			casing: "full-width",
			color: "neutral",
			size: "regular",
			weight: "regular",
			...otherProps
		};
		$[6] = otherProps;
		$[7] = t0;
	} else t0 = $[7];
	const styleProps = useTextStyles(t0);
	const isMac = useIsMac();
	let t1;
	let t2;
	if ($[8] !== isMac) {
		t2 = isMac ? {
			alt: "⌥",
			meta: "⌘",
			shift: "⇧"
		} : {
			alt: "Alt",
			meta: "Ctrl",
			shift: "Shift"
		};
		$[8] = isMac;
		$[9] = t2;
	} else t2 = $[9];
	const SYSTEM_KEYS = t2;
	const t3 = alt && SYSTEM_KEYS.alt;
	const t4 = shift && SYSTEM_KEYS.shift;
	const t5 = meta && SYSTEM_KEYS.meta;
	let t6;
	if ($[10] !== t3 || $[11] !== t4 || $[12] !== t5 || $[13] !== isMac) {
		t6 = joinModifierKeys([
			t3,
			t4,
			t5
		].filter(Boolean), isMac);
		$[10] = t3;
		$[11] = t4;
		$[12] = t5;
		$[13] = isMac;
		$[14] = t6;
	} else t6 = $[14];
	t1 = t6;
	const modifiers = t1;
	let t7;
	if ($[15] !== otherProps) {
		t7 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
		$[15] = otherProps;
		$[16] = t7;
	} else t7 = $[16];
	let t8;
	if ($[17] !== children) {
		t8 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Char, { children });
		$[17] = children;
		$[18] = t8;
	} else t8 = $[18];
	let t9;
	if ($[19] !== t7 || $[20] !== styleProps || $[21] !== forwardedRef || $[22] !== modifiers || $[23] !== t8) {
		t9 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("kbd", {
			...t7,
			...styleProps,
			dir: "ltr",
			ref: forwardedRef,
			children: [modifiers, t8]
		});
		$[19] = t7;
		$[20] = styleProps;
		$[21] = forwardedRef;
		$[22] = modifiers;
		$[23] = t8;
		$[24] = t9;
	} else t9 = $[24];
	return t9;
});
/**
* NOTE: The 'full-width' text-transform has limited support.
* @see https://developer.mozilla.org/en-US/docs/Web/CSS/text-transform#browser_compatibility
* This hack ensures that single character shortcuts are visually aligned when
* stacked, like when end-aligned in menu items, without needing to use a
* monospace font.
*/
function Char(props) {
	const $ = c(3);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = css({
			display: "inline-block",
			minWidth: "1em",
			textAlign: "center"
		});
		$[0] = t0;
	} else t0 = $[0];
	let t1;
	if ($[1] !== props) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			className: t0,
			...props
		});
		$[1] = props;
		$[2] = t1;
	} else t1 = $[2];
	return t1;
}
function joinModifierKeys(modifiers, isMac) {
	if (modifiers.length === 0) return "";
	let delimiter = isMac ? "" : "+";
	return modifiers.join(delimiter) + delimiter;
}
var Numeral = /*#__PURE__*/ (0, import_react.forwardRef)(function Numeral(props, forwardedRef) {
	const $ = c(15);
	props = useDerivedProps(props);
	validateProps(props);
	let t0;
	if ($[0] !== props) {
		t0 = optionsByFormat(props);
		$[0] = props;
		$[1] = t0;
	} else t0 = $[1];
	const formatter = $bd90acf18e792be6$export$b7a616150fdb9f44(t0);
	let value;
	let textProps;
	if ($[2] !== props) {
		const { abbreviate, format, value: t1, ...t2 } = props;
		value = t1;
		textProps = t2;
		$[2] = props;
		$[3] = value;
		$[4] = textProps;
	} else {
		value = $[3];
		textProps = $[4];
	}
	const headingContext = useHeadingContext();
	let t1;
	if ($[5] !== formatter || $[6] !== value) {
		t1 = formatter.format(value);
		$[5] = formatter;
		$[6] = value;
		$[7] = t1;
	} else t1 = $[7];
	const formattedText = t1;
	if (headingContext) {
		let t2;
		if ($[8] !== forwardedRef || $[9] !== formattedText) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
				ref: forwardedRef,
				children: formattedText
			});
			$[8] = forwardedRef;
			$[9] = formattedText;
			$[10] = t2;
		} else t2 = $[10];
		return t2;
	}
	let t2;
	if ($[11] !== forwardedRef || $[12] !== textProps || $[13] !== formattedText) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
			ref: forwardedRef,
			...textProps,
			children: formattedText
		});
		$[11] = forwardedRef;
		$[12] = textProps;
		$[13] = formattedText;
		$[14] = t2;
	} else t2 = $[14];
	return t2;
});
function getFormat(props) {
	const { format, currency, unit } = props;
	if (format) return format;
	if (currency) return "currency";
	if (unit) return "unit";
	return "decimal";
}
function useDerivedProps(props) {
	return {
		...props,
		format: getFormat(props)
	};
}
function toFractionDigits(precision) {
	return Array.isArray(precision) ? precision : [precision, precision];
}
function optionsByFormat(props) {
	const { abbreviate, format, precision, currency, unit } = props;
	const notation = abbreviate ? "compact" : void 0;
	const [minimumFractionDigits, maximumFractionDigits] = toFractionDigits(precision);
	const common = {
		maximumFractionDigits,
		minimumFractionDigits,
		notation,
		compactDisplay: abbreviate === "long" ? "long" : "short"
	};
	switch (format) {
		case "currency": return {
			...common,
			style: "currency",
			currency,
			currencyDisplay: "narrowSymbol"
		};
		case "percent": return {
			...common,
			style: "percent"
		};
		case "unit": return {
			...common,
			style: "unit",
			unit,
			unitDisplay: "narrow"
		};
		default: return common;
	}
}
function validateProps(props) {
	const { format, currency, precision, unit } = props;
	assert(currency ? format === "currency" : true, "When format is \"currency\", the currency property must be provided.");
	assert(unit ? format === "unit" : true, "When format is \"unit\", the unit property must be provided.");
	assert(!(currency && unit), "Formatting of \"currency\" and \"unit\" cannot be combined.");
	if (precision) assert(Array.isArray(precision) ? precision.every(isInteger) : isInteger(precision), "Precision must be an integer, or an integer tuple for min/max.");
}
/** A typographic component that adds styles for rendering remote HTML content. */
var Prose = forwardRefWithAs((props, ref) => {
	const { children, elementType: ElementType = "div", ...otherProps } = props;
	const styleProps = useProseStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref,
		...filterStyleProps(otherProps),
		...styleProps,
		children
	});
});
function useProseStyleProps(props) {
	const $ = c(11);
	let t0;
	let otherProps;
	if ($[0] !== props) {
		({size: t0, ...otherProps} = props);
		$[0] = props;
		$[1] = t0;
		$[2] = otherProps;
	} else {
		t0 = $[1];
		otherProps = $[2];
	}
	const size = t0 === void 0 ? "medium" : t0;
	const styleProps = useStyleProps(otherProps);
	let t1;
	if ($[3] !== size) {
		t1 = toDataAttributes({ size });
		$[3] = size;
		$[4] = t1;
	} else t1 = $[4];
	let t2;
	if ($[5] !== styleProps.className) {
		t2 = classNames(css({
			color: tokenSchema.color.foreground.neutral,
			fontFamily: tokenSchema.typography.fontFamily.base,
			height: "100%",
			maxWidth: "100%",
			minHeight: 0,
			minWidth: 0,
			position: "relative",
			overflowWrap: "break-word",
			whiteSpace: "break-spaces",
			fontVariantLigatures: "none",
			fontFeatureSettings: "\"liga\" 0",
			MozOsxFontSmoothing: "auto",
			WebkitFontSmoothing: "auto",
			"&[data-size=\"small\"]": {
				fontSize: tokenSchema.typography.text.small.size,
				lineHeight: 1.6
			},
			"&[data-size=\"regular\"]": {
				fontSize: tokenSchema.typography.text.regular.size,
				lineHeight: 1.5
			},
			"&[data-size=\"medium\"]": {
				fontSize: tokenSchema.typography.text.medium.size,
				lineHeight: 1.5
			},
			"&[data-size=\"large\"]": {
				fontSize: tokenSchema.typography.text.large.size,
				lineHeight: 1.4
			},
			"& :is(blockquote, p, pre, ol, ul, table)": {
				marginBlock: "0.75em",
				":first-child": { marginTop: 0 },
				":last-child": { marginBottom: 0 }
			},
			"ol, ul": { paddingInlineStart: "1em" },
			"ol ol, ul ul, ol ul, ul ol": { marginBlock: 0 },
			"li :is(blockquote, p, pre, ol, ul, table)": { marginBottom: 0 },
			blockquote: {
				borderInlineStart: `${tokenSchema.size.border.large} solid ${tokenSchema.color.foreground.neutral}`,
				marginInline: 0,
				paddingInlineStart: "1em"
			},
			hr: {
				backgroundColor: tokenSchema.color.alias.borderIdle,
				border: 0,
				borderRadius: tokenSchema.size.border.medium,
				height: tokenSchema.size.border.medium,
				marginBlock: "1.5em"
			},
			img: {
				height: "auto",
				maxWidth: "100%"
			},
			strong: { fontWeight: tokenSchema.typography.fontWeight.semibold },
			a: { color: tokenSchema.color.foreground.accent },
			pre: {
				backgroundColor: tokenSchema.color.background.surface,
				borderRadius: tokenSchema.size.radius.medium,
				color: tokenSchema.color.foreground.neutralEmphasis,
				fontFamily: tokenSchema.typography.fontFamily.code,
				fontSize: "0.85em",
				lineHeight: tokenSchema.typography.lineheight.medium,
				minWidth: 0,
				maxWidth: "100%",
				overflow: "auto",
				padding: tokenSchema.size.space.medium,
				whiteSpace: "pre-wrap"
			},
			"pre > code": { fontFamily: "inherit" },
			"& :not(pre) > code": {
				backgroundColor: tokenSchema.color.background.accent,
				borderRadius: tokenSchema.size.radius.small,
				color: tokenSchema.color.foreground.neutralEmphasis,
				display: "inline-block",
				fontSize: "0.85em",
				fontFamily: tokenSchema.typography.fontFamily.code,
				paddingInline: tokenSchema.size.space.small
			},
			"& :is(h1, h2, h3, h4, h5, h6)": {
				color: tokenSchema.color.foreground.neutralEmphasis,
				lineHeight: 1.25,
				marginTop: "1.5em",
				marginBottom: "0.67em",
				":first-child": { marginTop: 0 },
				":last-child": { marginBottom: 0 }
			},
			h1: {
				fontSize: "2em",
				fontWeight: tokenSchema.typography.fontWeight.bold
			},
			h2: {
				fontSize: "1.5em",
				fontWeight: tokenSchema.typography.fontWeight.bold
			},
			h3: {
				fontSize: "1.25em",
				fontWeight: tokenSchema.typography.fontWeight.bold
			},
			h4: {
				fontSize: "1.1em",
				fontWeight: tokenSchema.typography.fontWeight.semibold
			},
			h5: {
				fontSize: "1em",
				fontWeight: tokenSchema.typography.fontWeight.semibold
			},
			h6: {
				fontSize: "0.9em",
				fontWeight: tokenSchema.typography.fontWeight.semibold,
				letterSpacing: "0.0125em"
			},
			...getListStyles()
		}), styleProps.className);
		$[5] = styleProps.className;
		$[6] = t2;
	} else t2 = $[6];
	let t3;
	if ($[7] !== styleProps || $[8] !== t1 || $[9] !== t2) {
		t3 = {
			...styleProps,
			...t1,
			className: t2
		};
		$[7] = styleProps;
		$[8] = t1;
		$[9] = t2;
		$[10] = t3;
	} else t3 = $[10];
	return t3;
}
function getListStyles() {
	let styles = {};
	let listDepth = 10;
	const orderedListStyles = [
		"lower-roman",
		"decimal",
		"lower-alpha"
	];
	const unorderedListStyles = [
		"square",
		"disc",
		"circle"
	];
	while (listDepth--) {
		let arr = Array.from({ length: listDepth });
		if (arr.length) {
			styles[arr.map(() => `ol`).join(" ")] = { listStyle: orderedListStyles[listDepth % 3] };
			styles[arr.map(() => `ul`).join(" ")] = { listStyle: unorderedListStyles[listDepth % 3] };
		}
	}
	return styles;
}
//#endregion
export { useMediaQuery as $, $23f2114a1b82827e$export$4282f70798064fe0 as $t, BreakpointProvider as A, $3b8b240c1bf84ab9$export$4c063cf1350e6fed as At, keyframes as B, $390e54f620492c70$export$f680877a34711e37 as Bt, $ea3928288112382f$export$a966af930f325cab as C, $caaf0dd3060ed57c$export$9a302a45f65d0572 as Ct, SlotProvider as D, $a92dc41f639950be$export$525bc4921d56d4a as Dt, Footer as E, $b5c62b033c25b96d$export$60278871457622de as Et, classNames as F, $2eb8e6d23f3d0cb0$export$a54013f0d02a8f82 as Ft, resolvePropWithPath as G, $2add3ce32c6007eb$export$6446a186d09e379e as Gt, onlyStyleProps as H, $c7eafbbe1ea5834e$export$535bd6ca7f90a273 as Ht, containerQueries as I, $bbaa08b3cd72f041$export$9d1611c77c2fe928 as It, tokenSchema as J, $2add3ce32c6007eb$export$9ac100e40613ea10 as Jt, sizeResolver as K, $2add3ce32c6007eb$export$78551043582a6a98 as Kt, css as L, clsx as Lt, FocusRing as M, $48a7d519b337145d$export$4eaf04e54aa8eed6 as Mt, breakpointQueries$1 as N, $1969ac565cfec8d0$export$de79e2c695e052f3 as Nt, useSlotProps as O, $a92dc41f639950be$export$c2b7abe5d61ec696 as Ot, breakpoints as P, $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7 as Pt, useMatchedBreakpoints as Q, $a4e76a5424781910$export$e08e3b67e392101e as Qt, filterStyleProps as R, $4064df0d6f9620e1$export$c9058316764c140e as Rt, $ea3928288112382f$export$439d29a4e110a164 as S, $caaf0dd3060ed57c$export$95185d699e05d4d7 as St, Content as T, $b5c62b033c25b96d$export$29bf1b5f2c56cf63 as Tt, resetClassName as U, $c4867b2f328c2698$export$e5c5a5f917a5871c as Ut, maybeTokenByKey as V, $1a716630a9e3a599$export$14d238f342723f25 as Vt, resolveProp as W, $2add3ce32c6007eb$export$186c6964ca17d99 as Wt, useBreakpoint as X, $2add3ce32c6007eb$export$e1865c3bedcd822b as Xt, transition as Y, $2add3ce32c6007eb$export$a11b0059900ceec8 as Yt, useIsMobileDevice as Z, $2add3ce32c6007eb$export$fedb369cb70207f1 as Zt, useIsMounted as _, $8f5a2122b0992be3$export$98e20ec92f614cfe as _t, Prose as a, $d447af545b77c9f1$export$f21a1ffae260145a as an, isString as at, cloneValidElement as b, $caaf0dd3060ed57c$export$323e4fc2fa4753fb as bt, textClassList as c, warning as ct, useTextContext as d, SCHEME_LIGHT as dt, $23f2114a1b82827e$export$b4f377a2b6254582 as en, useStyleProps as et, useTextStyles as f, THEME_DEFAULT as ft, useId as g, $8f5a2122b0992be3$export$8397ddfc504fdb9a as gt, isReactText as h, $8f5a2122b0992be3$export$630ff653c5ada6a9 as ht, Numeral as i, $d447af545b77c9f1$export$b204af158042fbac as in, isDefined as it, ClassList as j, $3b8b240c1bf84ab9$export$bebd5a1431fec25d as jt, forwardRefWithAs as k, $a92dc41f639950be$export$cabe61c495ee3649 as kt, useHeadingContext as l, SCHEME_AUTO as lt, $1dfb119a85e764e5$export$cc77c4ff7e8673c5 as m, $8e9d2fae0ecb9001$export$457c3d6518dd4c6f as mt, Heading as n, $23f2114a1b82827e$export$e58f029f0fbfdb29 as nn, $2c9edc598a03d523$export$420e68273165f4ec as nt, Text as o, c as on, assert as ot, $bd90acf18e792be6$export$b7a616150fdb9f44 as p, $1e74c67db218ce67$export$f8168d8dd8fd66e6 as pt, toDataAttributes as q, $2add3ce32c6007eb$export$7bef049ce92e4224 as qt, Kbd as r, $6a20a7989e6c817a$export$98658e8c59125e6a as rn, typedKeys as rt, headingClassList as s, assertNever as st, Emoji as t, $23f2114a1b82827e$export$cd4e5573fbe2b576 as tn, $0c4a58759813079a$export$4e328f61c538687f as tt, useProseStyleProps as u, SCHEME_DARK as ut, useRenderProps as v, $8f5a2122b0992be3$export$b9b3dfddab17db27 as vt, ClearSlots as w, $caaf0dd3060ed57c$export$bdc77b0c0a3a85d6 as wt, useHasChild as x, $caaf0dd3060ed57c$export$7e924b3091a3bd18 as xt, usePrevious as y, $caaf0dd3060ed57c$export$13aea1a3cb5e3f1f as yt, injectGlobal as z, $390e54f620492c70$export$b4cc09c592e8fdb8 as zt };
