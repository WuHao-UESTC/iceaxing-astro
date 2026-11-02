import { i as __toESM } from "./rolldown-runtime-DbVrKiKs.js";
import { t as require_react } from "./react-eZXm9bZy.js";
import { t as require_react_dom } from "./react-dom-CVQvCoTz.js";
import { t as require_jsx_runtime } from "./jsx-runtime-hYFZm98l.js";
import { $ as useMediaQuery, $t as $23f2114a1b82827e$export$4282f70798064fe0, A as BreakpointProvider, At as $3b8b240c1bf84ab9$export$4c063cf1350e6fed, B as keyframes, Bt as $390e54f620492c70$export$f680877a34711e37, Ct as $caaf0dd3060ed57c$export$9a302a45f65d0572, D as SlotProvider, Dt as $a92dc41f639950be$export$525bc4921d56d4a, Et as $b5c62b033c25b96d$export$60278871457622de, F as classNames, Ft as $2eb8e6d23f3d0cb0$export$a54013f0d02a8f82, G as resolvePropWithPath, Gt as $2add3ce32c6007eb$export$6446a186d09e379e, Ht as $c7eafbbe1ea5834e$export$535bd6ca7f90a273, It as $bbaa08b3cd72f041$export$9d1611c77c2fe928, J as tokenSchema, Jt as $2add3ce32c6007eb$export$9ac100e40613ea10, K as sizeResolver, Kt as $2add3ce32c6007eb$export$78551043582a6a98, L as css, M as FocusRing, Mt as $48a7d519b337145d$export$4eaf04e54aa8eed6, N as breakpointQueries$1, Nt as $1969ac565cfec8d0$export$de79e2c695e052f3, O as useSlotProps, Ot as $a92dc41f639950be$export$c2b7abe5d61ec696, P as breakpoints, Pt as $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7, Q as useMatchedBreakpoints, Qt as $a4e76a5424781910$export$e08e3b67e392101e, R as filterStyleProps, S as $ea3928288112382f$export$439d29a4e110a164, St as $caaf0dd3060ed57c$export$95185d699e05d4d7, Tt as $b5c62b033c25b96d$export$29bf1b5f2c56cf63, U as resetClassName, Ut as $c4867b2f328c2698$export$e5c5a5f917a5871c, V as maybeTokenByKey, Vt as $1a716630a9e3a599$export$14d238f342723f25, W as resolveProp, Y as transition, Yt as $2add3ce32c6007eb$export$a11b0059900ceec8, Zt as $2add3ce32c6007eb$export$fedb369cb70207f1, an as $d447af545b77c9f1$export$f21a1ffae260145a, b as cloneValidElement, bt as $caaf0dd3060ed57c$export$323e4fc2fa4753fb, ct as warning, dt as SCHEME_LIGHT, en as $23f2114a1b82827e$export$b4f377a2b6254582, et as useStyleProps, f as useTextStyles, ft as THEME_DEFAULT, gt as $8f5a2122b0992be3$export$8397ddfc504fdb9a, h as isReactText, ht as $8f5a2122b0992be3$export$630ff653c5ada6a9, in as $d447af545b77c9f1$export$b204af158042fbac, j as ClassList, jt as $3b8b240c1bf84ab9$export$bebd5a1431fec25d, k as forwardRefWithAs, kt as $a92dc41f639950be$export$cabe61c495ee3649, lt as SCHEME_AUTO, mt as $8e9d2fae0ecb9001$export$457c3d6518dd4c6f, nn as $23f2114a1b82827e$export$e58f029f0fbfdb29, nt as $2c9edc598a03d523$export$420e68273165f4ec, o as Text, on as c, p as $bd90acf18e792be6$export$b7a616150fdb9f44, pt as $1e74c67db218ce67$export$f8168d8dd8fd66e6, q as toDataAttributes, rn as $6a20a7989e6c817a$export$98658e8c59125e6a, tn as $23f2114a1b82827e$export$cd4e5573fbe2b576, ut as SCHEME_DARK, xt as $caaf0dd3060ed57c$export$7e924b3091a3bd18, yt as $caaf0dd3060ed57c$export$13aea1a3cb5e3f1f, z as injectGlobal, zt as $390e54f620492c70$export$b4cc09c592e8fdb8 } from "./keystar-ui-typography-C-wQCOMj.js";
//#region node_modules/react-aria/dist/private/live-announcer/LiveAnnouncer.mjs
var $a46cf152bb926da5$var$LIVEREGION_TIMEOUT_DELAY = 7e3;
var $a46cf152bb926da5$var$liveAnnouncer = null;
function $a46cf152bb926da5$export$a9b970dcc4ae71a9(message, assertiveness = "assertive", timeout = $a46cf152bb926da5$var$LIVEREGION_TIMEOUT_DELAY) {
	if (!$a46cf152bb926da5$var$liveAnnouncer) {
		$a46cf152bb926da5$var$liveAnnouncer = new $a46cf152bb926da5$var$LiveAnnouncer();
		if (!(typeof IS_REACT_ACT_ENVIRONMENT === "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest !== "undefined")) setTimeout(() => {
			if ($a46cf152bb926da5$var$liveAnnouncer?.isAttached()) $a46cf152bb926da5$var$liveAnnouncer?.announce(message, assertiveness, timeout);
		}, 100);
		else $a46cf152bb926da5$var$liveAnnouncer.announce(message, assertiveness, timeout);
	} else $a46cf152bb926da5$var$liveAnnouncer.announce(message, assertiveness, timeout);
}
function $a46cf152bb926da5$export$d10ae4f68404609a(assertiveness) {
	if ($a46cf152bb926da5$var$liveAnnouncer) $a46cf152bb926da5$var$liveAnnouncer.clear(assertiveness);
}
var $a46cf152bb926da5$var$LiveAnnouncer = class {
	constructor() {
		this.node = null;
		this.assertiveLog = null;
		this.politeLog = null;
		if (typeof document !== "undefined") {
			this.node = document.createElement("div");
			this.node.dataset.liveAnnouncer = "true";
			Object.assign(this.node.style, {
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
			});
			this.assertiveLog = this.createLog("assertive");
			this.node.appendChild(this.assertiveLog);
			this.politeLog = this.createLog("polite");
			this.node.appendChild(this.politeLog);
			document.body.prepend(this.node);
		}
	}
	isAttached() {
		return this.node?.isConnected;
	}
	createLog(ariaLive) {
		let node = document.createElement("div");
		node.setAttribute("role", "log");
		node.setAttribute("aria-live", ariaLive);
		node.setAttribute("aria-relevant", "additions");
		return node;
	}
	destroy() {
		if (!this.node) return;
		document.body.removeChild(this.node);
		this.node = null;
	}
	announce(message, assertiveness = "assertive", timeout = $a46cf152bb926da5$var$LIVEREGION_TIMEOUT_DELAY) {
		if (!this.node) return;
		let node = document.createElement("div");
		if (typeof message === "object") {
			node.setAttribute("role", "img");
			node.setAttribute("aria-labelledby", message["aria-labelledby"]);
		} else node.textContent = message;
		if (assertiveness === "assertive") this.assertiveLog?.appendChild(node);
		else this.politeLog?.appendChild(node);
		if (message !== "") setTimeout(() => {
			node.remove();
		}, timeout);
	}
	clear(assertiveness) {
		if (!this.node) return;
		if ((!assertiveness || assertiveness === "assertive") && this.assertiveLog) this.assertiveLog.innerHTML = "";
		if ((!assertiveness || assertiveness === "polite") && this.politeLog) this.politeLog.innerHTML = "";
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/utils/shadowdom/ShadowTreeWalker.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
var import_jsx_runtime = require_jsx_runtime();
var $654b97e09f2a30c1$export$63eb3ababa9c55c4 = class {
	constructor(doc, root, whatToShow, filter) {
		this._walkerStack = [];
		this._currentSetFor = /* @__PURE__ */ new Set();
		this._acceptNode = (node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
				const shadowRoot = node.shadowRoot;
				if (shadowRoot) {
					const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, { acceptNode: this._acceptNode });
					this._walkerStack.unshift(walker);
					return NodeFilter.FILTER_ACCEPT;
				} else if (typeof this.filter === "function") return this.filter(node);
				else if (this.filter?.acceptNode) return this.filter.acceptNode(node);
				else if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_SKIP;
		};
		this._doc = doc;
		this.root = root;
		this.filter = filter ?? null;
		this.whatToShow = whatToShow ?? NodeFilter.SHOW_ALL;
		this._currentNode = root;
		this._walkerStack.unshift(doc.createTreeWalker(root, whatToShow, this._acceptNode));
		const shadowRoot = root.shadowRoot;
		if (shadowRoot) {
			const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, { acceptNode: this._acceptNode });
			this._walkerStack.unshift(walker);
		}
	}
	get currentNode() {
		return this._currentNode;
	}
	set currentNode(node) {
		if (!$23f2114a1b82827e$export$4282f70798064fe0(this.root, node)) throw new Error("Cannot set currentNode to a node that is not contained by the root node.");
		const walkers = [];
		let curNode = node;
		let currentWalkerCurrentNode = node;
		this._currentNode = node;
		while (curNode && curNode !== this.root) if (curNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			const shadowRoot = curNode;
			const walker = this._doc.createTreeWalker(shadowRoot, this.whatToShow, { acceptNode: this._acceptNode });
			walkers.push(walker);
			walker.currentNode = currentWalkerCurrentNode;
			this._currentSetFor.add(walker);
			curNode = currentWalkerCurrentNode = shadowRoot.host;
		} else curNode = curNode.parentNode;
		const walker = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
		walkers.push(walker);
		walker.currentNode = currentWalkerCurrentNode;
		this._currentSetFor.add(walker);
		this._walkerStack = walkers;
	}
	get doc() {
		return this._doc;
	}
	firstChild() {
		let currentNode = this.currentNode;
		let newNode = this.nextNode();
		if (!$23f2114a1b82827e$export$4282f70798064fe0(currentNode, newNode)) {
			this.currentNode = currentNode;
			return null;
		}
		if (newNode) this.currentNode = newNode;
		return newNode;
	}
	lastChild() {
		let newNode = this._walkerStack[0].lastChild();
		if (newNode) this.currentNode = newNode;
		return newNode;
	}
	nextNode() {
		const nextNode = this._walkerStack[0].nextNode();
		if (nextNode) {
			if (nextNode.shadowRoot) {
				let nodeResult;
				if (typeof this.filter === "function") nodeResult = this.filter(nextNode);
				else if (this.filter?.acceptNode) nodeResult = this.filter.acceptNode(nextNode);
				if (nodeResult === NodeFilter.FILTER_ACCEPT) {
					this.currentNode = nextNode;
					return nextNode;
				}
				let newNode = this.nextNode();
				if (newNode) this.currentNode = newNode;
				return newNode;
			}
			if (nextNode) this.currentNode = nextNode;
			return nextNode;
		} else if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let newNode = this.nextNode();
			if (newNode) this.currentNode = newNode;
			return newNode;
		} else return null;
	}
	previousNode() {
		const currentWalker = this._walkerStack[0];
		if (currentWalker.currentNode === currentWalker.root) {
			if (this._currentSetFor.has(currentWalker)) {
				this._currentSetFor.delete(currentWalker);
				if (this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let newNode = this.previousNode();
					if (newNode) this.currentNode = newNode;
					return newNode;
				} else return null;
			}
			return null;
		}
		const previousNode = currentWalker.previousNode();
		if (previousNode) {
			if (previousNode.shadowRoot) {
				let nodeResult;
				if (typeof this.filter === "function") nodeResult = this.filter(previousNode);
				else if (this.filter?.acceptNode) nodeResult = this.filter.acceptNode(previousNode);
				if (nodeResult === NodeFilter.FILTER_ACCEPT) {
					if (previousNode) this.currentNode = previousNode;
					return previousNode;
				}
				let newNode = this.lastChild();
				if (newNode) this.currentNode = newNode;
				return newNode;
			}
			if (previousNode) this.currentNode = previousNode;
			return previousNode;
		} else if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let newNode = this.previousNode();
			if (newNode) this.currentNode = newNode;
			return newNode;
		} else return null;
	}
	/**
	* @deprecated
	*/ nextSibling() {
		return null;
	}
	/**
	* @deprecated
	*/ previousSibling() {
		return null;
	}
	/**
	* @deprecated
	*/ parentNode() {
		return null;
	}
};
function $654b97e09f2a30c1$export$4d0f8be8b12a7ef6(doc, root, whatToShow, filter) {
	if ($6a20a7989e6c817a$export$98658e8c59125e6a()) return new $654b97e09f2a30c1$export$63eb3ababa9c55c4(doc, root, whatToShow, filter);
	return doc.createTreeWalker(root, whatToShow, filter);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/ariaHideOutside.mjs
var $58196c8d6a1f38fc$var$supportsInert = typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
function $58196c8d6a1f38fc$var$isAlwaysVisibleNode(node) {
	return node.dataset.liveAnnouncer === "true" || node.dataset.reactAriaTopLayer !== void 0;
}
var $58196c8d6a1f38fc$var$refCountMap = /* @__PURE__ */ new WeakMap();
var $58196c8d6a1f38fc$var$observerStack = [];
function $58196c8d6a1f38fc$export$1c3ebcada18427bf(targets, options) {
	let windowObj = $d447af545b77c9f1$export$f21a1ffae260145a(targets?.[0]);
	let opts = options instanceof windowObj.Element ? { root: options } : options;
	let root = opts?.root ?? document.body;
	let shouldUseInert = opts?.shouldUseInert && $58196c8d6a1f38fc$var$supportsInert;
	let visibleNodes = new Set(targets);
	let hiddenNodes = /* @__PURE__ */ new Set();
	let getHidden = (element) => {
		return shouldUseInert && element instanceof windowObj.HTMLElement ? element.inert : element.getAttribute("aria-hidden") === "true";
	};
	let setHidden = (element, hidden) => {
		if (shouldUseInert && element instanceof windowObj.HTMLElement) element.inert = hidden;
		else if (hidden) element.setAttribute("aria-hidden", "true");
		else {
			element.removeAttribute("aria-hidden");
			if (element instanceof windowObj.HTMLElement) element.inert = false;
		}
	};
	let shadowRootsToWatch = /* @__PURE__ */ new Set();
	if ($6a20a7989e6c817a$export$98658e8c59125e6a()) for (let target of targets) {
		let node = target;
		while (node && node !== root) {
			let root = node.getRootNode();
			if ("shadowRoot" in root) shadowRootsToWatch.add(root.shadowRoot);
			node = root.parentNode;
		}
	}
	let walk = (root) => {
		for (let element of root.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) visibleNodes.add(element);
		let acceptNode = (node) => {
			if (hiddenNodes.has(node) || visibleNodes.has(node) || node.parentElement && hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
			for (let target of visibleNodes) if ($23f2114a1b82827e$export$4282f70798064fe0(node, target)) return NodeFilter.FILTER_SKIP;
			return NodeFilter.FILTER_ACCEPT;
		};
		let walker = $654b97e09f2a30c1$export$4d0f8be8b12a7ef6($d447af545b77c9f1$export$b204af158042fbac(root), root, NodeFilter.SHOW_ELEMENT, { acceptNode });
		let acceptRoot = acceptNode(root);
		if (acceptRoot === NodeFilter.FILTER_ACCEPT) hide(root);
		if (acceptRoot !== NodeFilter.FILTER_REJECT) {
			let node = walker.nextNode();
			while (node != null) {
				hide(node);
				node = walker.nextNode();
			}
		}
	};
	let hide = (node) => {
		let refCount = $58196c8d6a1f38fc$var$refCountMap.get(node) ?? 0;
		if (getHidden(node) && refCount === 0) return;
		if (refCount === 0) setHidden(node, true);
		hiddenNodes.add(node);
		$58196c8d6a1f38fc$var$refCountMap.set(node, refCount + 1);
	};
	if ($58196c8d6a1f38fc$var$observerStack.length) $58196c8d6a1f38fc$var$observerStack[$58196c8d6a1f38fc$var$observerStack.length - 1].disconnect();
	walk(root);
	let observer = new MutationObserver((changes) => {
		for (let change of changes) {
			if (change.type !== "childList") continue;
			if (change.target.isConnected && ![...visibleNodes, ...hiddenNodes].some((node) => $23f2114a1b82827e$export$4282f70798064fe0(node, change.target))) {
				for (let node of change.addedNodes) if ((node instanceof HTMLElement || node instanceof SVGElement) && $58196c8d6a1f38fc$var$isAlwaysVisibleNode(node)) visibleNodes.add(node);
				else if (node instanceof Element) walk(node);
			}
			if ($6a20a7989e6c817a$export$98658e8c59125e6a()) {
				for (let shadowRoot of shadowRootsToWatch) if (!shadowRoot.isConnected) {
					observer.disconnect();
					break;
				}
			}
		}
	});
	observer.observe(root, {
		childList: true,
		subtree: true
	});
	let shadowObservers = /* @__PURE__ */ new Set();
	if ($6a20a7989e6c817a$export$98658e8c59125e6a()) for (let shadowRoot of shadowRootsToWatch) {
		let shadowObserver = new MutationObserver((changes) => {
			for (let change of changes) {
				if (change.type !== "childList") continue;
				if (change.target.isConnected && ![...visibleNodes, ...hiddenNodes].some((node) => $23f2114a1b82827e$export$4282f70798064fe0(node, change.target))) {
					for (let node of change.addedNodes) if ((node instanceof HTMLElement || node instanceof SVGElement) && $58196c8d6a1f38fc$var$isAlwaysVisibleNode(node)) visibleNodes.add(node);
					else if (node instanceof Element) walk(node);
				}
				if ($6a20a7989e6c817a$export$98658e8c59125e6a()) {
					for (let shadowRoot of shadowRootsToWatch) if (!shadowRoot.isConnected) {
						observer.disconnect();
						break;
					}
				}
			}
		});
		shadowObserver.observe(shadowRoot, {
			childList: true,
			subtree: true
		});
		shadowObservers.add(shadowObserver);
	}
	let observerWrapper = {
		visibleNodes,
		hiddenNodes,
		observe() {
			observer.observe(root, {
				childList: true,
				subtree: true
			});
		},
		disconnect() {
			observer.disconnect();
		}
	};
	$58196c8d6a1f38fc$var$observerStack.push(observerWrapper);
	return () => {
		observer.disconnect();
		if ($6a20a7989e6c817a$export$98658e8c59125e6a()) for (let shadowObserver of shadowObservers) shadowObserver.disconnect();
		for (let node of hiddenNodes) {
			let count = $58196c8d6a1f38fc$var$refCountMap.get(node);
			if (count == null) continue;
			if (count === 1) {
				setHidden(node, false);
				$58196c8d6a1f38fc$var$refCountMap.delete(node);
			} else $58196c8d6a1f38fc$var$refCountMap.set(node, count - 1);
		}
		if (observerWrapper === $58196c8d6a1f38fc$var$observerStack[$58196c8d6a1f38fc$var$observerStack.length - 1]) {
			$58196c8d6a1f38fc$var$observerStack.pop();
			if ($58196c8d6a1f38fc$var$observerStack.length) $58196c8d6a1f38fc$var$observerStack[$58196c8d6a1f38fc$var$observerStack.length - 1].observe();
		} else $58196c8d6a1f38fc$var$observerStack.splice($58196c8d6a1f38fc$var$observerStack.indexOf(observerWrapper), 1);
	};
}
function $58196c8d6a1f38fc$export$1020fa7f77e17884(element) {
	let observer = $58196c8d6a1f38fc$var$observerStack[$58196c8d6a1f38fc$var$observerStack.length - 1];
	if (observer && !observer.visibleNodes.has(element)) {
		observer.visibleNodes.add(element);
		return () => {
			observer.visibleNodes.delete(element);
		};
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isScrollable.mjs
function $901761b40e390936$export$2bb74740c4e19def(node, checkForOverflow) {
	if (!node) return false;
	let style = window.getComputedStyle(node);
	let root = document.scrollingElement || document.documentElement;
	let isScrollable = /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
	if (node === root && style.overflow !== "hidden") isScrollable = true;
	if (isScrollable && checkForOverflow) isScrollable = node.scrollHeight !== node.clientHeight || node.scrollWidth !== node.clientWidth;
	return isScrollable;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEffectEvent.mjs
var $fe16bffc7a557bf0$var$useEarlyEffect = import_react.useInsertionEffect ?? $c4867b2f328c2698$export$e5c5a5f917a5871c;
function $fe16bffc7a557bf0$export$7f54fc3180508a52(fn) {
	const ref = (0, import_react.useRef)(null);
	$fe16bffc7a557bf0$var$useEarlyEffect(() => {
		ref.current = fn;
	}, [fn]);
	return (0, import_react.useCallback)((...args) => {
		const f = ref.current;
		return f?.(...args);
	}, []);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEvent.mjs
function $600b3cf69ae46262$export$90fc3a17d93f704c(ref, event, handler, options) {
	let handleEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(handler);
	let isDisabled = handler == null;
	(0, import_react.useEffect)(() => {
		if (isDisabled || !ref.current) return;
		let element = ref.current;
		element.addEventListener(event, handleEvent, options);
		return () => {
			element.removeEventListener(event, handleEvent, options);
		};
	}, [
		ref,
		event,
		options,
		isDisabled
	]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useFormReset.mjs
function $3274bf1495747a7b$export$5add1d006293d136(ref, initialValue, onReset) {
	let handleReset = $fe16bffc7a557bf0$export$7f54fc3180508a52((e) => {
		if (onReset && !e.defaultPrevented) onReset(initialValue);
	});
	(0, import_react.useEffect)(() => {
		let form = ref?.current?.form;
		form?.addEventListener("reset", handleReset);
		return () => {
			form?.removeEventListener("reset", handleReset);
		};
	}, [ref]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLabels.mjs
function $e8ac3c3f5d4bae7f$export$d6875122194c7b44(props, defaultLabel) {
	let { id, "aria-label": label, "aria-labelledby": labelledBy } = props;
	id = $390e54f620492c70$export$f680877a34711e37(id);
	if (labelledBy && label) labelledBy = [.../* @__PURE__ */ new Set([id, ...labelledBy.trim().split(/\s+/)])].join(" ");
	else if (labelledBy) labelledBy = labelledBy.trim().split(/\s+/).join(" ");
	if (!label && !labelledBy && defaultLabel) label = defaultLabel;
	return {
		id,
		"aria-label": label,
		"aria-labelledby": labelledBy
	};
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var $a747a10fe70a57da$var$localeSymbol = Symbol.for("react-aria.i18n.locale");
var $a747a10fe70a57da$var$stringsSymbol = Symbol.for("react-aria.i18n.strings");
var $a747a10fe70a57da$var$cachedGlobalStrings = void 0;
var $a747a10fe70a57da$export$c17fa47878dc55b6 = class $a747a10fe70a57da$export$c17fa47878dc55b6 {
	constructor(messages, defaultLocale = "en-US") {
		this.strings = Object.fromEntries(Object.entries(messages).filter(([, v]) => v));
		this.defaultLocale = defaultLocale;
	}
	/** Returns a localized string for the given key and locale. */ getStringForLocale(key, locale) {
		let string = this.getStringsForLocale(locale)[key];
		if (!string) throw new Error(`Could not find intl message ${key} in ${locale} locale`);
		return string;
	}
	/** Returns all localized strings for the given locale. */ getStringsForLocale(locale) {
		let strings = this.strings[locale];
		if (!strings) {
			strings = $a747a10fe70a57da$var$getStringsForLocale(locale, this.strings, this.defaultLocale);
			this.strings[locale] = strings;
		}
		return strings;
	}
	static getGlobalDictionaryForPackage(packageName) {
		if (typeof window === "undefined") return null;
		let locale = window[$a747a10fe70a57da$var$localeSymbol];
		if ($a747a10fe70a57da$var$cachedGlobalStrings === void 0) {
			let globalStrings = window[$a747a10fe70a57da$var$stringsSymbol];
			if (!globalStrings) return null;
			$a747a10fe70a57da$var$cachedGlobalStrings = {};
			for (let pkg in globalStrings) $a747a10fe70a57da$var$cachedGlobalStrings[pkg] = new $a747a10fe70a57da$export$c17fa47878dc55b6({ [locale]: globalStrings[pkg] }, locale);
		}
		let dictionary = $a747a10fe70a57da$var$cachedGlobalStrings?.[packageName];
		if (!dictionary) throw new Error(`Strings for package "${packageName}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
		return dictionary;
	}
};
function $a747a10fe70a57da$var$getStringsForLocale(locale, strings, defaultLocale = "en-US") {
	if (strings[locale]) return strings[locale];
	let language = $a747a10fe70a57da$var$getLanguage(locale);
	let script = $a747a10fe70a57da$var$getScript(locale);
	if (script && strings[`${language}-${script}`]) return strings[`${language}-${script}`];
	if (strings[language]) return strings[language];
	for (let key in strings) if (key.startsWith(language + "-")) return strings[key];
	return strings[defaultLocale];
}
function $a747a10fe70a57da$var$getLanguage(locale) {
	if (Intl.Locale) return new Intl.Locale(locale).language;
	return locale.split("-")[0];
}
function $a747a10fe70a57da$var$getScript(locale) {
	if (Intl.Locale) return new Intl.Locale(locale).script;
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var $b27c684a33948c64$var$pluralRulesCache = /* @__PURE__ */ new Map();
var $b27c684a33948c64$var$numberFormatCache = /* @__PURE__ */ new Map();
var $b27c684a33948c64$export$2f817fcdc4b89ae0 = class {
	constructor(locale, strings) {
		this.locale = locale;
		this.strings = strings;
	}
	/** Formats a localized string for the given key with the provided variables. */ format(key, variables) {
		let message = this.strings.getStringForLocale(key, this.locale);
		return typeof message === "function" ? message(variables, this) : message;
	}
	plural(count, options, type = "cardinal") {
		let opt = options["=" + count];
		if (opt) return typeof opt === "function" ? opt() : opt;
		let key = this.locale + ":" + type;
		let pluralRules = $b27c684a33948c64$var$pluralRulesCache.get(key);
		if (!pluralRules) {
			pluralRules = new Intl.PluralRules(this.locale, { type });
			$b27c684a33948c64$var$pluralRulesCache.set(key, pluralRules);
		}
		opt = options[pluralRules.select(count)] || options.other;
		return typeof opt === "function" ? opt() : opt;
	}
	number(value) {
		let numberFormat = $b27c684a33948c64$var$numberFormatCache.get(this.locale);
		if (!numberFormat) {
			numberFormat = new Intl.NumberFormat(this.locale);
			$b27c684a33948c64$var$numberFormatCache.set(this.locale, numberFormat);
		}
		return numberFormat.format(value);
	}
	select(options, value) {
		let opt = options[value] || options.other;
		return typeof opt === "function" ? opt() : opt;
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useLocalizedStringFormatter.mjs
var $cf2482eff2eeeec2$var$cache = /* @__PURE__ */ new WeakMap();
function $cf2482eff2eeeec2$var$getCachedDictionary(strings) {
	let dictionary = $cf2482eff2eeeec2$var$cache.get(strings);
	if (!dictionary) {
		dictionary = new $a747a10fe70a57da$export$c17fa47878dc55b6(strings);
		$cf2482eff2eeeec2$var$cache.set(strings, dictionary);
	}
	return dictionary;
}
function $cf2482eff2eeeec2$export$87b761675e8eaa10(strings, packageName) {
	return packageName && $a747a10fe70a57da$export$c17fa47878dc55b6.getGlobalDictionaryForPackage(packageName) || $cf2482eff2eeeec2$var$getCachedDictionary(strings);
}
function $cf2482eff2eeeec2$export$f12b703ca79dfbb1(strings, packageName) {
	let { locale } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let dictionary = $cf2482eff2eeeec2$export$87b761675e8eaa10(strings, packageName);
	return (0, import_react.useMemo)(() => new $b27c684a33948c64$export$2f817fcdc4b89ae0(locale, dictionary), [locale, dictionary]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useDescription.mjs
var $121970af65029459$var$descriptionId = 0;
var $121970af65029459$var$descriptionNodes = /* @__PURE__ */ new Map();
function $121970af65029459$export$f8aeda7b10753fa1(description) {
	let [id, setId] = (0, import_react.useState)();
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (!description) return;
		let desc = $121970af65029459$var$descriptionNodes.get(description);
		if (!desc) {
			let id = `react-aria-description-${$121970af65029459$var$descriptionId++}`;
			setId(id);
			let node = document.createElement("div");
			node.id = id;
			node.style.display = "none";
			node.textContent = description;
			document.body.appendChild(node);
			desc = {
				refCount: 0,
				element: node
			};
			$121970af65029459$var$descriptionNodes.set(description, desc);
		} else setId(desc.element.id);
		desc.refCount++;
		return () => {
			if (desc && --desc.refCount === 0) {
				desc.element.remove();
				$121970af65029459$var$descriptionNodes.delete(description);
			}
		};
	}, [description]);
	return { "aria-describedby": description ? id : void 0 };
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/runAfterTransition.mjs
var $081cb5757e08788e$var$transitionsByElement = /* @__PURE__ */ new Map();
var $081cb5757e08788e$var$transitionCallbacks = /* @__PURE__ */ new Set();
function $081cb5757e08788e$var$setupGlobalEvents() {
	if (typeof window === "undefined") return;
	function isTransitionEvent(event) {
		return "propertyName" in event;
	}
	let onTransitionStart = (e) => {
		let eventTarget = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		if (!isTransitionEvent(e) || !eventTarget) return;
		let transitions = $081cb5757e08788e$var$transitionsByElement.get(eventTarget);
		if (!transitions) {
			transitions = /* @__PURE__ */ new Set();
			$081cb5757e08788e$var$transitionsByElement.set(eventTarget, transitions);
			eventTarget.addEventListener("transitioncancel", onTransitionEnd, { once: true });
		}
		transitions.add(e.propertyName);
	};
	let onTransitionEnd = (e) => {
		let eventTarget = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		if (!isTransitionEvent(e) || !eventTarget) return;
		let properties = $081cb5757e08788e$var$transitionsByElement.get(eventTarget);
		if (!properties) return;
		properties.delete(e.propertyName);
		if (properties.size === 0) {
			eventTarget.removeEventListener("transitioncancel", onTransitionEnd);
			$081cb5757e08788e$var$transitionsByElement.delete(eventTarget);
		}
		if ($081cb5757e08788e$var$transitionsByElement.size === 0) {
			for (let cb of $081cb5757e08788e$var$transitionCallbacks) cb();
			$081cb5757e08788e$var$transitionCallbacks.clear();
		}
	};
	document.body.addEventListener("transitionrun", onTransitionStart);
	document.body.addEventListener("transitionend", onTransitionEnd);
}
if (typeof document !== "undefined") {
	if (document.readyState !== "loading") $081cb5757e08788e$var$setupGlobalEvents();
	else document.addEventListener("DOMContentLoaded", $081cb5757e08788e$var$setupGlobalEvents);
}
/**
* Cleans up any elements that are no longer in the document.
* This is necessary because we can't rely on transitionend events to fire
* for elements that are removed from the document while transitioning.
*/ function $081cb5757e08788e$var$cleanupDetachedElements() {
	for (const [eventTarget] of $081cb5757e08788e$var$transitionsByElement) if ("isConnected" in eventTarget && !eventTarget.isConnected) $081cb5757e08788e$var$transitionsByElement.delete(eventTarget);
}
function $081cb5757e08788e$export$24490316f764c430(fn) {
	requestAnimationFrame(() => {
		$081cb5757e08788e$var$cleanupDetachedElements();
		if ($081cb5757e08788e$var$transitionsByElement.size === 0) fn();
		else $081cb5757e08788e$var$transitionCallbacks.add(fn);
	});
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/textSelection.mjs
var $cbf007e418543821$var$state = "default";
var $cbf007e418543821$var$savedUserSelect = "";
var $cbf007e418543821$var$modifiedElementMap = /* @__PURE__ */ new WeakMap();
function $cbf007e418543821$export$16a4697467175487(target) {
	if ($2add3ce32c6007eb$export$fedb369cb70207f1()) {
		if ($cbf007e418543821$var$state === "default") {
			const documentObject = $d447af545b77c9f1$export$b204af158042fbac(target);
			$cbf007e418543821$var$savedUserSelect = documentObject.documentElement.style.webkitUserSelect;
			documentObject.documentElement.style.webkitUserSelect = "none";
		}
		$cbf007e418543821$var$state = "disabled";
	} else if (target instanceof HTMLElement || target instanceof SVGElement) {
		let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
		$cbf007e418543821$var$modifiedElementMap.set(target, target.style[property]);
		target.style[property] = "none";
	}
}
function $cbf007e418543821$export$b0d6fa1ab32e3295(target) {
	if ($2add3ce32c6007eb$export$fedb369cb70207f1()) {
		if ($cbf007e418543821$var$state !== "disabled") return;
		$cbf007e418543821$var$state = "restoring";
		setTimeout(() => {
			$081cb5757e08788e$export$24490316f764c430(() => {
				if ($cbf007e418543821$var$state === "restoring") {
					const documentObject = $d447af545b77c9f1$export$b204af158042fbac(target);
					if (documentObject.documentElement.style.webkitUserSelect === "none") documentObject.documentElement.style.webkitUserSelect = $cbf007e418543821$var$savedUserSelect || "";
					$cbf007e418543821$var$savedUserSelect = "";
					$cbf007e418543821$var$state = "default";
				}
			});
		}, 300);
	} else if (target instanceof HTMLElement || target instanceof SVGElement) {
		if (target && $cbf007e418543821$var$modifiedElementMap.has(target)) {
			let targetOldUserSelect = $cbf007e418543821$var$modifiedElementMap.get(target);
			let property = "userSelect" in target.style ? "userSelect" : "webkitUserSelect";
			if (target.style[property] === "none") target.style[property] = targetOldUserSelect;
			if (target.getAttribute("style") === "") target.removeAttribute("style");
			$cbf007e418543821$var$modifiedElementMap.delete(target);
		}
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getNonce.mjs
function $2b2d34ff061957fb$var$getWebpackNonce(doc) {
	return (doc?.defaultView)?.__webpack_nonce__ || globalThis["__webpack_nonce__"] || void 0;
}
var $2b2d34ff061957fb$var$nonceCache = /* @__PURE__ */ new WeakMap();
function $2b2d34ff061957fb$export$2b85b721e524d74b(doc) {
	let d = doc ?? (typeof document !== "undefined" ? document : void 0);
	if (!d) return $2b2d34ff061957fb$var$getWebpackNonce(d);
	if ($2b2d34ff061957fb$var$nonceCache.has(d)) return $2b2d34ff061957fb$var$nonceCache.get(d);
	let meta = d.querySelector("meta[property=\"csp-nonce\"]");
	let nonce = meta && meta instanceof $d447af545b77c9f1$export$f21a1ffae260145a(meta).HTMLMetaElement && (meta.nonce || meta.content) || $2b2d34ff061957fb$var$getWebpackNonce(d) || void 0;
	if (nonce !== void 0) $2b2d34ff061957fb$var$nonceCache.set(d, nonce);
	return nonce;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/context.mjs
var $24f9a20f226ad820$export$5165eccb35aaadb5 = import_react.createContext({ register: () => {} });
$24f9a20f226ad820$export$5165eccb35aaadb5.displayName = "PressResponderContext";
//#endregion
//#region node_modules/react-aria/dist/private/utils/useSyncRef.mjs
function $b7115c395c64f7b5$export$4debdb1a3f0fa79e(context, ref) {
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (context && context.ref && ref) {
			context.ref.current = ref.current;
			return () => {
				if (context.ref) context.ref.current = null;
			};
		}
	});
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/usePress.mjs
function $d27d541f9569d26d$var$usePressResponderContext(props) {
	let context = (0, import_react.useContext)($24f9a20f226ad820$export$5165eccb35aaadb5);
	if (context) {
		let { register, ref, ...contextProps } = context;
		props = $bbaa08b3cd72f041$export$9d1611c77c2fe928(contextProps, props);
		register();
	}
	$b7115c395c64f7b5$export$4debdb1a3f0fa79e(context, props.ref);
	return props;
}
var $d27d541f9569d26d$var$PressEvent = class {
	#shouldStopPropagation;
	constructor(type, pointerType, originalEvent, state) {
		this.#shouldStopPropagation = true;
		const rect = (state?.target ?? originalEvent.currentTarget)?.getBoundingClientRect();
		let x, y = 0;
		let clientX, clientY = null;
		if (originalEvent.clientX != null && originalEvent.clientY != null) {
			clientX = originalEvent.clientX;
			clientY = originalEvent.clientY;
		}
		if (rect) {
			if (clientX != null && clientY != null) {
				x = clientX - rect.left;
				y = clientY - rect.top;
			} else {
				x = rect.width / 2;
				y = rect.height / 2;
			}
		}
		this.type = type;
		this.pointerType = pointerType;
		this.target = originalEvent.currentTarget;
		this.shiftKey = originalEvent.shiftKey;
		this.metaKey = originalEvent.metaKey;
		this.ctrlKey = originalEvent.ctrlKey;
		this.altKey = originalEvent.altKey;
		this.x = x;
		this.y = y;
		this.key = originalEvent.key;
	}
	continuePropagation() {
		this.#shouldStopPropagation = false;
	}
	get shouldStopPropagation() {
		return this.#shouldStopPropagation;
	}
};
var $d27d541f9569d26d$var$LINK_CLICKED = Symbol("linkClicked");
var $d27d541f9569d26d$var$STYLE_ID = "react-aria-pressable-style";
var $d27d541f9569d26d$var$PRESSABLE_ATTRIBUTE = "data-react-aria-pressable";
function $d27d541f9569d26d$export$45712eceda6fad21(props) {
	let { onPress, onPressChange, onPressStart, onPressEnd, onPressUp, onClick, isDisabled, isPressed: isPressedProp, preventFocusOnPress, shouldCancelOnPointerExit, allowTextSelectionOnPress, ref: domRef, ...domProps } = $d27d541f9569d26d$var$usePressResponderContext(props);
	let [isPressed, setPressed] = (0, import_react.useState)(false);
	let ref = (0, import_react.useRef)({
		isPressed: false,
		ignoreEmulatedMouseEvents: false,
		didFirePressStart: false,
		isTriggeringEvent: false,
		activePointerId: null,
		target: null,
		isOverTarget: false,
		pointerType: null,
		disposables: []
	});
	let { addGlobalListener, removeAllGlobalListeners } = $48a7d519b337145d$export$4eaf04e54aa8eed6();
	let triggerPressStart = (0, import_react.useCallback)((originalEvent, pointerType) => {
		let state = ref.current;
		if (isDisabled || state.didFirePressStart) return false;
		let shouldStopPropagation = true;
		state.isTriggeringEvent = true;
		if (onPressStart) {
			let event = new $d27d541f9569d26d$var$PressEvent("pressstart", pointerType, originalEvent);
			onPressStart(event);
			shouldStopPropagation = event.shouldStopPropagation;
		}
		if (onPressChange) onPressChange(true);
		state.isTriggeringEvent = false;
		state.didFirePressStart = true;
		setPressed(true);
		return shouldStopPropagation;
	}, [
		isDisabled,
		onPressStart,
		onPressChange
	]);
	let triggerPressEnd = (0, import_react.useCallback)((originalEvent, pointerType, wasPressed = true) => {
		let state = ref.current;
		if (!state.didFirePressStart) return false;
		state.didFirePressStart = false;
		state.isTriggeringEvent = true;
		let shouldStopPropagation = true;
		if (onPressEnd) {
			let event = new $d27d541f9569d26d$var$PressEvent("pressend", pointerType, originalEvent);
			onPressEnd(event);
			shouldStopPropagation = event.shouldStopPropagation;
		}
		if (onPressChange) onPressChange(false);
		setPressed(false);
		if (onPress && wasPressed && !isDisabled) {
			let event = new $d27d541f9569d26d$var$PressEvent("press", pointerType, originalEvent);
			onPress(event);
			shouldStopPropagation &&= event.shouldStopPropagation;
		}
		state.isTriggeringEvent = false;
		return shouldStopPropagation;
	}, [
		isDisabled,
		onPressEnd,
		onPressChange,
		onPress
	]);
	let triggerPressEndEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(triggerPressEnd);
	let triggerPressUpEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52((0, import_react.useCallback)((originalEvent, pointerType) => {
		let state = ref.current;
		if (isDisabled) return false;
		if (onPressUp) {
			state.isTriggeringEvent = true;
			let event = new $d27d541f9569d26d$var$PressEvent("pressup", pointerType, originalEvent);
			onPressUp(event);
			state.isTriggeringEvent = false;
			return event.shouldStopPropagation;
		}
		return true;
	}, [isDisabled, onPressUp]));
	let cancel = (0, import_react.useCallback)((e) => {
		let state = ref.current;
		if (state.isPressed && state.target) {
			if (state.didFirePressStart && state.pointerType != null) triggerPressEnd($d27d541f9569d26d$var$createEvent(state.target, e), state.pointerType, false);
			state.isPressed = false;
			state.isOverTarget = false;
			state.activePointerId = null;
			state.pointerType = null;
			removeAllGlobalListeners();
			if (!allowTextSelectionOnPress) $cbf007e418543821$export$b0d6fa1ab32e3295(state.target);
			for (let dispose of state.disposables) dispose();
			state.disposables = [];
		}
	}, [
		allowTextSelectionOnPress,
		removeAllGlobalListeners,
		triggerPressEnd
	]);
	let cancelEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(cancel);
	(0, import_react.useEffect)(() => {
		if (isDisabled && ref.current.isPressed) cancelEvent({
			currentTarget: ref.current.target,
			shiftKey: false,
			ctrlKey: false,
			metaKey: false,
			altKey: false
		});
	}, [isDisabled]);
	let cancelOnPointerExit = (0, import_react.useCallback)((e) => {
		if (shouldCancelOnPointerExit) cancel(e);
	}, [shouldCancelOnPointerExit, cancel]);
	let triggerClick = (0, import_react.useCallback)((e) => {
		if (isDisabled) return;
		onClick?.(e);
	}, [isDisabled, onClick]);
	let triggerSyntheticClick = (0, import_react.useCallback)((e, target) => {
		if (isDisabled) return;
		if (onClick) {
			let event = new MouseEvent("click", e);
			$a92dc41f639950be$export$c2b7abe5d61ec696(event, target);
			onClick($a92dc41f639950be$export$525bc4921d56d4a(event));
		}
	}, [isDisabled, onClick]);
	let pressProps = (0, import_react.useMemo)(() => {
		let state = ref.current;
		let pressProps = {
			onKeyDown(e) {
				if ($d27d541f9569d26d$var$isValidKeyboardEvent(e.nativeEvent, e.currentTarget) && $23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) {
					if ($d27d541f9569d26d$var$shouldPreventDefaultKeyboard($23f2114a1b82827e$export$e58f029f0fbfdb29(e), e.key)) e.preventDefault();
					let shouldStopPropagation = true;
					if (!state.isPressed && !e.repeat) {
						state.target = e.currentTarget;
						state.isPressed = true;
						state.pointerType = "keyboard";
						shouldStopPropagation = triggerPressStart(e, "keyboard");
					}
					let originalTarget = e.currentTarget;
					let pressUp = (e) => {
						if ($d27d541f9569d26d$var$isValidKeyboardEvent(e, originalTarget) && !e.repeat && $23f2114a1b82827e$export$4282f70798064fe0(originalTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e)) && state.target) triggerPressUpEvent($d27d541f9569d26d$var$createEvent(state.target, e), "keyboard");
					};
					addGlobalListener($d447af545b77c9f1$export$b204af158042fbac(e.currentTarget), "keyup", $a4e76a5424781910$export$e08e3b67e392101e(pressUp, onKeyUp), true);
					if (shouldStopPropagation) e.stopPropagation();
					if (e.metaKey && $2add3ce32c6007eb$export$9ac100e40613ea10()) state.metaKeyEvents?.set(e.key, e.nativeEvent);
				} else if (e.key === "Meta") state.metaKeyEvents = /* @__PURE__ */ new Map();
			},
			onClick(e) {
				if (e && !$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
				if (e && e.button === 0 && !state.isTriggeringEvent && !$caaf0dd3060ed57c$export$95185d699e05d4d7.isOpening) {
					let shouldStopPropagation = true;
					if (isDisabled) e.preventDefault();
					if (!state.ignoreEmulatedMouseEvents && !state.isPressed && (state.pointerType === "virtual" || $b5c62b033c25b96d$export$60278871457622de(e.nativeEvent))) {
						let stopPressStart = triggerPressStart(e, "virtual");
						let stopPressUp = triggerPressUpEvent(e, "virtual");
						let stopPressEnd = triggerPressEndEvent(e, "virtual");
						triggerClick(e);
						shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
					} else if (state.isPressed && state.pointerType !== "keyboard") {
						let pointerType = state.pointerType || e.nativeEvent.pointerType || "virtual";
						let stopPressUp = triggerPressUpEvent($d27d541f9569d26d$var$createEvent(e.currentTarget, e), pointerType);
						let stopPressEnd = triggerPressEndEvent($d27d541f9569d26d$var$createEvent(e.currentTarget, e), pointerType, true);
						shouldStopPropagation = stopPressUp && stopPressEnd;
						state.isOverTarget = false;
						triggerClick(e);
						cancelEvent(e);
					}
					state.ignoreEmulatedMouseEvents = false;
					if (shouldStopPropagation) e.stopPropagation();
				}
			}
		};
		let onKeyUp = (e) => {
			if (state.isPressed && state.target && $d27d541f9569d26d$var$isValidKeyboardEvent(e, state.target)) {
				if ($d27d541f9569d26d$var$shouldPreventDefaultKeyboard($23f2114a1b82827e$export$e58f029f0fbfdb29(e), e.key)) e.preventDefault();
				let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
				let wasPressed = $23f2114a1b82827e$export$4282f70798064fe0(state.target, target);
				triggerPressEndEvent($d27d541f9569d26d$var$createEvent(state.target, e), "keyboard", wasPressed);
				if (wasPressed) triggerSyntheticClick(e, state.target);
				removeAllGlobalListeners();
				if (e.key !== "Enter" && $d27d541f9569d26d$var$isHTMLAnchorLink(state.target) && $23f2114a1b82827e$export$4282f70798064fe0(state.target, target) && !e[$d27d541f9569d26d$var$LINK_CLICKED]) {
					e[$d27d541f9569d26d$var$LINK_CLICKED] = true;
					$caaf0dd3060ed57c$export$95185d699e05d4d7(state.target, e, false);
				}
				state.isPressed = false;
				state.metaKeyEvents?.delete(e.key);
			} else if (e.key === "Meta" && state.metaKeyEvents?.size) {
				let events = state.metaKeyEvents;
				state.metaKeyEvents = void 0;
				for (let event of events.values()) state.target?.dispatchEvent(new KeyboardEvent("keyup", event));
			}
		};
		if (typeof PointerEvent !== "undefined") {
			pressProps.onPointerDown = (e) => {
				if (e.button !== 0 || !$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
				if ($b5c62b033c25b96d$export$29bf1b5f2c56cf63(e.nativeEvent)) {
					state.pointerType = "virtual";
					return;
				}
				state.pointerType = e.pointerType;
				let shouldStopPropagation = true;
				if (!state.isPressed) {
					state.isPressed = true;
					state.isOverTarget = true;
					state.activePointerId = e.pointerId;
					state.target = e.currentTarget;
					if (!allowTextSelectionOnPress) $cbf007e418543821$export$16a4697467175487(state.target);
					shouldStopPropagation = triggerPressStart(e, state.pointerType);
					let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
					if ("releasePointerCapture" in target) {
						if ("hasPointerCapture" in target) {
							if (target.hasPointerCapture(e.pointerId)) target.releasePointerCapture(e.pointerId);
						} else target.releasePointerCapture(e.pointerId);
					}
					addGlobalListener($d447af545b77c9f1$export$b204af158042fbac(e.currentTarget), "pointerup", onPointerUp, false);
					addGlobalListener($d447af545b77c9f1$export$b204af158042fbac(e.currentTarget), "pointercancel", onPointerCancel, false);
				}
				if (shouldStopPropagation) e.stopPropagation();
			};
			pressProps.onMouseDown = (e) => {
				if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
				if (e.button === 0) {
					if (preventFocusOnPress) {
						let dispose = $a92dc41f639950be$export$cabe61c495ee3649(e.target);
						if (dispose) state.disposables.push(dispose);
					}
					e.stopPropagation();
				}
			};
			pressProps.onPointerUp = (e) => {
				if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e)) || state.pointerType === "virtual") return;
				if (e.button === 0 && !state.isPressed) triggerPressUpEvent(e, state.pointerType || e.pointerType);
			};
			pressProps.onPointerEnter = (e) => {
				if (e.pointerId === state.activePointerId && state.target && !state.isOverTarget && state.pointerType != null) {
					state.isOverTarget = true;
					triggerPressStart($d27d541f9569d26d$var$createEvent(state.target, e), state.pointerType);
				}
			};
			pressProps.onPointerLeave = (e) => {
				if (e.pointerId === state.activePointerId && state.target && state.isOverTarget && state.pointerType != null) {
					state.isOverTarget = false;
					triggerPressEndEvent($d27d541f9569d26d$var$createEvent(state.target, e), state.pointerType, false);
					cancelOnPointerExit(e);
				}
			};
			let onPointerUp = (e) => {
				if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0 && state.target) {
					if ($23f2114a1b82827e$export$4282f70798064fe0(state.target, $23f2114a1b82827e$export$e58f029f0fbfdb29(e)) && state.pointerType != null) {
						let clicked = false;
						let timeout = setTimeout(() => {
							if (state.isPressed && state.target instanceof HTMLElement) {
								if (clicked) cancelEvent(e);
								else {
									$1969ac565cfec8d0$export$de79e2c695e052f3(state.target);
									state.target.click();
								}
							}
						}, 80);
						addGlobalListener(e.currentTarget, "click", () => clicked = true, true);
						state.disposables.push(() => clearTimeout(timeout));
					} else cancelEvent(e);
					state.isOverTarget = false;
				}
			};
			let onPointerCancel = (e) => {
				cancelEvent(e);
			};
			pressProps.onDragStart = (e) => {
				if (!$23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) return;
				cancelEvent(e);
			};
		}
		return pressProps;
	}, [
		addGlobalListener,
		isDisabled,
		preventFocusOnPress,
		removeAllGlobalListeners,
		allowTextSelectionOnPress,
		cancelOnPointerExit,
		triggerPressStart,
		triggerClick,
		triggerSyntheticClick
	]);
	(0, import_react.useEffect)(() => {
		if (!domRef || false) return;
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(domRef.current);
		if (!ownerDocument || !ownerDocument.head || ownerDocument.getElementById($d27d541f9569d26d$var$STYLE_ID)) return;
		const style = ownerDocument.createElement("style");
		style.id = $d27d541f9569d26d$var$STYLE_ID;
		let nonce = $2b2d34ff061957fb$export$2b85b721e524d74b(ownerDocument);
		if (nonce) style.nonce = nonce;
		style.textContent = `
@layer {
  [${$d27d541f9569d26d$var$PRESSABLE_ATTRIBUTE}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim();
		ownerDocument.head.prepend(style);
	}, [domRef]);
	(0, import_react.useEffect)(() => {
		let state = ref.current;
		return () => {
			if (!allowTextSelectionOnPress) $cbf007e418543821$export$b0d6fa1ab32e3295(state.target ?? void 0);
			for (let dispose of state.disposables) dispose();
			state.disposables = [];
		};
	}, [allowTextSelectionOnPress]);
	return {
		isPressed: isPressedProp || isPressed,
		pressProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(domProps, pressProps, { [$d27d541f9569d26d$var$PRESSABLE_ATTRIBUTE]: true })
	};
}
function $d27d541f9569d26d$var$isHTMLAnchorLink(target) {
	return target.tagName === "A" && target.hasAttribute("href");
}
function $d27d541f9569d26d$var$isValidKeyboardEvent(event, currentTarget) {
	const { key, code } = event;
	const element = currentTarget;
	const role = element.getAttribute("role");
	return (key === "Enter" || key === " " || key === "Spacebar" || code === "Space") && !(element instanceof $d447af545b77c9f1$export$f21a1ffae260145a(element).HTMLInputElement && !$d27d541f9569d26d$var$isValidInputKey(element, key) || element instanceof $d447af545b77c9f1$export$f21a1ffae260145a(element).HTMLTextAreaElement || element.isContentEditable) && !((role === "link" || !role && $d27d541f9569d26d$var$isHTMLAnchorLink(element)) && key !== "Enter");
}
function $d27d541f9569d26d$var$createEvent(target, e) {
	let clientX = e.clientX;
	let clientY = e.clientY;
	return {
		currentTarget: target,
		shiftKey: e.shiftKey,
		ctrlKey: e.ctrlKey,
		metaKey: e.metaKey,
		altKey: e.altKey,
		clientX,
		clientY,
		key: e.key
	};
}
function $d27d541f9569d26d$var$shouldPreventDefaultUp(target) {
	if (target instanceof HTMLInputElement) return false;
	if (target instanceof HTMLButtonElement) return target.type !== "submit" && target.type !== "reset";
	if ($d27d541f9569d26d$var$isHTMLAnchorLink(target)) return false;
	return true;
}
function $d27d541f9569d26d$var$shouldPreventDefaultKeyboard(target, key) {
	if (target instanceof HTMLInputElement) return !$d27d541f9569d26d$var$isValidInputKey(target, key);
	return $d27d541f9569d26d$var$shouldPreventDefaultUp(target);
}
var $d27d541f9569d26d$var$nonTextInputTypes = /* @__PURE__ */ new Set([
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
function $d27d541f9569d26d$var$isValidInputKey(target, key) {
	return target.type === "checkbox" || target.type === "radio" ? key === " " : $d27d541f9569d26d$var$nonTextInputTypes.has(target.type);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useCloseOnScroll.mjs
var $22e2f5f6490788e8$export$f6211563215e3b37 = /* @__PURE__ */ new WeakMap();
function $22e2f5f6490788e8$export$18fc8428861184da(opts) {
	let { triggerRef, isOpen, onClose } = opts;
	(0, import_react.useEffect)(() => {
		if (!isOpen || onClose === null) return;
		let onScroll = (e) => {
			let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
			if (!triggerRef.current || target instanceof Node && !$23f2114a1b82827e$export$4282f70798064fe0(target, triggerRef.current)) return;
			if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
			let onCloseHandler = onClose || $22e2f5f6490788e8$export$f6211563215e3b37.get(triggerRef.current);
			if (onCloseHandler) onCloseHandler();
		};
		window.addEventListener("scroll", onScroll, true);
		return () => {
			window.removeEventListener("scroll", onScroll, true);
		};
	}, [
		isOpen,
		onClose,
		triggerRef
	]);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlayTrigger.mjs
function $f282e36c29c025e8$export$f9d5c8beee7d008d(props, state, ref) {
	let { type } = props;
	let { isOpen } = state;
	(0, import_react.useEffect)(() => {
		if (ref && ref.current) $22e2f5f6490788e8$export$f6211563215e3b37.set(ref.current, state.close);
	});
	let ariaHasPopup = void 0;
	if (type === "menu") ariaHasPopup = true;
	else if (type === "listbox") ariaHasPopup = "listbox";
	let overlayId = $390e54f620492c70$export$f680877a34711e37();
	return {
		triggerProps: {
			"aria-haspopup": ariaHasPopup,
			"aria-expanded": isOpen,
			"aria-controls": isOpen ? overlayId : void 0,
			onPress: state.toggle
		},
		overlayProps: { id: overlayId }
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/focusSafely.mjs
function $f192c2f16961cbe0$export$80f3e147d781571c(element) {
	if (!element.isConnected) return;
	const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(element);
	if ($8f5a2122b0992be3$export$630ff653c5ada6a9() === "virtual") {
		let lastFocusedElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument);
		$081cb5757e08788e$export$24490316f764c430(() => {
			const activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument);
			if ((activeElement === lastFocusedElement || activeElement === ownerDocument.body) && element.isConnected) $1969ac565cfec8d0$export$de79e2c695e052f3(element);
		});
	} else $1969ac565cfec8d0$export$de79e2c695e052f3(element);
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/FocusScope.mjs
var $535772f9d2c1f38d$var$FocusContext = /*#__PURE__*/ import_react.createContext(null);
var $535772f9d2c1f38d$var$RESTORE_FOCUS_EVENT = "react-aria-focus-scope-restore";
var $535772f9d2c1f38d$var$activeScope = null;
function $535772f9d2c1f38d$export$20e40289641fbbb6(props) {
	let { children, contain, restoreFocus, autoFocus } = props;
	let startRef = (0, import_react.useRef)(null);
	let endRef = (0, import_react.useRef)(null);
	let scopeRef = (0, import_react.useRef)([]);
	let { parentNode } = (0, import_react.useContext)($535772f9d2c1f38d$var$FocusContext) || {};
	let node = (0, import_react.useMemo)(() => new $535772f9d2c1f38d$var$TreeNode({ scopeRef }), [scopeRef]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let parent = parentNode || $535772f9d2c1f38d$export$d06fae2ee68b101e.root;
		if ($535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(parent.scopeRef) && $535772f9d2c1f38d$var$activeScope && !$535772f9d2c1f38d$var$isAncestorScope($535772f9d2c1f38d$var$activeScope, parent.scopeRef)) {
			let activeNode = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode($535772f9d2c1f38d$var$activeScope);
			if (activeNode) parent = activeNode;
		}
		parent.addChild(node);
		$535772f9d2c1f38d$export$d06fae2ee68b101e.addNode(node);
	}, [node, parentNode]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let node = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scopeRef);
		if (node) node.contain = !!contain;
	}, [contain]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let node = startRef.current?.nextSibling;
		let nodes = [];
		let stopPropagation = (e) => e.stopPropagation();
		while (node && node !== endRef.current) {
			nodes.push(node);
			node.addEventListener($535772f9d2c1f38d$var$RESTORE_FOCUS_EVENT, stopPropagation);
			node = node.nextSibling;
		}
		scopeRef.current = nodes;
		return () => {
			for (let node of nodes) node.removeEventListener($535772f9d2c1f38d$var$RESTORE_FOCUS_EVENT, stopPropagation);
		};
	}, [children]);
	$535772f9d2c1f38d$var$useActiveScopeTracker(scopeRef, restoreFocus, contain);
	$535772f9d2c1f38d$var$useFocusContainment(scopeRef, contain);
	$535772f9d2c1f38d$var$useRestoreFocus(scopeRef, restoreFocus, contain);
	$535772f9d2c1f38d$var$useAutoFocus(scopeRef, autoFocus);
	(0, import_react.useEffect)(() => {
		const activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0));
		let scope = null;
		if ($535772f9d2c1f38d$var$isElementInScope(activeElement, scopeRef.current)) {
			for (let node of $535772f9d2c1f38d$export$d06fae2ee68b101e.traverse()) if (node.scopeRef && $535772f9d2c1f38d$var$isElementInScope(activeElement, node.scopeRef.current)) scope = node;
			if (scope === $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scopeRef)) $535772f9d2c1f38d$var$activeScope = scope.scopeRef;
		}
	}, [scopeRef]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		return () => {
			let parentScope = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scopeRef)?.parent?.scopeRef ?? null;
			if ((scopeRef === $535772f9d2c1f38d$var$activeScope || $535772f9d2c1f38d$var$isAncestorScope(scopeRef, $535772f9d2c1f38d$var$activeScope)) && (!parentScope || $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(parentScope))) $535772f9d2c1f38d$var$activeScope = parentScope;
			$535772f9d2c1f38d$export$d06fae2ee68b101e.removeTreeNode(scopeRef);
		};
	}, [scopeRef]);
	let focusManager = (0, import_react.useMemo)(() => $535772f9d2c1f38d$var$createFocusManagerForScope(scopeRef), []);
	let value = (0, import_react.useMemo)(() => ({
		focusManager,
		parentNode: node
	}), [node, focusManager]);
	return /*#__PURE__*/ import_react.createElement($535772f9d2c1f38d$var$FocusContext.Provider, { value }, /*#__PURE__*/ import_react.createElement("span", {
		"data-focus-scope-start": true,
		hidden: true,
		ref: startRef
	}), children, /*#__PURE__*/ import_react.createElement("span", {
		"data-focus-scope-end": true,
		hidden: true,
		ref: endRef
	}));
}
function $535772f9d2c1f38d$var$createFocusManagerForScope(scopeRef) {
	return {
		focusNext(opts = {}) {
			let scope = scopeRef.current;
			let { from, tabbable, wrap, accept } = opts;
			let node = from || $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(scope[0] ?? void 0));
			let sentinel = scope[0].previousElementSibling;
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa($535772f9d2c1f38d$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = $535772f9d2c1f38d$var$isElementInScope(node, scope) ? node : sentinel;
			let nextNode = walker.nextNode();
			if (!nextNode && wrap) {
				walker.currentNode = sentinel;
				nextNode = walker.nextNode();
			}
			if (nextNode) $535772f9d2c1f38d$var$focusElement(nextNode, true);
			return nextNode;
		},
		focusPrevious(opts = {}) {
			let scope = scopeRef.current;
			let { from, tabbable, wrap, accept } = opts;
			let node = from || $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(scope[0] ?? void 0));
			let sentinel = scope[scope.length - 1].nextElementSibling;
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa($535772f9d2c1f38d$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = $535772f9d2c1f38d$var$isElementInScope(node, scope) ? node : sentinel;
			let previousNode = walker.previousNode();
			if (!previousNode && wrap) {
				walker.currentNode = sentinel;
				previousNode = walker.previousNode();
			}
			if (previousNode) $535772f9d2c1f38d$var$focusElement(previousNode, true);
			return previousNode;
		},
		focusFirst(opts = {}) {
			let scope = scopeRef.current;
			let { tabbable, accept } = opts;
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa($535772f9d2c1f38d$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = scope[0].previousElementSibling;
			let nextNode = walker.nextNode();
			if (nextNode) $535772f9d2c1f38d$var$focusElement(nextNode, true);
			return nextNode;
		},
		focusLast(opts = {}) {
			let scope = scopeRef.current;
			let { tabbable, accept } = opts;
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa($535772f9d2c1f38d$var$getScopeRoot(scope), {
				tabbable,
				accept
			}, scope);
			walker.currentNode = scope[scope.length - 1].nextElementSibling;
			let previousNode = walker.previousNode();
			if (previousNode) $535772f9d2c1f38d$var$focusElement(previousNode, true);
			return previousNode;
		}
	};
}
function $535772f9d2c1f38d$var$getScopeRoot(scope) {
	return scope[0].parentElement;
}
function $535772f9d2c1f38d$var$shouldContainFocus(scopeRef) {
	let scope = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode($535772f9d2c1f38d$var$activeScope);
	while (scope && scope.scopeRef !== scopeRef) {
		if (scope.contain) return false;
		scope = scope.parent;
	}
	return true;
}
function $535772f9d2c1f38d$var$getRadiosInGroup(element) {
	if (!element.form) return Array.from($d447af545b77c9f1$export$b204af158042fbac(element).querySelectorAll(`input[type="radio"][name="${CSS.escape(element.name)}"]`)).filter((radio) => !radio.form);
	const radioList = element.form.elements.namedItem(element.name);
	let ownerWindow = $d447af545b77c9f1$export$f21a1ffae260145a(element);
	if (radioList instanceof ownerWindow.RadioNodeList) return Array.from(radioList).filter((el) => el instanceof ownerWindow.HTMLInputElement);
	if (radioList instanceof ownerWindow.HTMLInputElement) return [radioList];
	return [];
}
function $535772f9d2c1f38d$var$isTabbableRadio(element) {
	if (element.checked) return true;
	const radios = $535772f9d2c1f38d$var$getRadiosInGroup(element);
	return radios.length > 0 && !radios.some((radio) => radio.checked);
}
function $535772f9d2c1f38d$var$useFocusContainment(scopeRef, contain) {
	let focusedNode = (0, import_react.useRef)(void 0);
	let raf = (0, import_react.useRef)(void 0);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let scope = scopeRef.current;
		if (!contain) {
			if (raf.current) {
				cancelAnimationFrame(raf.current);
				raf.current = void 0;
			}
			return;
		}
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(scope ? scope[0] : void 0);
		let onKeyDown = (e) => {
			if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !$535772f9d2c1f38d$var$shouldContainFocus(scopeRef) || e.isComposing) return;
			let focusedElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument);
			let scope = scopeRef.current;
			if (!scope || !$535772f9d2c1f38d$var$isElementInScope(focusedElement, scope)) return;
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa($535772f9d2c1f38d$var$getScopeRoot(scope), { tabbable: true }, scope);
			if (!focusedElement) return;
			walker.currentNode = focusedElement;
			let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
			if (!nextElement) {
				walker.currentNode = e.shiftKey ? scope[scope.length - 1].nextElementSibling : scope[0].previousElementSibling;
				nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
			}
			e.preventDefault();
			if (nextElement) {
				$535772f9d2c1f38d$var$focusElement(nextElement, true);
				if (nextElement instanceof $d447af545b77c9f1$export$f21a1ffae260145a(nextElement).HTMLInputElement) nextElement.select();
			}
		};
		let onFocus = (e) => {
			if ((!$535772f9d2c1f38d$var$activeScope || $535772f9d2c1f38d$var$isAncestorScope($535772f9d2c1f38d$var$activeScope, scopeRef)) && $535772f9d2c1f38d$var$isElementInScope($23f2114a1b82827e$export$e58f029f0fbfdb29(e), scopeRef.current)) {
				$535772f9d2c1f38d$var$activeScope = scopeRef;
				focusedNode.current = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
			} else if ($535772f9d2c1f38d$var$shouldContainFocus(scopeRef) && !$535772f9d2c1f38d$var$isElementInChildScope($23f2114a1b82827e$export$e58f029f0fbfdb29(e), scopeRef)) {
				if (focusedNode.current) focusedNode.current.focus();
				else if ($535772f9d2c1f38d$var$activeScope && $535772f9d2c1f38d$var$activeScope.current) $535772f9d2c1f38d$var$focusFirstInScope($535772f9d2c1f38d$var$activeScope.current);
			} else if ($535772f9d2c1f38d$var$shouldContainFocus(scopeRef)) focusedNode.current = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		};
		let onBlur = (e) => {
			if (raf.current) cancelAnimationFrame(raf.current);
			raf.current = requestAnimationFrame(() => {
				let modality = $8f5a2122b0992be3$export$630ff653c5ada6a9();
				let shouldSkipFocusRestore = (modality === "virtual" || modality === null) && $2add3ce32c6007eb$export$a11b0059900ceec8() && $2add3ce32c6007eb$export$6446a186d09e379e();
				let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument);
				if (!shouldSkipFocusRestore && activeElement && $535772f9d2c1f38d$var$shouldContainFocus(scopeRef) && !$535772f9d2c1f38d$var$isElementInChildScope(activeElement, scopeRef)) {
					$535772f9d2c1f38d$var$activeScope = scopeRef;
					let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
					if (target && target.isConnected) {
						focusedNode.current = target;
						focusedNode.current?.focus();
					} else if ($535772f9d2c1f38d$var$activeScope.current) $535772f9d2c1f38d$var$focusFirstInScope($535772f9d2c1f38d$var$activeScope.current);
				}
			});
		};
		ownerDocument.addEventListener("keydown", onKeyDown, false);
		ownerDocument.addEventListener("focusin", onFocus, false);
		scope?.forEach((element) => element.addEventListener("focusin", onFocus, false));
		scope?.forEach((element) => element.addEventListener("focusout", onBlur, false));
		return () => {
			ownerDocument.removeEventListener("keydown", onKeyDown, false);
			ownerDocument.removeEventListener("focusin", onFocus, false);
			scope?.forEach((element) => element.removeEventListener("focusin", onFocus, false));
			scope?.forEach((element) => element.removeEventListener("focusout", onBlur, false));
		};
	}, [scopeRef, contain]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		return () => {
			if (raf.current) cancelAnimationFrame(raf.current);
		};
	}, [raf]);
}
function $535772f9d2c1f38d$var$isElementInAnyScope(element) {
	return $535772f9d2c1f38d$var$isElementInChildScope(element);
}
function $535772f9d2c1f38d$var$isElementInScope(element, scope) {
	if (!element) return false;
	if (!scope) return false;
	return scope.some((node) => $23f2114a1b82827e$export$4282f70798064fe0(node, element));
}
function $535772f9d2c1f38d$var$isElementInChildScope(element, scope = null) {
	if (element instanceof Element && element.closest("[data-react-aria-top-layer]")) return true;
	for (let { scopeRef: s } of $535772f9d2c1f38d$export$d06fae2ee68b101e.traverse($535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scope))) if (s && $535772f9d2c1f38d$var$isElementInScope(element, s.current)) return true;
	return false;
}
function $535772f9d2c1f38d$export$1258395f99bf9cbf(element) {
	return $535772f9d2c1f38d$var$isElementInChildScope(element, $535772f9d2c1f38d$var$activeScope);
}
function $535772f9d2c1f38d$var$isAncestorScope(ancestor, scope) {
	let parent = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scope)?.parent;
	while (parent) {
		if (parent.scopeRef === ancestor) return true;
		parent = parent.parent;
	}
	return false;
}
function $535772f9d2c1f38d$var$focusElement(element, scroll = false) {
	if (element != null && !scroll) try {
		$f192c2f16961cbe0$export$80f3e147d781571c(element);
	} catch {}
	else if (element != null) try {
		element.focus();
	} catch {}
}
function $535772f9d2c1f38d$var$getFirstInScope(scope, tabbable = true) {
	let sentinel = scope[0].previousElementSibling;
	let scopeRoot = $535772f9d2c1f38d$var$getScopeRoot(scope);
	let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(scopeRoot, { tabbable }, scope);
	walker.currentNode = sentinel;
	let nextNode = walker.nextNode();
	if (tabbable && !nextNode) {
		scopeRoot = $535772f9d2c1f38d$var$getScopeRoot(scope);
		walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(scopeRoot, { tabbable: false }, scope);
		walker.currentNode = sentinel;
		nextNode = walker.nextNode();
	}
	return nextNode;
}
function $535772f9d2c1f38d$var$focusFirstInScope(scope, tabbable = true) {
	$535772f9d2c1f38d$var$focusElement($535772f9d2c1f38d$var$getFirstInScope(scope, tabbable));
}
function $535772f9d2c1f38d$var$useAutoFocus(scopeRef, autoFocus) {
	const autoFocusRef = import_react.useRef(autoFocus);
	(0, import_react.useEffect)(() => {
		if (autoFocusRef.current) {
			$535772f9d2c1f38d$var$activeScope = scopeRef;
			const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0);
			if (!$535772f9d2c1f38d$var$isElementInScope($23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument), $535772f9d2c1f38d$var$activeScope.current) && scopeRef.current) $535772f9d2c1f38d$var$focusFirstInScope(scopeRef.current);
		}
		autoFocusRef.current = false;
	}, [scopeRef]);
}
function $535772f9d2c1f38d$var$useActiveScopeTracker(scopeRef, restore, contain) {
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (restore || contain) return;
		let scope = scopeRef.current;
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(scope ? scope[0] : void 0);
		let onFocus = (e) => {
			let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
			if ($535772f9d2c1f38d$var$isElementInScope(target, scopeRef.current)) $535772f9d2c1f38d$var$activeScope = scopeRef;
			else if (!$535772f9d2c1f38d$var$isElementInAnyScope(target)) $535772f9d2c1f38d$var$activeScope = null;
		};
		ownerDocument.addEventListener("focusin", onFocus, false);
		scope?.forEach((element) => element.addEventListener("focusin", onFocus, false));
		return () => {
			ownerDocument.removeEventListener("focusin", onFocus, false);
			scope?.forEach((element) => element.removeEventListener("focusin", onFocus, false));
		};
	}, [
		scopeRef,
		restore,
		contain
	]);
}
function $535772f9d2c1f38d$var$shouldRestoreFocus(scopeRef) {
	let scope = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode($535772f9d2c1f38d$var$activeScope);
	while (scope && scope.scopeRef !== scopeRef) {
		if (scope.nodeToRestore) return false;
		scope = scope.parent;
	}
	return scope?.scopeRef === scopeRef;
}
function $535772f9d2c1f38d$var$useRestoreFocus(scopeRef, restoreFocus, contain) {
	const nodeToRestoreRef = (0, import_react.useRef)(typeof document !== "undefined" ? $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0)) : null);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let scope = scopeRef.current;
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(scope ? scope[0] : void 0);
		if (!restoreFocus || contain) return;
		let onFocus = () => {
			if ((!$535772f9d2c1f38d$var$activeScope || $535772f9d2c1f38d$var$isAncestorScope($535772f9d2c1f38d$var$activeScope, scopeRef)) && $535772f9d2c1f38d$var$isElementInScope($23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument), scopeRef.current)) $535772f9d2c1f38d$var$activeScope = scopeRef;
		};
		ownerDocument.addEventListener("focusin", onFocus, false);
		scope?.forEach((element) => element.addEventListener("focusin", onFocus, false));
		return () => {
			ownerDocument.removeEventListener("focusin", onFocus, false);
			scope?.forEach((element) => element.removeEventListener("focusin", onFocus, false));
		};
	}, [scopeRef, contain]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0);
		if (!restoreFocus) return;
		let onKeyDown = (e) => {
			if (e.key !== "Tab" || e.altKey || e.ctrlKey || e.metaKey || !$535772f9d2c1f38d$var$shouldContainFocus(scopeRef) || e.isComposing) return;
			let focusedElement = ownerDocument.activeElement;
			if (!$535772f9d2c1f38d$var$isElementInChildScope(focusedElement, scopeRef) || !$535772f9d2c1f38d$var$shouldRestoreFocus(scopeRef)) return;
			let treeNode = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scopeRef);
			if (!treeNode) return;
			let nodeToRestore = treeNode.nodeToRestore;
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(ownerDocument.body, { tabbable: true });
			walker.currentNode = focusedElement;
			let nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
			if (!nodeToRestore || !nodeToRestore.isConnected || nodeToRestore === ownerDocument.body) {
				nodeToRestore = void 0;
				treeNode.nodeToRestore = void 0;
			}
			if ((!nextElement || !$535772f9d2c1f38d$var$isElementInChildScope(nextElement, scopeRef)) && nodeToRestore) {
				walker.currentNode = nodeToRestore;
				do
					nextElement = e.shiftKey ? walker.previousNode() : walker.nextNode();
				while ($535772f9d2c1f38d$var$isElementInChildScope(nextElement, scopeRef));
				e.preventDefault();
				e.stopPropagation();
				if (nextElement) $535772f9d2c1f38d$var$focusElement(nextElement, true);
				else if (!$535772f9d2c1f38d$var$isElementInAnyScope(nodeToRestore)) focusedElement.blur();
				else $535772f9d2c1f38d$var$focusElement(nodeToRestore, true);
			}
		};
		if (!contain) ownerDocument.addEventListener("keydown", onKeyDown, true);
		return () => {
			if (!contain) ownerDocument.removeEventListener("keydown", onKeyDown, true);
		};
	}, [
		scopeRef,
		restoreFocus,
		contain
	]);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		const ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(scopeRef.current ? scopeRef.current[0] : void 0);
		if (!restoreFocus) return;
		let treeNode = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scopeRef);
		if (!treeNode) return;
		treeNode.nodeToRestore = nodeToRestoreRef.current ?? void 0;
		return () => {
			let treeNode = $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(scopeRef);
			if (!treeNode) return;
			let nodeToRestore = treeNode.nodeToRestore;
			let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576(ownerDocument);
			if (restoreFocus && nodeToRestore && (activeElement && $535772f9d2c1f38d$var$isElementInChildScope(activeElement, scopeRef) || activeElement === ownerDocument.body && $535772f9d2c1f38d$var$shouldRestoreFocus(scopeRef))) {
				let clonedTree = $535772f9d2c1f38d$export$d06fae2ee68b101e.clone();
				requestAnimationFrame(() => {
					if (ownerDocument.activeElement === ownerDocument.body) {
						let treeNode = clonedTree.getTreeNode(scopeRef);
						while (treeNode) {
							if (treeNode.nodeToRestore && treeNode.nodeToRestore.isConnected) {
								$535772f9d2c1f38d$var$restoreFocusToElement(treeNode.nodeToRestore);
								return;
							}
							treeNode = treeNode.parent;
						}
						treeNode = clonedTree.getTreeNode(scopeRef);
						while (treeNode) {
							if (treeNode.scopeRef && treeNode.scopeRef.current && $535772f9d2c1f38d$export$d06fae2ee68b101e.getTreeNode(treeNode.scopeRef)) {
								$535772f9d2c1f38d$var$restoreFocusToElement($535772f9d2c1f38d$var$getFirstInScope(treeNode.scopeRef.current, true));
								return;
							}
							treeNode = treeNode.parent;
						}
					}
				});
			}
		};
	}, [scopeRef, restoreFocus]);
}
function $535772f9d2c1f38d$var$restoreFocusToElement(node) {
	if (node.dispatchEvent(new CustomEvent($535772f9d2c1f38d$var$RESTORE_FOCUS_EVENT, {
		bubbles: true,
		cancelable: true
	}))) $535772f9d2c1f38d$var$focusElement(node);
}
function $535772f9d2c1f38d$export$2d6ec8fc375ceafa(root, opts, scope) {
	let filter = opts?.tabbable ? $3b8b240c1bf84ab9$export$bebd5a1431fec25d : $3b8b240c1bf84ab9$export$4c063cf1350e6fed;
	let rootElement = root?.nodeType === Node.ELEMENT_NODE ? root : null;
	let doc = $d447af545b77c9f1$export$b204af158042fbac(rootElement);
	let walker = $654b97e09f2a30c1$export$4d0f8be8b12a7ef6(doc, root || doc, NodeFilter.SHOW_ELEMENT, { acceptNode(node) {
		if ($23f2114a1b82827e$export$4282f70798064fe0(opts?.from, node)) return NodeFilter.FILTER_REJECT;
		if (opts?.tabbable && node.tagName === "INPUT" && node.getAttribute("type") === "radio") {
			if (!$535772f9d2c1f38d$var$isTabbableRadio(node)) return NodeFilter.FILTER_REJECT;
			if (walker.currentNode.tagName === "INPUT" && walker.currentNode.type === "radio" && walker.currentNode.name === node.name) return NodeFilter.FILTER_REJECT;
		}
		if (filter(node) && (!scope || $535772f9d2c1f38d$var$isElementInScope(node, scope)) && (!opts?.accept || opts.accept(node))) return NodeFilter.FILTER_ACCEPT;
		return NodeFilter.FILTER_SKIP;
	} });
	if (opts?.from) walker.currentNode = opts.from;
	return walker;
}
function $535772f9d2c1f38d$export$c5251b9e124bf29(ref, defaultOptions = {}) {
	return {
		focusNext(opts = {}) {
			let root = ref.current;
			if (!root) return null;
			let { from, tabbable = defaultOptions.tabbable, wrap = defaultOptions.wrap, accept = defaultOptions.accept } = opts;
			let node = from || $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(root));
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			});
			if ($23f2114a1b82827e$export$4282f70798064fe0(root, node)) walker.currentNode = node;
			let nextNode = walker.nextNode();
			if (!nextNode && wrap) {
				walker.currentNode = root;
				nextNode = walker.nextNode();
			}
			if (nextNode) $535772f9d2c1f38d$var$focusElement(nextNode, true);
			return nextNode;
		},
		focusPrevious(opts = defaultOptions) {
			let root = ref.current;
			if (!root) return null;
			let { from, tabbable = defaultOptions.tabbable, wrap = defaultOptions.wrap, accept = defaultOptions.accept } = opts;
			let node = from || $23f2114a1b82827e$export$cd4e5573fbe2b576($d447af545b77c9f1$export$b204af158042fbac(root));
			let walker = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			});
			if ($23f2114a1b82827e$export$4282f70798064fe0(root, node)) walker.currentNode = node;
			else {
				let next = $535772f9d2c1f38d$var$last(walker);
				if (next) $535772f9d2c1f38d$var$focusElement(next, true);
				return next ?? null;
			}
			let previousNode = walker.previousNode();
			if (!previousNode && wrap) {
				walker.currentNode = root;
				let lastNode = $535772f9d2c1f38d$var$last(walker);
				if (!lastNode) return null;
				previousNode = lastNode;
			}
			if (previousNode) $535772f9d2c1f38d$var$focusElement(previousNode, true);
			return previousNode ?? null;
		},
		focusFirst(opts = defaultOptions) {
			let root = ref.current;
			if (!root) return null;
			let { tabbable = defaultOptions.tabbable, accept = defaultOptions.accept } = opts;
			let nextNode = $535772f9d2c1f38d$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			}).nextNode();
			if (nextNode) $535772f9d2c1f38d$var$focusElement(nextNode, true);
			return nextNode;
		},
		focusLast(opts = defaultOptions) {
			let root = ref.current;
			if (!root) return null;
			let { tabbable = defaultOptions.tabbable, accept = defaultOptions.accept } = opts;
			let next = $535772f9d2c1f38d$var$last($535772f9d2c1f38d$export$2d6ec8fc375ceafa(root, {
				tabbable,
				accept
			}));
			if (next) $535772f9d2c1f38d$var$focusElement(next, true);
			return next ?? null;
		}
	};
}
function $535772f9d2c1f38d$var$last(walker) {
	let next = void 0;
	let last;
	do {
		last = walker.lastChild();
		if (last) next = last;
	} while (last);
	return next;
}
var $535772f9d2c1f38d$var$Tree = class $535772f9d2c1f38d$var$Tree {
	constructor() {
		this.fastMap = /* @__PURE__ */ new Map();
		this.root = new $535772f9d2c1f38d$var$TreeNode({ scopeRef: null });
		this.fastMap.set(null, this.root);
	}
	get size() {
		return this.fastMap.size;
	}
	getTreeNode(data) {
		return this.fastMap.get(data);
	}
	addTreeNode(scopeRef, parent, nodeToRestore) {
		let parentNode = this.fastMap.get(parent ?? null);
		if (!parentNode) return;
		let node = new $535772f9d2c1f38d$var$TreeNode({ scopeRef });
		parentNode.addChild(node);
		node.parent = parentNode;
		this.fastMap.set(scopeRef, node);
		if (nodeToRestore) node.nodeToRestore = nodeToRestore;
	}
	addNode(node) {
		this.fastMap.set(node.scopeRef, node);
	}
	removeTreeNode(scopeRef) {
		if (scopeRef === null) return;
		let node = this.fastMap.get(scopeRef);
		if (!node) return;
		let parentNode = node.parent;
		for (let current of this.traverse()) if (current !== node && node.nodeToRestore && current.nodeToRestore && node.scopeRef && node.scopeRef.current && $535772f9d2c1f38d$var$isElementInScope(current.nodeToRestore, node.scopeRef.current)) current.nodeToRestore = node.nodeToRestore;
		let children = node.children;
		if (parentNode) {
			parentNode.removeChild(node);
			if (children.size > 0) children.forEach((child) => parentNode && parentNode.addChild(child));
		}
		this.fastMap.delete(node.scopeRef);
	}
	*traverse(node = this.root) {
		if (node.scopeRef != null) yield node;
		if (node.children.size > 0) for (let child of node.children) yield* this.traverse(child);
	}
	clone() {
		let newTree = new $535772f9d2c1f38d$var$Tree();
		for (let node of this.traverse()) newTree.addTreeNode(node.scopeRef, node.parent?.scopeRef ?? null, node.nodeToRestore);
		return newTree;
	}
};
var $535772f9d2c1f38d$var$TreeNode = class {
	constructor(props) {
		this.children = /* @__PURE__ */ new Set();
		this.contain = false;
		this.scopeRef = props.scopeRef;
	}
	addChild(node) {
		this.children.add(node);
		node.parent = this;
	}
	removeChild(node) {
		this.children.delete(node);
		node.parent = void 0;
	}
};
var $535772f9d2c1f38d$export$d06fae2ee68b101e = new $535772f9d2c1f38d$var$Tree();
//#endregion
//#region node_modules/react-aria/dist/private/utils/keyboard.mjs
function $bb39c0fc1c19b34c$export$16792effe837dba3(e) {
	if ($2add3ce32c6007eb$export$9ac100e40613ea10()) return e.metaKey;
	return e.ctrlKey;
}
var $bb39c0fc1c19b34c$var$nonTextInputTypes = /* @__PURE__ */ new Set([
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
function $bb39c0fc1c19b34c$export$c57958e35f31ed73(target) {
	return target instanceof HTMLInputElement && !$bb39c0fc1c19b34c$var$nonTextInputTypes.has(target.type) || target instanceof HTMLTextAreaElement || target instanceof HTMLElement && target.isContentEditable;
}
//#endregion
//#region node_modules/react-aria/dist/private/label/useLabel.mjs
function $0beb20c9744a2065$export$8467354a121f1b9f(props) {
	let { id, label, "aria-labelledby": ariaLabelledby, "aria-label": ariaLabel, labelElementType = "label" } = props;
	id = $390e54f620492c70$export$f680877a34711e37(id);
	let labelId = $390e54f620492c70$export$f680877a34711e37();
	let labelProps = {};
	if (label) {
		ariaLabelledby = ariaLabelledby ? `${labelId} ${ariaLabelledby}` : labelId;
		labelProps = {
			id: labelId,
			htmlFor: labelElementType === "label" ? id : void 0
		};
	} else if (!ariaLabelledby && !ariaLabel && true) console.warn("If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility");
	let fieldProps = $e8ac3c3f5d4bae7f$export$d6875122194c7b44({
		id,
		"aria-label": ariaLabel,
		"aria-labelledby": ariaLabelledby
	});
	return {
		labelProps,
		fieldProps
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/label/useField.mjs
function $191c9b6d48a0a4e2$export$294aa081a6c6f55d(props) {
	let { description, errorMessage, isInvalid, validationState } = props;
	let { labelProps, fieldProps } = $0beb20c9744a2065$export$8467354a121f1b9f(props);
	let descriptionId = $390e54f620492c70$export$b4cc09c592e8fdb8([
		Boolean(description),
		Boolean(errorMessage),
		isInvalid,
		validationState
	]);
	let errorMessageId = $390e54f620492c70$export$b4cc09c592e8fdb8([
		Boolean(description),
		Boolean(errorMessage),
		isInvalid,
		validationState
	]);
	fieldProps = $bbaa08b3cd72f041$export$9d1611c77c2fe928(fieldProps, { "aria-describedby": [
		descriptionId,
		errorMessageId,
		props["aria-describedby"]
	].filter(Boolean).join(" ") || void 0 });
	return {
		labelProps,
		fieldProps,
		descriptionProps: { id: descriptionId },
		errorMessageProps: { id: errorMessageId }
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/createEventHandler.mjs
function $8dba16319206abb6$export$48d1ea6320830260(handler) {
	if (!handler) return void 0;
	let shouldStopPropagation = true;
	return (e) => {
		handler({
			...e,
			preventDefault() {
				e.preventDefault();
			},
			isDefaultPrevented() {
				return e.isDefaultPrevented();
			},
			stopPropagation() {
				if (shouldStopPropagation && true) console.error("stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.");
				else shouldStopPropagation = true;
			},
			continuePropagation() {
				shouldStopPropagation = false;
				if (typeof e.continuePropagation === "function") e.continuePropagation();
			},
			isPropagationStopped() {
				return shouldStopPropagation;
			}
		});
		if (shouldStopPropagation) e.stopPropagation();
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useKeyboard.mjs
function $8296dad1a4c5e0dc$export$8f71654801c2f7cd(props) {
	return { keyboardProps: props.isDisabled ? {} : {
		onKeyDown: $8dba16319206abb6$export$48d1ea6320830260(props.onKeyDown),
		onKeyUp: $8dba16319206abb6$export$48d1ea6320830260(props.onKeyUp)
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useObjectRef.mjs
function $03e8ab2d84d7657a$export$4338b53315abf666(ref) {
	const objRef = (0, import_react.useRef)(null);
	const cleanupRef = (0, import_react.useRef)(void 0);
	const refEffect = (0, import_react.useCallback)((instance) => {
		if (typeof ref === "function") {
			const refCallback = ref;
			const refCleanup = refCallback(instance);
			return () => {
				if (typeof refCleanup === "function") refCleanup();
				else refCallback(null);
			};
		} else if (ref) {
			ref.current = instance;
			return () => {
				ref.current = null;
			};
		}
	}, [ref]);
	return (0, import_react.useMemo)(() => ({
		get current() {
			return objRef.current;
		},
		set current(value) {
			objRef.current = value;
			if (cleanupRef.current) {
				cleanupRef.current();
				cleanupRef.current = void 0;
			}
			if (value != null) cleanupRef.current = refEffect(value);
		}
	}), [refEffect]);
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusable.mjs
var $d1116acdf220c2da$export$f9762fab77588ecb = /*#__PURE__*/ import_react.createContext(null);
function $d1116acdf220c2da$var$useFocusableContext(ref) {
	let context = (0, import_react.useContext)($d1116acdf220c2da$export$f9762fab77588ecb) || {};
	$b7115c395c64f7b5$export$4debdb1a3f0fa79e(context, ref);
	let { ref: _, ...otherProps } = context;
	return otherProps;
}
var $d1116acdf220c2da$export$13f3202a3e5ddd5 = /*#__PURE__*/ import_react.forwardRef(function FocusableProvider(props, ref) {
	let { children, ...otherProps } = props;
	let objRef = $03e8ab2d84d7657a$export$4338b53315abf666(ref);
	let context = {
		...otherProps,
		ref: objRef
	};
	return /*#__PURE__*/ import_react.createElement($d1116acdf220c2da$export$f9762fab77588ecb.Provider, { value: context }, children);
});
function $d1116acdf220c2da$export$4c014de7c8940b4c(props, domRef) {
	let { focusProps } = $1e74c67db218ce67$export$f8168d8dd8fd66e6(props);
	let { keyboardProps } = $8296dad1a4c5e0dc$export$8f71654801c2f7cd(props);
	let interactions = $bbaa08b3cd72f041$export$9d1611c77c2fe928(focusProps, keyboardProps);
	let domProps = $d1116acdf220c2da$var$useFocusableContext(domRef);
	let interactionProps = props.isDisabled ? {} : domProps;
	let autoFocusRef = (0, import_react.useRef)(props.autoFocus);
	(0, import_react.useEffect)(() => {
		if (autoFocusRef.current && domRef.current) $f192c2f16961cbe0$export$80f3e147d781571c(domRef.current);
		autoFocusRef.current = false;
	}, [domRef]);
	let tabIndex = props.excludeFromTabOrder ? -1 : 0;
	if (props.isDisabled) tabIndex = void 0;
	return { focusableProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928({
		...interactions,
		tabIndex
	}, interactionProps) };
}
//#endregion
//#region node_modules/react-aria/dist/private/form/useFormValidation.mjs
function $860f7da480e22816$export$b8473d3665f3a75a(props, state, ref) {
	let { validationBehavior, focus } = props;
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (validationBehavior === "native" && ref?.current && "setCustomValidity" in ref.current && !ref.current.disabled) {
			let errorMessage = state.realtimeValidation.isInvalid ? state.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
			ref.current.setCustomValidity(errorMessage);
			if (!ref.current.hasAttribute("title")) ref.current.title = "";
			if (!state.realtimeValidation.isInvalid) state.updateValidation($860f7da480e22816$var$getNativeValidity(ref.current));
		}
	});
	let isIgnoredReset = (0, import_react.useRef)(false);
	let onReset = $fe16bffc7a557bf0$export$7f54fc3180508a52(() => {
		if (!isIgnoredReset.current) state.resetValidation();
	});
	let onInvalid = $fe16bffc7a557bf0$export$7f54fc3180508a52((e) => {
		if (!state.displayValidation.isInvalid) state.commitValidation();
		let form = ref?.current?.form;
		if (!e.defaultPrevented && ref && form && $860f7da480e22816$var$getFirstInvalidInput(form) === ref.current) {
			if (focus) focus();
			else ref.current?.focus();
			$8f5a2122b0992be3$export$8397ddfc504fdb9a("keyboard");
		}
		e.preventDefault();
	});
	let onChange = $fe16bffc7a557bf0$export$7f54fc3180508a52(() => {
		state.commitValidation();
	});
	(0, import_react.useEffect)(() => {
		let input = ref?.current;
		if (!input) return;
		let form = input.form;
		let reset = form?.reset;
		if (form) form.reset = () => {
			isIgnoredReset.current = !window.event || window.event.type === "message" && $23f2114a1b82827e$export$e58f029f0fbfdb29(window.event) instanceof MessagePort;
			reset?.call(form);
			isIgnoredReset.current = false;
		};
		input.addEventListener("invalid", onInvalid);
		input.addEventListener("change", onChange);
		form?.addEventListener("reset", onReset);
		return () => {
			input.removeEventListener("invalid", onInvalid);
			input.removeEventListener("change", onChange);
			form?.removeEventListener("reset", onReset);
			if (form) form.reset = reset;
		};
	}, [ref, validationBehavior]);
}
function $860f7da480e22816$var$getValidity(input) {
	let validity = input.validity;
	return {
		badInput: validity.badInput,
		customError: validity.customError,
		patternMismatch: validity.patternMismatch,
		rangeOverflow: validity.rangeOverflow,
		rangeUnderflow: validity.rangeUnderflow,
		stepMismatch: validity.stepMismatch,
		tooLong: validity.tooLong,
		tooShort: validity.tooShort,
		typeMismatch: validity.typeMismatch,
		valueMissing: validity.valueMissing,
		valid: validity.valid
	};
}
function $860f7da480e22816$var$getNativeValidity(input) {
	return {
		isInvalid: !input.validity.valid,
		validationDetails: $860f7da480e22816$var$getValidity(input),
		validationErrors: input.validationMessage ? [input.validationMessage] : []
	};
}
function $860f7da480e22816$var$getFirstInvalidInput(form) {
	for (let i = 0; i < form.elements.length; i++) {
		let element = form.elements[i];
		if (element.validity?.valid === false) return element;
	}
	return null;
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/useControlledState.mjs
var $3e6197669829fe11$var$useEarlyEffect = typeof document !== "undefined" ? import_react.useInsertionEffect ?? import_react.useLayoutEffect : () => {};
function $3e6197669829fe11$export$40bfa8c7b0832715(value, defaultValue, onChange) {
	let [stateValue, setStateValue] = (0, import_react.useState)(value || defaultValue);
	let valueRef = (0, import_react.useRef)(stateValue);
	let isControlledRef = (0, import_react.useRef)(value !== void 0);
	let isControlled = value !== void 0;
	(0, import_react.useEffect)(() => {
		let wasControlled = isControlledRef.current;
		if (wasControlled !== isControlled && true) console.warn(`WARN: A component changed from ${wasControlled ? "controlled" : "uncontrolled"} to ${isControlled ? "controlled" : "uncontrolled"}.`);
		isControlledRef.current = isControlled;
	}, [isControlled]);
	let currentValue = isControlled ? value : stateValue;
	$3e6197669829fe11$var$useEarlyEffect(() => {
		valueRef.current = currentValue;
	});
	let [, forceUpdate] = (0, import_react.useReducer)(() => ({}), {});
	return [currentValue, (0, import_react.useCallback)((value, ...args) => {
		let newValue = typeof value === "function" ? value(valueRef.current) : value;
		if (!Object.is(valueRef.current, newValue)) {
			valueRef.current = newValue;
			setStateValue(newValue);
			forceUpdate();
			onChange?.(newValue, ...args);
		}
	}, [onChange])];
}
//#endregion
//#region node_modules/react-stately/dist/private/form/useFormValidationState.mjs
var $fd2148440a13ec26$export$aca958c65c314e6c = {
	badInput: false,
	customError: false,
	patternMismatch: false,
	rangeOverflow: false,
	rangeUnderflow: false,
	stepMismatch: false,
	tooLong: false,
	tooShort: false,
	typeMismatch: false,
	valueMissing: false,
	valid: true
};
var $fd2148440a13ec26$var$CUSTOM_VALIDITY_STATE = {
	...$fd2148440a13ec26$export$aca958c65c314e6c,
	customError: true,
	valid: false
};
var $fd2148440a13ec26$export$dad6ae84456c676a = {
	isInvalid: false,
	validationDetails: $fd2148440a13ec26$export$aca958c65c314e6c,
	validationErrors: []
};
var $fd2148440a13ec26$export$571b5131b7e65c11 = (0, import_react.createContext)({});
var $fd2148440a13ec26$export$a763b9476acd3eb = "__reactAriaFormValidationState";
function $fd2148440a13ec26$export$fc1a364ae1f3ff10(props) {
	if (props["__reactAriaFormValidationState"]) {
		let { realtimeValidation, displayValidation, updateValidation, resetValidation, commitValidation } = props[$fd2148440a13ec26$export$a763b9476acd3eb];
		return {
			realtimeValidation,
			displayValidation,
			updateValidation,
			resetValidation,
			commitValidation
		};
	}
	return $fd2148440a13ec26$var$useFormValidationStateImpl(props);
}
function $fd2148440a13ec26$var$useFormValidationStateImpl(props) {
	let { isInvalid, validationState, name, value, builtinValidation, validate, validationBehavior = "aria" } = props;
	if (validationState) isInvalid ||= validationState === "invalid";
	let controlledError = isInvalid !== void 0 ? {
		isInvalid,
		validationErrors: [],
		validationDetails: $fd2148440a13ec26$var$CUSTOM_VALIDITY_STATE
	} : null;
	let clientError = (0, import_react.useMemo)(() => {
		if (!validate || value == null) return null;
		return $fd2148440a13ec26$var$getValidationResult($fd2148440a13ec26$var$runValidate(validate, value));
	}, [validate, value]);
	if (builtinValidation?.validationDetails.valid) builtinValidation = void 0;
	let serverErrors = (0, import_react.useContext)($fd2148440a13ec26$export$571b5131b7e65c11);
	let serverErrorMessages = (0, import_react.useMemo)(() => {
		if (name) return Array.isArray(name) ? name.flatMap((name) => $fd2148440a13ec26$var$asArray(serverErrors[name])) : $fd2148440a13ec26$var$asArray(serverErrors[name]);
		return [];
	}, [serverErrors, name]);
	let [lastServerErrors, setLastServerErrors] = (0, import_react.useState)(serverErrors);
	let [isServerErrorCleared, setServerErrorCleared] = (0, import_react.useState)(false);
	if (serverErrors !== lastServerErrors) {
		setLastServerErrors(serverErrors);
		setServerErrorCleared(false);
	}
	let serverError = (0, import_react.useMemo)(() => $fd2148440a13ec26$var$getValidationResult(isServerErrorCleared ? [] : serverErrorMessages), [isServerErrorCleared, serverErrorMessages]);
	let nextValidation = (0, import_react.useRef)($fd2148440a13ec26$export$dad6ae84456c676a);
	let [currentValidity, setCurrentValidity] = (0, import_react.useState)($fd2148440a13ec26$export$dad6ae84456c676a);
	let lastError = (0, import_react.useRef)($fd2148440a13ec26$export$dad6ae84456c676a);
	let commitValidation = () => {
		if (!commitQueued) return;
		setCommitQueued(false);
		let error = clientError || builtinValidation || nextValidation.current;
		if (!$fd2148440a13ec26$var$isEqualValidation(error, lastError.current)) {
			lastError.current = error;
			setCurrentValidity(error);
		}
	};
	let [commitQueued, setCommitQueued] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(commitValidation);
	return {
		realtimeValidation: controlledError || serverError || clientError || builtinValidation || $fd2148440a13ec26$export$dad6ae84456c676a,
		displayValidation: validationBehavior === "native" ? controlledError || serverError || currentValidity : controlledError || serverError || clientError || builtinValidation || currentValidity,
		updateValidation(value) {
			if (validationBehavior === "aria" && !$fd2148440a13ec26$var$isEqualValidation(currentValidity, value)) setCurrentValidity(value);
			else nextValidation.current = value;
		},
		resetValidation() {
			let error = $fd2148440a13ec26$export$dad6ae84456c676a;
			if (!$fd2148440a13ec26$var$isEqualValidation(error, lastError.current)) {
				lastError.current = error;
				setCurrentValidity(error);
			}
			if (validationBehavior === "native") setCommitQueued(false);
			setServerErrorCleared(true);
		},
		commitValidation() {
			if (validationBehavior === "native") setCommitQueued(true);
			setServerErrorCleared(true);
		}
	};
}
function $fd2148440a13ec26$var$asArray(v) {
	if (!v) return [];
	return Array.isArray(v) ? v : [v];
}
function $fd2148440a13ec26$var$runValidate(validate, value) {
	if (typeof validate === "function") {
		let e = validate(value);
		if (e && typeof e !== "boolean") return $fd2148440a13ec26$var$asArray(e);
	}
	return [];
}
function $fd2148440a13ec26$var$getValidationResult(errors) {
	return errors.length ? {
		isInvalid: true,
		validationErrors: errors,
		validationDetails: $fd2148440a13ec26$var$CUSTOM_VALIDITY_STATE
	} : null;
}
function $fd2148440a13ec26$var$isEqualValidation(a, b) {
	if (a === b) return true;
	return !!a && !!b && a.isInvalid === b.isInvalid && a.validationErrors.length === b.validationErrors.length && a.validationErrors.every((a, i) => a === b.validationErrors[i]) && Object.entries(a.validationDetails).every(([k, v]) => b.validationDetails[k] === v);
}
//#endregion
//#region node_modules/react-aria/dist/private/textfield/useTextField.mjs
function $054f71d2330da2e3$export$712718f7aec83d5(props, ref) {
	let { inputElementType = "input", isDisabled = false, isRequired = false, isReadOnly = false, type = "text", validationBehavior = "aria" } = props;
	let [value, setValue] = $3e6197669829fe11$export$40bfa8c7b0832715(props.value, props.defaultValue || "", props.onChange);
	let { focusableProps } = $d1116acdf220c2da$export$4c014de7c8940b4c(props, ref);
	let validationState = $fd2148440a13ec26$export$fc1a364ae1f3ff10({
		...props,
		value
	});
	let { isInvalid, validationErrors, validationDetails } = validationState.displayValidation;
	let { labelProps, fieldProps, descriptionProps, errorMessageProps } = $191c9b6d48a0a4e2$export$294aa081a6c6f55d({
		...props,
		isInvalid,
		errorMessage: props.errorMessage || validationErrors
	});
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, { labelable: true });
	const inputOnlyProps = {
		type,
		pattern: props.pattern
	};
	let [initialValue] = (0, import_react.useState)(value);
	$3274bf1495747a7b$export$5add1d006293d136(ref, props.defaultValue ?? initialValue, setValue);
	$860f7da480e22816$export$b8473d3665f3a75a(props, validationState, ref);
	return {
		labelProps,
		inputProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(domProps, inputElementType === "input" ? inputOnlyProps : void 0, {
			disabled: isDisabled,
			readOnly: isReadOnly,
			required: isRequired && validationBehavior === "native",
			"aria-required": isRequired && validationBehavior === "aria" || void 0,
			"aria-invalid": isInvalid || void 0,
			"aria-errormessage": props["aria-errormessage"],
			"aria-activedescendant": props["aria-activedescendant"],
			"aria-autocomplete": props["aria-autocomplete"],
			"aria-haspopup": props["aria-haspopup"],
			"aria-controls": props["aria-controls"],
			value,
			onChange: (e) => setValue($23f2114a1b82827e$export$e58f029f0fbfdb29(e).value),
			autoComplete: props.autoComplete,
			autoCapitalize: props.autoCapitalize,
			maxLength: props.maxLength,
			minLength: props.minLength,
			name: props.name,
			form: props.form,
			placeholder: props.placeholder,
			inputMode: props.inputMode,
			autoCorrect: props.autoCorrect,
			spellCheck: props.spellCheck,
			[parseInt("19.3.1", 10) >= 17 ? "enterKeyHint" : "enterkeyhint"]: props.enterKeyHint,
			onCopy: props.onCopy,
			onCut: props.onCut,
			onPaste: props.onPaste,
			onCompositionEnd: props.onCompositionEnd,
			onCompositionStart: props.onCompositionStart,
			onCompositionUpdate: props.onCompositionUpdate,
			onSelect: props.onSelect,
			onBeforeInput: props.onBeforeInput,
			onInput: props.onInput,
			...focusableProps,
			...fieldProps
		}),
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
		validationDetails
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/PressResponder.mjs
var $0d47b37c475c5231$export$3351871ee4b288b8 = /*#__PURE__*/ import_react.forwardRef(({ children, ...props }, ref) => {
	let isRegistered = (0, import_react.useRef)(false);
	let prevContext = (0, import_react.useContext)($24f9a20f226ad820$export$5165eccb35aaadb5);
	let context = $bbaa08b3cd72f041$export$9d1611c77c2fe928(prevContext || {}, {
		...props,
		register() {
			isRegistered.current = true;
			if (prevContext) prevContext.register();
		}
	});
	context.ref = $03e8ab2d84d7657a$export$4338b53315abf666(ref || prevContext?.ref);
	$b7115c395c64f7b5$export$4debdb1a3f0fa79e(prevContext, context.ref);
	(0, import_react.useEffect)(() => {
		if (!isRegistered.current) {
			console.warn("A PressResponder was rendered without a pressable child. Either call the usePress hook, or wrap your DOM node with <Pressable> component.");
			isRegistered.current = true;
		}
	}, []);
	return /*#__PURE__*/ import_react.createElement($24f9a20f226ad820$export$5165eccb35aaadb5.Provider, { value: context }, children);
});
function $0d47b37c475c5231$export$cf75428e0b9ed1ea({ children }) {
	let context = (0, import_react.useMemo)(() => ({ register: () => {} }), []);
	return /*#__PURE__*/ import_react.createElement($24f9a20f226ad820$export$5165eccb35aaadb5.Provider, { value: context }, children);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useResizeObserver.mjs
function $970072cf4b13fde3$var$hasResizeObserver() {
	return typeof window.ResizeObserver !== "undefined";
}
function $970072cf4b13fde3$export$683480f191c0e3ea(options) {
	const { ref, box, onResize } = options;
	let onResizeEvent = $fe16bffc7a557bf0$export$7f54fc3180508a52(onResize);
	(0, import_react.useEffect)(() => {
		let element = ref?.current;
		if (!element) return;
		if (!$970072cf4b13fde3$var$hasResizeObserver()) {
			window.addEventListener("resize", onResizeEvent, false);
			return () => {
				window.removeEventListener("resize", onResizeEvent, false);
			};
		} else {
			const resizeObserverInstance = new window.ResizeObserver((entries) => {
				if (!entries.length) return;
				onResizeEvent();
			});
			resizeObserverInstance.observe(element, { box });
			return () => {
				if (element) resizeObserverInstance.unobserve(element);
			};
		}
	}, [ref, box]);
}
//#endregion
//#region node_modules/react-stately/dist/private/overlays/useOverlayTriggerState.mjs
function $f11fb0bcf1b2687a$export$61c6a8c84e605fb6(props) {
	let [isOpen, setOpen] = $3e6197669829fe11$export$40bfa8c7b0832715(props.isOpen, props.defaultOpen || false, props.onOpenChange);
	return {
		isOpen,
		setOpen,
		open: (0, import_react.useCallback)(() => {
			setOpen(true);
		}, [setOpen]),
		close: (0, import_react.useCallback)(() => {
			setOpen(false);
		}, [setOpen]),
		toggle: (0, import_react.useCallback)(() => {
			setOpen(!isOpen);
		}, [setOpen, isOpen])
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/PortalProvider.mjs
var $72abaeab4d80592f$export$60d741e20e0aa309 = /*#__PURE__*/ (0, import_react.createContext)({});
function $72abaeab4d80592f$export$9fc1347d4195ccb3() {
	return (0, import_react.useContext)($72abaeab4d80592f$export$60d741e20e0aa309) ?? {};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useModal.mjs
var $c07df45195231803$var$Context = /*#__PURE__*/ import_react.createContext(null);
function $c07df45195231803$export$178405afcd8c5eb(props) {
	let { children } = props;
	let parent = (0, import_react.useContext)($c07df45195231803$var$Context);
	let [modalCount, setModalCount] = (0, import_react.useState)(0);
	let context = (0, import_react.useMemo)(() => ({
		parent,
		modalCount,
		addModal() {
			setModalCount((count) => count + 1);
			if (parent) parent.addModal();
		},
		removeModal() {
			setModalCount((count) => count - 1);
			if (parent) parent.removeModal();
		}
	}), [parent, modalCount]);
	return /*#__PURE__*/ import_react.createElement($c07df45195231803$var$Context.Provider, { value: context }, children);
}
function $c07df45195231803$export$d9aaed4c3ece1bc0() {
	let context = (0, import_react.useContext)($c07df45195231803$var$Context);
	return { modalProviderProps: { "aria-hidden": context && context.modalCount > 0 ? true : void 0 } };
}
//#endregion
//#region node_modules/@keystar/ui/dist/context-5bcbd5d7.js
var RouterContext = /*#__PURE__*/ (0, import_react.createContext)(null);
var hookIds = /* @__PURE__ */ new WeakMap();
var nextHookId = 1;
function getHookId(hook) {
	if (hook === void 0) return 0;
	let id = hookIds.get(hook);
	if (id === void 0) {
		id = nextHookId++;
		hookIds.set(hook, id);
	}
	return id;
}
function getRouterHooksKey(router) {
	return `${getHookId(router.usePathname)}:${getHookId(router.useSearch)}`;
}
function RouterContextProvider(t0) {
	const $ = c(6);
	const { children, router } = t0;
	let t1;
	if ($[0] !== router) {
		t1 = getRouterHooksKey(router);
		$[0] = router;
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] !== t1 || $[3] !== router || $[4] !== children) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RouterContext.Provider, {
			value: router,
			children
		}, t1);
		$[2] = t1;
		$[3] = router;
		$[4] = children;
		$[5] = t2;
	} else t2 = $[5];
	return t2;
}
//#endregion
//#region node_modules/@keystar/ui/dist/KeystarProvider-7145d9a2.js
var Context = /*#__PURE__*/ (0, import_react.createContext)(null);
Context.displayName = "KeystarProviderContext";
/**
* Returns the settings and styles applied by the nearest parent
* Provider. Properties explicitly set by the nearest parent Provider override
* those provided by preceeding Providers.
*/
function useProvider() {
	const context = (0, import_react.useContext)(Context);
	if (!context) throw new Error("Attempt to access context outside of KeystarProvider.");
	return context;
}
function useProviderProps(props) {
	const $ = c(5);
	const context = useProvider();
	if (!context) return props;
	let t0;
	if ($[0] !== context.isDisabled || $[1] !== context.isRequired || $[2] !== context.isReadOnly || $[3] !== props) {
		t0 = Object.assign({}, {
			isDisabled: context.isDisabled,
			isRequired: context.isRequired,
			isReadOnly: context.isReadOnly
		}, props);
		$[0] = context.isDisabled;
		$[1] = context.isRequired;
		$[2] = context.isReadOnly;
		$[3] = props;
		$[4] = t0;
	} else t0 = $[4];
	return t0;
}
var cssCustomProperties = `
/**
 * Do not edit directly
 * Generated on Fri, 03 Nov 2023 05:52:12 GMT
 */

.kui-scheme--auto,
.kui-scheme--light {
  color-scheme: light;

  --kui-color-scale-slate11: #2c2c2c;
  --kui-color-scale-slate10: #4b4b4b;
  --kui-color-scale-slate9: #6e6e6e;
  --kui-color-scale-slate8: #8e8e8e;
  --kui-color-scale-slate7: #b3b3b3;
  --kui-color-scale-slate6: #cacaca;
  --kui-color-scale-slate5: #e1e1e1;
  --kui-color-scale-slate4: #eaeaea;
  --kui-color-scale-slate3: #f5f5f5;
  --kui-color-scale-slate2: #fafafa;
  --kui-color-scale-slate1: #ffffff;
  --kui-color-scale-red11: #cd2b31;
  --kui-color-scale-red10: #dc3d43;
  --kui-color-scale-red9: #e5484d;
  --kui-color-scale-red8: #eb9091;
  --kui-color-scale-red7: #f3aeaf;
  --kui-color-scale-red6: #f9c6c6;
  --kui-color-scale-red5: #fdd8d8;
  --kui-color-scale-red4: #ffe5e5;
  --kui-color-scale-red3: #ffefef;
  --kui-color-scale-red2: #fff8f8;
  --kui-color-scale-red1: #fffcfc;
  --kui-color-scale-purple11: #793aaf;
  --kui-color-scale-purple10: #8445bc;
  --kui-color-scale-purple9: #8e4ec6;
  --kui-color-scale-purple8: #be93e4;
  --kui-color-scale-purple7: #d3b4ed;
  --kui-color-scale-purple6: #e3ccf4;
  --kui-color-scale-purple5: #eddbf9;
  --kui-color-scale-purple4: #f3e7fc;
  --kui-color-scale-purple3: #f9f1fe;
  --kui-color-scale-purple2: #fdfaff;
  --kui-color-scale-purple1: #fefcfe;
  --kui-color-scale-pink11: #cd1d8d;
  --kui-color-scale-pink10: #d23197;
  --kui-color-scale-pink9: #d6409f;
  --kui-color-scale-pink8: #e38ec3;
  --kui-color-scale-pink7: #ecadd4;
  --kui-color-scale-pink6: #f3c6e2;
  --kui-color-scale-pink5: #f9d8ec;
  --kui-color-scale-pink4: #fce5f3;
  --kui-color-scale-pink3: #feeef8;
  --kui-color-scale-pink2: #fff7fc;
  --kui-color-scale-pink1: #fffcfe;
  --kui-color-scale-indigo11: #3451b2;
  --kui-color-scale-indigo10: #3a5ccc;
  --kui-color-scale-indigo9: #3e63dd;
  --kui-color-scale-indigo8: #8da4ef;
  --kui-color-scale-indigo7: #aec0f5;
  --kui-color-scale-indigo6: #c6d4f9;
  --kui-color-scale-indigo5: #d9e2fc;
  --kui-color-scale-indigo4: #e6edfe;
  --kui-color-scale-indigo3: #f0f4ff;
  --kui-color-scale-indigo2: #f8faff;
  --kui-color-scale-indigo1: #fdfdfe;
  --kui-color-scale-green11: #18794e;
  --kui-color-scale-green10: #299764;
  --kui-color-scale-green9: #30a46c;
  --kui-color-scale-green8: #5bb98c;
  --kui-color-scale-green7: #92ceac;
  --kui-color-scale-green6: #b4dfc4;
  --kui-color-scale-green5: #ccebd7;
  --kui-color-scale-green4: #ddf3e4;
  --kui-color-scale-green3: #e9f9ee;
  --kui-color-scale-green2: #f2fcf5;
  --kui-color-scale-green1: #fbfefc;
  --kui-color-scale-amber11: #ad5700;
  --kui-color-scale-amber10: #ffa01c;
  --kui-color-scale-amber9: #ffb224;
  --kui-color-scale-amber8: #ee9d2b;
  --kui-color-scale-amber7: #f3ba63;
  --kui-color-scale-amber6: #ffd386;
  --kui-color-scale-amber5: #ffe3a2;
  --kui-color-scale-amber4: #ffecbc;
  --kui-color-scale-amber3: #fff4d5;
  --kui-color-scale-amber2: #fff9ed;
  --kui-color-scale-amber1: #fefdfb;
  --kui-color-scale-white: #ffffff;
  --kui-color-scale-black: #000000;
  --kui-color-alias-foreground-selected: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-disabled: var(--kui-color-scale-slate7);
  --kui-color-alias-foreground-focused: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-pressed: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-hovered: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-idle: var(--kui-color-scale-slate10);
  --kui-color-alias-border-invalid: var(--kui-color-scale-red9);
  --kui-color-alias-border-selected: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-disabled: var(--kui-color-scale-slate4);
  --kui-color-alias-border-focused: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-pressed: var(--kui-color-scale-slate8);
  --kui-color-alias-border-hovered: var(--kui-color-scale-slate7);
  --kui-color-alias-border-idle: var(--kui-color-scale-slate6);
  --kui-color-alias-focus-ring: var(--kui-color-scale-indigo9);
  --kui-color-alias-background-selected-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 20%);
  --kui-color-alias-background-selected: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 10%);
  --kui-color-alias-background-pressed: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 10%);
  --kui-color-alias-background-focused: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-disabled: var(--kui-color-scale-slate3);
  --kui-color-alias-background-idle: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 3%);
  --kui-color-alias-blanket: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
  --kui-color-shadow-emphasis: color-mix(in srgb, transparent, var(--kui-color-scale-black) 20%);
  --kui-color-shadow-regular: color-mix(in srgb, transparent, var(--kui-color-scale-black) 15%);
  --kui-color-shadow-muted: color-mix(in srgb, transparent, var(--kui-color-scale-black) 5%);
  --kui-color-foreground-highlight: var(--kui-color-scale-pink11);
  --kui-color-foreground-pending: var(--kui-color-scale-purple11);
  --kui-color-foreground-critical: var(--kui-color-scale-red11);
  --kui-color-foreground-caution: var(--kui-color-scale-amber11);
  --kui-color-foreground-positive: var(--kui-color-scale-green11);
  --kui-color-foreground-accent: var(--kui-color-scale-indigo11);
  --kui-color-foreground-inverse-secondary: var(--kui-color-scale-slate6);
  --kui-color-foreground-inverse: var(--kui-color-scale-slate2);
  --kui-color-foreground-on-emphasis: var(--kui-color-scale-white);
  --kui-color-foreground-neutral-tertiary: var(--kui-color-scale-slate8);
  --kui-color-foreground-neutral-secondary: var(--kui-color-scale-slate9);
  --kui-color-foreground-neutral-emphasis: var(--kui-color-scale-slate11);
  --kui-color-foreground-neutral: var(--kui-color-scale-slate10);
  --kui-color-border-highlight: var(--kui-color-scale-pink6);
  --kui-color-border-pending: var(--kui-color-scale-purple6);
  --kui-color-border-critical: var(--kui-color-scale-red6);
  --kui-color-border-caution: var(--kui-color-scale-amber6);
  --kui-color-border-positive: var(--kui-color-scale-green6);
  --kui-color-border-accent: var(--kui-color-scale-indigo6);
  --kui-color-border-emphasis: var(--kui-color-scale-slate6);
  --kui-color-border-neutral: var(--kui-color-scale-slate5);
  --kui-color-border-muted: var(--kui-color-scale-slate4);
  --kui-color-background-highlight-emphasis: var(--kui-color-scale-pink9);
  --kui-color-background-highlight: var(--kui-color-scale-pink3);
  --kui-color-background-pending-emphasis: var(--kui-color-scale-purple9);
  --kui-color-background-pending: var(--kui-color-scale-purple3);
  --kui-color-background-critical-emphasis: var(--kui-color-scale-red9);
  --kui-color-background-critical: var(--kui-color-scale-red3);
  --kui-color-background-caution-emphasis: var(--kui-color-scale-amber9);
  --kui-color-background-caution: var(--kui-color-scale-amber3);
  --kui-color-background-positive-emphasis: var(--kui-color-scale-green9);
  --kui-color-background-positive: var(--kui-color-scale-green3);
  --kui-color-background-accent-emphasis: var(--kui-color-scale-indigo9);
  --kui-color-background-accent: var(--kui-color-scale-indigo3);
  --kui-color-background-inverse: var(--kui-color-scale-slate10);
  --kui-color-background-surface-tertiary: var(--kui-color-scale-slate4);
  --kui-color-background-surface-secondary: var(--kui-color-scale-slate3);
  --kui-color-background-surface: var(--kui-color-scale-slate2);
  --kui-color-background-canvas: var(--kui-color-scale-slate1);
}
.kui-scheme--dark {
  color-scheme: dark;

  --kui-color-scale-slate11: #e3e3e3;
  --kui-color-scale-slate10: #b9b9b9;
  --kui-color-scale-slate9: #909090;
  --kui-color-scale-slate8: #6e6e6e;
  --kui-color-scale-slate7: #5a5a5a;
  --kui-color-scale-slate6: #4a4a4a;
  --kui-color-scale-slate5: #3e3e3e;
  --kui-color-scale-slate4: #323232;
  --kui-color-scale-slate3: #2f2f2f;
  --kui-color-scale-slate2: #252525;
  --kui-color-scale-slate1: #1f1f1f;
  --kui-color-scale-red11: #ff6369;
  --kui-color-scale-red10: #f2555a;
  --kui-color-scale-red9: #e5484d;
  --kui-color-scale-red8: #aa2429;
  --kui-color-scale-red7: #822025;
  --kui-color-scale-red6: #671e22;
  --kui-color-scale-red5: #541b1f;
  --kui-color-scale-red4: #481a1d;
  --kui-color-scale-red3: #3c181a;
  --kui-color-scale-red2: #291415;
  --kui-color-scale-red1: #1f1315;
  --kui-color-scale-purple11: #bf7af0;
  --kui-color-scale-purple10: #9d5bd2;
  --kui-color-scale-purple9: #8e4ec6;
  --kui-color-scale-purple8: #7938b2;
  --kui-color-scale-purple7: #5f2d84;
  --kui-color-scale-purple6: #4e2667;
  --kui-color-scale-purple5: #432155;
  --kui-color-scale-purple4: #3a1e48;
  --kui-color-scale-purple3: #301a3a;
  --kui-color-scale-purple2: #221527;
  --kui-color-scale-purple1: #1b141d;
  --kui-color-scale-pink11: #f65cb6;
  --kui-color-scale-pink10: #e34ba9;
  --kui-color-scale-pink9: #d6409f;
  --kui-color-scale-pink8: #a71873;
  --kui-color-scale-pink7: #7a1d5a;
  --kui-color-scale-pink6: #601d48;
  --kui-color-scale-pink5: #501b3f;
  --kui-color-scale-pink4: #451a37;
  --kui-color-scale-pink3: #3a182f;
  --kui-color-scale-pink2: #271421;
  --kui-color-scale-pink1: #1f121b;
  --kui-color-scale-indigo11: #849dff;
  --kui-color-scale-indigo10: #5373e7;
  --kui-color-scale-indigo9: #3e63dd;
  --kui-color-scale-indigo8: #2f4eb2;
  --kui-color-scale-indigo7: #273e89;
  --kui-color-scale-indigo6: #22346e;
  --kui-color-scale-indigo5: #1f2c5c;
  --kui-color-scale-indigo4: #1c274f;
  --kui-color-scale-indigo3: #192140;
  --kui-color-scale-indigo2: #15192d;
  --kui-color-scale-indigo1: #131620;
  --kui-color-scale-green11: #4cc38a;
  --kui-color-scale-green10: #3cb179;
  --kui-color-scale-green9: #30a46c;
  --kui-color-scale-green8: #236e4a;
  --kui-color-scale-green7: #1b543a;
  --kui-color-scale-green6: #164430;
  --kui-color-scale-green5: #133929;
  --kui-color-scale-green4: #113123;
  --kui-color-scale-green3: #0f291e;
  --kui-color-scale-green2: #0c1f17;
  --kui-color-scale-green1: #0d1912;
  --kui-color-scale-amber11: #f1a10d;
  --kui-color-scale-amber10: #ffcb47;
  --kui-color-scale-amber9: #ffb224;
  --kui-color-scale-amber8: #824e00;
  --kui-color-scale-amber7: #693f05;
  --kui-color-scale-amber6: #573300;
  --kui-color-scale-amber5: #4a2900;
  --kui-color-scale-amber4: #3f2200;
  --kui-color-scale-amber3: #341c00;
  --kui-color-scale-amber2: #271700;
  --kui-color-scale-amber1: #1f1300;
  --kui-color-scale-white: #ffffff;
  --kui-color-scale-black: #000000;
  --kui-color-alias-foreground-selected: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-disabled: var(--kui-color-scale-slate7);
  --kui-color-alias-foreground-focused: var(--kui-color-scale-indigo11);
  --kui-color-alias-foreground-pressed: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-hovered: var(--kui-color-scale-slate11);
  --kui-color-alias-foreground-idle: var(--kui-color-scale-slate10);
  --kui-color-alias-border-invalid: var(--kui-color-scale-red9);
  --kui-color-alias-border-selected: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-disabled: var(--kui-color-scale-slate4);
  --kui-color-alias-border-focused: var(--kui-color-scale-indigo9);
  --kui-color-alias-border-pressed: var(--kui-color-scale-slate8);
  --kui-color-alias-border-hovered: var(--kui-color-scale-slate7);
  --kui-color-alias-border-idle: var(--kui-color-scale-slate6);
  --kui-color-alias-focus-ring: var(--kui-color-scale-indigo9);
  --kui-color-alias-background-selected-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 20%);
  --kui-color-alias-background-selected: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 10%);
  --kui-color-alias-background-pressed: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 10%);
  --kui-color-alias-background-focused: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
  --kui-color-alias-background-disabled: var(--kui-color-scale-slate3);
  --kui-color-alias-background-idle: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 4%);
  --kui-color-alias-blanket: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
  --kui-color-shadow-emphasis: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
  --kui-color-shadow-regular: color-mix(in srgb, transparent, var(--kui-color-scale-black) 40%);
  --kui-color-shadow-muted: color-mix(in srgb, transparent, var(--kui-color-scale-black) 20%);
  --kui-color-foreground-highlight: var(--kui-color-scale-pink11);
  --kui-color-foreground-pending: var(--kui-color-scale-purple11);
  --kui-color-foreground-critical: var(--kui-color-scale-red11);
  --kui-color-foreground-caution: var(--kui-color-scale-amber11);
  --kui-color-foreground-positive: var(--kui-color-scale-green11);
  --kui-color-foreground-accent: var(--kui-color-scale-indigo11);
  --kui-color-foreground-inverse-secondary: var(--kui-color-scale-slate6);
  --kui-color-foreground-inverse: var(--kui-color-scale-slate2);
  --kui-color-foreground-on-emphasis: var(--kui-color-scale-white);
  --kui-color-foreground-neutral-tertiary: var(--kui-color-scale-slate8);
  --kui-color-foreground-neutral-secondary: var(--kui-color-scale-slate9);
  --kui-color-foreground-neutral-emphasis: var(--kui-color-scale-slate11);
  --kui-color-foreground-neutral: var(--kui-color-scale-slate10);
  --kui-color-border-highlight: var(--kui-color-scale-pink6);
  --kui-color-border-pending: var(--kui-color-scale-purple6);
  --kui-color-border-critical: var(--kui-color-scale-red6);
  --kui-color-border-caution: var(--kui-color-scale-amber6);
  --kui-color-border-positive: var(--kui-color-scale-green6);
  --kui-color-border-accent: var(--kui-color-scale-indigo6);
  --kui-color-border-emphasis: var(--kui-color-scale-slate6);
  --kui-color-border-neutral: var(--kui-color-scale-slate5);
  --kui-color-border-muted: var(--kui-color-scale-slate4);
  --kui-color-background-highlight-emphasis: var(--kui-color-scale-pink9);
  --kui-color-background-highlight: var(--kui-color-scale-pink3);
  --kui-color-background-pending-emphasis: var(--kui-color-scale-purple9);
  --kui-color-background-pending: var(--kui-color-scale-purple3);
  --kui-color-background-critical-emphasis: var(--kui-color-scale-red9);
  --kui-color-background-critical: var(--kui-color-scale-red3);
  --kui-color-background-caution-emphasis: var(--kui-color-scale-amber9);
  --kui-color-background-caution: var(--kui-color-scale-amber3);
  --kui-color-background-positive-emphasis: var(--kui-color-scale-green9);
  --kui-color-background-positive: var(--kui-color-scale-green3);
  --kui-color-background-accent-emphasis: var(--kui-color-scale-indigo9);
  --kui-color-background-accent: var(--kui-color-scale-indigo3);
  --kui-color-background-inverse: var(--kui-color-scale-slate10);
  --kui-color-background-surface-tertiary: var(--kui-color-scale-slate4);
  --kui-color-background-surface-secondary: var(--kui-color-scale-slate3);
  --kui-color-background-surface: var(--kui-color-scale-slate2);
  --kui-color-background-canvas: var(--kui-color-scale-slate1);
}
@media (prefers-color-scheme: dark) {
  .kui-scheme--auto {
    color-scheme: dark;

    --kui-color-scale-slate11: #e3e3e3;
    --kui-color-scale-slate10: #b9b9b9;
    --kui-color-scale-slate9: #909090;
    --kui-color-scale-slate8: #6e6e6e;
    --kui-color-scale-slate7: #5a5a5a;
    --kui-color-scale-slate6: #4a4a4a;
    --kui-color-scale-slate5: #3e3e3e;
    --kui-color-scale-slate4: #323232;
    --kui-color-scale-slate3: #2f2f2f;
    --kui-color-scale-slate2: #252525;
    --kui-color-scale-slate1: #1f1f1f;
    --kui-color-scale-red11: #ff6369;
    --kui-color-scale-red10: #f2555a;
    --kui-color-scale-red9: #e5484d;
    --kui-color-scale-red8: #aa2429;
    --kui-color-scale-red7: #822025;
    --kui-color-scale-red6: #671e22;
    --kui-color-scale-red5: #541b1f;
    --kui-color-scale-red4: #481a1d;
    --kui-color-scale-red3: #3c181a;
    --kui-color-scale-red2: #291415;
    --kui-color-scale-red1: #1f1315;
    --kui-color-scale-purple11: #bf7af0;
    --kui-color-scale-purple10: #9d5bd2;
    --kui-color-scale-purple9: #8e4ec6;
    --kui-color-scale-purple8: #7938b2;
    --kui-color-scale-purple7: #5f2d84;
    --kui-color-scale-purple6: #4e2667;
    --kui-color-scale-purple5: #432155;
    --kui-color-scale-purple4: #3a1e48;
    --kui-color-scale-purple3: #301a3a;
    --kui-color-scale-purple2: #221527;
    --kui-color-scale-purple1: #1b141d;
    --kui-color-scale-pink11: #f65cb6;
    --kui-color-scale-pink10: #e34ba9;
    --kui-color-scale-pink9: #d6409f;
    --kui-color-scale-pink8: #a71873;
    --kui-color-scale-pink7: #7a1d5a;
    --kui-color-scale-pink6: #601d48;
    --kui-color-scale-pink5: #501b3f;
    --kui-color-scale-pink4: #451a37;
    --kui-color-scale-pink3: #3a182f;
    --kui-color-scale-pink2: #271421;
    --kui-color-scale-pink1: #1f121b;
    --kui-color-scale-indigo11: #849dff;
    --kui-color-scale-indigo10: #5373e7;
    --kui-color-scale-indigo9: #3e63dd;
    --kui-color-scale-indigo8: #2f4eb2;
    --kui-color-scale-indigo7: #273e89;
    --kui-color-scale-indigo6: #22346e;
    --kui-color-scale-indigo5: #1f2c5c;
    --kui-color-scale-indigo4: #1c274f;
    --kui-color-scale-indigo3: #192140;
    --kui-color-scale-indigo2: #15192d;
    --kui-color-scale-indigo1: #131620;
    --kui-color-scale-green11: #4cc38a;
    --kui-color-scale-green10: #3cb179;
    --kui-color-scale-green9: #30a46c;
    --kui-color-scale-green8: #236e4a;
    --kui-color-scale-green7: #1b543a;
    --kui-color-scale-green6: #164430;
    --kui-color-scale-green5: #133929;
    --kui-color-scale-green4: #113123;
    --kui-color-scale-green3: #0f291e;
    --kui-color-scale-green2: #0c1f17;
    --kui-color-scale-green1: #0d1912;
    --kui-color-scale-amber11: #f1a10d;
    --kui-color-scale-amber10: #ffcb47;
    --kui-color-scale-amber9: #ffb224;
    --kui-color-scale-amber8: #824e00;
    --kui-color-scale-amber7: #693f05;
    --kui-color-scale-amber6: #573300;
    --kui-color-scale-amber5: #4a2900;
    --kui-color-scale-amber4: #3f2200;
    --kui-color-scale-amber3: #341c00;
    --kui-color-scale-amber2: #271700;
    --kui-color-scale-amber1: #1f1300;
    --kui-color-scale-white: #ffffff;
    --kui-color-scale-black: #000000;
    --kui-color-alias-foreground-selected: var(--kui-color-scale-indigo11);
    --kui-color-alias-foreground-disabled: var(--kui-color-scale-slate7);
    --kui-color-alias-foreground-focused: var(--kui-color-scale-indigo11);
    --kui-color-alias-foreground-pressed: var(--kui-color-scale-slate11);
    --kui-color-alias-foreground-hovered: var(--kui-color-scale-slate11);
    --kui-color-alias-foreground-idle: var(--kui-color-scale-slate10);
    --kui-color-alias-border-invalid: var(--kui-color-scale-red9);
    --kui-color-alias-border-selected: var(--kui-color-scale-indigo9);
    --kui-color-alias-border-disabled: var(--kui-color-scale-slate4);
    --kui-color-alias-border-focused: var(--kui-color-scale-indigo9);
    --kui-color-alias-border-pressed: var(--kui-color-scale-slate8);
    --kui-color-alias-border-hovered: var(--kui-color-scale-slate7);
    --kui-color-alias-border-idle: var(--kui-color-scale-slate6);
    --kui-color-alias-focus-ring: var(--kui-color-scale-indigo9);
    --kui-color-alias-background-selected-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 20%);
    --kui-color-alias-background-selected: color-mix(in srgb, transparent, var(--kui-color-scale-indigo9) 10%);
    --kui-color-alias-background-pressed: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 10%);
    --kui-color-alias-background-focused: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
    --kui-color-alias-background-hovered: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 6%);
    --kui-color-alias-background-disabled: var(--kui-color-scale-slate3);
    --kui-color-alias-background-idle: color-mix(in srgb, transparent, var(--kui-color-scale-slate11) 4%);
    --kui-color-alias-blanket: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
    --kui-color-shadow-emphasis: color-mix(in srgb, transparent, var(--kui-color-scale-black) 60%);
    --kui-color-shadow-regular: color-mix(in srgb, transparent, var(--kui-color-scale-black) 40%);
    --kui-color-shadow-muted: color-mix(in srgb, transparent, var(--kui-color-scale-black) 20%);
    --kui-color-foreground-highlight: var(--kui-color-scale-pink11);
    --kui-color-foreground-pending: var(--kui-color-scale-purple11);
    --kui-color-foreground-critical: var(--kui-color-scale-red11);
    --kui-color-foreground-caution: var(--kui-color-scale-amber11);
    --kui-color-foreground-positive: var(--kui-color-scale-green11);
    --kui-color-foreground-accent: var(--kui-color-scale-indigo11);
    --kui-color-foreground-inverse-secondary: var(--kui-color-scale-slate6);
    --kui-color-foreground-inverse: var(--kui-color-scale-slate2);
    --kui-color-foreground-on-emphasis: var(--kui-color-scale-white);
    --kui-color-foreground-neutral-tertiary: var(--kui-color-scale-slate8);
    --kui-color-foreground-neutral-secondary: var(--kui-color-scale-slate9);
    --kui-color-foreground-neutral-emphasis: var(--kui-color-scale-slate11);
    --kui-color-foreground-neutral: var(--kui-color-scale-slate10);
    --kui-color-border-highlight: var(--kui-color-scale-pink6);
    --kui-color-border-pending: var(--kui-color-scale-purple6);
    --kui-color-border-critical: var(--kui-color-scale-red6);
    --kui-color-border-caution: var(--kui-color-scale-amber6);
    --kui-color-border-positive: var(--kui-color-scale-green6);
    --kui-color-border-accent: var(--kui-color-scale-indigo6);
    --kui-color-border-emphasis: var(--kui-color-scale-slate6);
    --kui-color-border-neutral: var(--kui-color-scale-slate5);
    --kui-color-border-muted: var(--kui-color-scale-slate4);
    --kui-color-background-highlight-emphasis: var(--kui-color-scale-pink9);
    --kui-color-background-highlight: var(--kui-color-scale-pink3);
    --kui-color-background-pending-emphasis: var(--kui-color-scale-purple9);
    --kui-color-background-pending: var(--kui-color-scale-purple3);
    --kui-color-background-critical-emphasis: var(--kui-color-scale-red9);
    --kui-color-background-critical: var(--kui-color-scale-red3);
    --kui-color-background-caution-emphasis: var(--kui-color-scale-amber9);
    --kui-color-background-caution: var(--kui-color-scale-amber3);
    --kui-color-background-positive-emphasis: var(--kui-color-scale-green9);
    --kui-color-background-positive: var(--kui-color-scale-green3);
    --kui-color-background-accent-emphasis: var(--kui-color-scale-indigo9);
    --kui-color-background-accent: var(--kui-color-scale-indigo3);
    --kui-color-background-inverse: var(--kui-color-scale-slate10);
    --kui-color-background-surface-tertiary: var(--kui-color-scale-slate4);
    --kui-color-background-surface-secondary: var(--kui-color-scale-slate3);
    --kui-color-background-surface: var(--kui-color-scale-slate2);
    --kui-color-background-canvas: var(--kui-color-scale-slate1);
  }
}
.kui-theme {
  --kui-animation-easing-ease-out: cubic-bezier(0, 0, 0.4, 1);
  --kui-animation-easing-ease-in: cubic-bezier(0.5, 0, 1, 1);
  --kui-animation-easing-ease-in-out: cubic-bezier(0.45, 0, 0.4, 1);
  --kui-animation-duration-xlong: 1920ms;
  --kui-animation-duration-long: 960ms;
  --kui-animation-duration-regular: 320ms;
  --kui-animation-duration-short: 160ms;
}
.kui-theme {
  --kui-size-dialog-large: 860px;
  --kui-size-dialog-medium: 640px;
  --kui-size-dialog-small: 420px;
  --kui-size-dialog-xsmall: 320px;
  --kui-size-container-xlarge: 1400px;
  --kui-size-container-large: 1280px;
  --kui-size-container-medium: 940px;
  --kui-size-container-small: 660px;
  --kui-size-container-xsmall: 400px;
  --kui-size-alias-focus-ring-gap: 2px;
  --kui-size-alias-focus-ring: 2px;
  --kui-size-icon-large: var(--kui-size-scale-400);
  --kui-size-icon-medium: var(--kui-size-scale-300);
  --kui-size-icon-regular: var(--kui-size-scale-200);
  --kui-size-icon-small: var(--kui-size-scale-150);
  --kui-size-element-xlarge: var(--kui-size-scale-800);
  --kui-size-element-large: var(--kui-size-scale-600);
  --kui-size-element-medium: var(--kui-size-scale-450);
  --kui-size-element-regular: var(--kui-size-scale-400);
  --kui-size-element-small: var(--kui-size-scale-300);
  --kui-size-element-xsmall: var(--kui-size-scale-200);
  --kui-size-alias-single-line-width: var(--kui-size-scale-2400);
  --kui-size-alias-single-line-height: var(--kui-size-scale-400);
}
.kui-theme {
  --kui-size-radius-xlarge: 16px;
  --kui-size-radius-large: 12px;
  --kui-size-radius-medium: 8px;
  --kui-size-radius-regular: 6px;
  --kui-size-radius-small: 4px;
  --kui-size-radius-xsmall: 2px;
  --kui-size-radius-full: 9999px;
  --kui-size-border-large: 4px;
  --kui-size-border-medium: 2px;
  --kui-size-border-regular: 1px;
  --kui-size-space-xxlarge: var(--kui-size-scale-400);
  --kui-size-space-xlarge: var(--kui-size-scale-300);
  --kui-size-space-large: var(--kui-size-scale-200);
  --kui-size-space-medium: var(--kui-size-scale-150);
  --kui-size-space-regular: var(--kui-size-scale-100);
  --kui-size-space-small: var(--kui-size-scale-50);
  --kui-size-space-xsmall: var(--kui-size-scale-25);
  --kui-size-shadow-large: 0px var(--kui-size-scale-100) var(--kui-size-scale-300) 0px;
  --kui-size-shadow-medium: 0px var(--kui-size-scale-40) var(--kui-size-scale-75) 0px;
  --kui-size-shadow-small: 0px var(--kui-size-scale-10) var(--kui-size-scale-25) 0px;
}
.kui-theme {
  --kui-size-scale-6000: 480px;
  --kui-size-scale-5000: 400px;
  --kui-size-scale-4600: 368px;
  --kui-size-scale-3600: 288px;
  --kui-size-scale-3400: 272px;
  --kui-size-scale-3000: 240px;
  --kui-size-scale-2400: 192px;
  --kui-size-scale-2000: 160px;
  --kui-size-scale-1700: 136px;
  --kui-size-scale-1600: 128px;
  --kui-size-scale-1250: 100px;
  --kui-size-scale-1200: 96px;
  --kui-size-scale-1000: 80px;
  --kui-size-scale-900: 72px;
  --kui-size-scale-800: 64px;
  --kui-size-scale-700: 56px;
  --kui-size-scale-675: 54px;
  --kui-size-scale-600: 48px;
  --kui-size-scale-550: 44px;
  --kui-size-scale-500: 40px;
  --kui-size-scale-450: 36px;
  --kui-size-scale-400: 32px;
  --kui-size-scale-350: 28px;
  --kui-size-scale-325: 26px;
  --kui-size-scale-300: 24px;
  --kui-size-scale-275: 22px;
  --kui-size-scale-250: 20px;
  --kui-size-scale-225: 18px;
  --kui-size-scale-200: 16px;
  --kui-size-scale-175: 14px;
  --kui-size-scale-160: 13px;
  --kui-size-scale-150: 12px;
  --kui-size-scale-130: 11px;
  --kui-size-scale-125: 10px;
  --kui-size-scale-115: 9px;
  --kui-size-scale-100: 8px;
  --kui-size-scale-85: 7px;
  --kui-size-scale-75: 6px;
  --kui-size-scale-65: 5px;
  --kui-size-scale-50: 4px;
  --kui-size-scale-40: 3px;
  --kui-size-scale-25: 2px;
  --kui-size-scale-10: 1px;
  --kui-size-scale-0: 0px;
}
.kui-theme {
  --kui-typography-heading-large-lineheight: 1.2;
  --kui-typography-heading-large-size: 32px;
  --kui-typography-heading-medium-lineheight: 1.2;
  --kui-typography-heading-medium-size: 24px;
  --kui-typography-heading-regular-lineheight: 1.2;
  --kui-typography-heading-regular-size: 20px;
  --kui-typography-heading-small-lineheight: 1.2;
  --kui-typography-heading-small-size: 16px;
  --kui-typography-text-large-lineheight: 1.2;
  --kui-typography-text-large-size: 18px;
  --kui-typography-text-medium-lineheight: 1.4;
  --kui-typography-text-medium-size: 16px;
  --kui-typography-text-regular-lineheight: 1.4;
  --kui-typography-text-regular-size: 14px;
  --kui-typography-text-small-lineheight: 1.4;
  --kui-typography-text-small-size: 12px;
  --kui-typography-lineheight-small: 1.2;
  --kui-typography-lineheight-medium: 1.4;
  --kui-typography-lineheight-large: 1.6;
  --kui-typography-font-weight-bold: 700;
  --kui-typography-font-weight-semibold: 600;
  --kui-typography-font-weight-medium: 500;
  --kui-typography-font-weight-regular: 400;
  --kui-typography-font-family-code: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
  --kui-typography-font-family-base: var(--font-inter, Inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --kui-typography-heading-large-capheight: 23.2727px;
  --kui-typography-heading-large-capheight-trim: -0.2364em;
  --kui-typography-heading-large-baseline-trim: -0.2364em;
  --kui-typography-heading-medium-capheight: 17.4545px;
  --kui-typography-heading-medium-capheight-trim: -0.2364em;
  --kui-typography-heading-medium-baseline-trim: -0.2364em;
  --kui-typography-heading-regular-capheight: 14.5455px;
  --kui-typography-heading-regular-capheight-trim: -0.2364em;
  --kui-typography-heading-regular-baseline-trim: -0.2364em;
  --kui-typography-heading-small-capheight: 11.6364px;
  --kui-typography-heading-small-capheight-trim: -0.2364em;
  --kui-typography-heading-small-baseline-trim: -0.2364em;
  --kui-typography-text-large-capheight: 13.0909px;
  --kui-typography-text-large-capheight-trim: -0.2364em;
  --kui-typography-text-large-baseline-trim: -0.2364em;
  --kui-typography-text-medium-capheight: 11.6364px;
  --kui-typography-text-medium-capheight-trim: -0.3364em;
  --kui-typography-text-medium-baseline-trim: -0.3364em;
  --kui-typography-text-regular-capheight: 10.1818px;
  --kui-typography-text-regular-capheight-trim: -0.3364em;
  --kui-typography-text-regular-baseline-trim: -0.3364em;
  --kui-typography-text-small-capheight: 8.7273px;
  --kui-typography-text-small-capheight-trim: -0.3364em;
  --kui-typography-text-small-baseline-trim: -0.3364em;
}`;
var schemes = {
	auto: SCHEME_AUTO,
	light: SCHEME_LIGHT,
	dark: SCHEME_DARK
};
var documentElementClasses = (args) => {
	const scheme = schemes[args.colorScheme || "auto"];
	return `${documentReset(args.bodyBackground)} ${THEME_DEFAULT} ${scheme}`;
};
/**
* Deactivate auto-enlargement of small text in Safari. Remove the default touch
* highlight in Safari. Reset the body element to sane defaults.
*/
var documentReset = (background = "canvas") => css`
  html& {
    scroll-behavior: smooth;
    text-size-adjust: none;
    -webkit-tap-highlight-color: #0000;
  }
  @media (prefers-reduced-motion: reduce) {
    html& {
      scroll-behavior: auto;
    }
  }

  html& body {
    background-color: ${tokenSchema.color.background[background]};
    margin: 0;
  }
`;
function flatString(str) {
	return str.replace(/\n|\s{2,}/g, "");
}
var reset = resetClassName.replace(":", "\\:");
var elementReset = flatString(`
  :where(.${reset}) {
    border: 0;
    box-sizing: border-box;
    font: inherit;
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  :where(ol.${reset}, ul.${reset}) { list-style: none; }
  :where(canvas.${reset}, img.${reset}, picture.${reset}, svg.${reset}, video.${reset}) { display: block; }
  :where(input.${reset}, button.${reset}, textarea.${reset}, select.${reset}) { appearance: none; background-color: transparent; }
  :where(a.${reset}, abbr.${reset}) { color: inherit; text-decoration: none; }
  :where(table.${reset}) = { border-collapse: collapse; border-spacing: 0; }
`);
injectGlobal(cssCustomProperties);
injectGlobal(elementReset);
function useScale() {
	return !useMediaQuery("(any-pointer: fine)") ? "large" : "medium";
}
/** Consolidates core functionality and dependencies of the Keystar component library. */
var KeystarProvider = forwardRefWithAs(function KeystarProvider(props, forwardedRef) {
	let prevContext = (0, import_react.useContext)(Context);
	let prevColorScheme = prevContext && prevContext.colorScheme;
	let autoScale = useScale();
	let { locale: prevLocale } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let matchedBreakpoints = useMatchedBreakpoints();
	let { children, colorScheme = prevColorScheme || "auto", isDisabled, isRequired, isReadOnly, locale = prevContext ? prevLocale : void 0, router, scale = prevContext ? prevContext.scale : autoScale, ...otherProps } = props;
	let filteredProps = Object.fromEntries(Object.entries({
		colorScheme,
		isDisabled,
		isRequired,
		isReadOnly,
		scale
	}).filter(([_, value]) => value !== void 0));
	let context = Object.assign({}, prevContext, filteredProps);
	let contents = children;
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
	let styleProps = useStyleProps(otherProps);
	if (!prevContext || props.elementType || props.locale || colorScheme !== prevContext.colorScheme || scale !== prevContext.scale || Object.keys(domProps).length > 0 || otherProps.UNSAFE_className || styleProps.style && Object.keys(styleProps.style).length > 0) {
		var _props$elementType;
		contents = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProviderWrapper, {
			ref: forwardedRef,
			...props,
			style: { isolation: !prevContext ? "isolate" : void 0 },
			elementType: (_props$elementType = props.elementType) !== null && _props$elementType !== void 0 ? _props$elementType : "div",
			children: contents
		});
	}
	if (router) contents = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(RouterContextProvider, {
		router,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)($caaf0dd3060ed57c$export$323e4fc2fa4753fb, {
			...router,
			children: contents
		})
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value: context,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(BreakpointProvider, {
			value: matchedBreakpoints,
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)($2eb8e6d23f3d0cb0$export$a54013f0d02a8f82, {
				locale,
				children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)($c07df45195231803$export$178405afcd8c5eb, { children: contents })
			})
		})
	});
});
var ProviderWrapper = forwardRefWithAs(function ProviderWrapper(props, forwardedRef) {
	var _props$elementType2;
	let { children, style } = props;
	let { locale, direction } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let { modalProviderProps } = $c07df45195231803$export$d9aaed4c3ece1bc0();
	let { colorScheme } = useProvider();
	const ElementType = (_props$elementType2 = props.elementType) !== null && _props$elementType2 !== void 0 ? _props$elementType2 : "div";
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		...modalProviderProps,
		className: `${props.UNSAFE_className ? `${props.UNSAFE_className} ` : ""}${documentElementClasses({
			bodyBackground: props.bodyBackground,
			colorScheme
		})}`,
		lang: locale,
		dir: direction,
		ref: forwardedRef,
		style: {
			...style,
			...props.UNSAFE_style
		},
		children
	});
});
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-core.js
function ClientSideOnlyDocumentElement(props) {
	const $ = c(6);
	const context = useProvider();
	let t0;
	if ($[0] !== props.bodyBackground || $[1] !== context.colorScheme) {
		t0 = documentElementClasses({
			bodyBackground: props.bodyBackground,
			colorScheme: context.colorScheme
		});
		$[0] = props.bodyBackground;
		$[1] = context.colorScheme;
		$[2] = t0;
	} else t0 = $[2];
	const classes = t0;
	let t1;
	let t2;
	if ($[3] !== classes) {
		t1 = () => {
			const split = classes.split(" ");
			const root = document.documentElement;
			root.classList.add(...split);
			return () => {
				root.classList.remove(...split);
			};
		};
		t2 = [classes];
		$[3] = classes;
		$[4] = t1;
		$[5] = t2;
	} else {
		t1 = $[4];
		t2 = $[5];
	}
	(0, import_react.useLayoutEffect)(t1, t2);
	return null;
}
//#endregion
//#region node_modules/react-aria/dist/private/button/useButton.mjs
function $ac4318a9c075bb9f$export$ea18c227d4417cc3(props, ref) {
	let { elementType = "button", isDisabled, onPress, onPressStart, onPressEnd, onPressUp, onPressChange, preventFocusOnPress, allowFocusWhenDisabled, onClick, href, target, rel, type = "button" } = props;
	let additionalProps;
	if (elementType === "button") additionalProps = {
		type,
		disabled: isDisabled,
		form: props.form,
		formAction: props.formAction,
		formEncType: props.formEncType,
		formMethod: props.formMethod,
		formNoValidate: props.formNoValidate,
		formTarget: props.formTarget,
		name: props.name,
		value: props.value
	};
	else additionalProps = {
		role: "button",
		href: elementType === "a" && !isDisabled ? href : void 0,
		target: elementType === "a" ? target : void 0,
		type: elementType === "input" ? type : void 0,
		disabled: elementType === "input" ? isDisabled : void 0,
		"aria-disabled": !isDisabled || elementType === "input" ? void 0 : isDisabled,
		rel: elementType === "a" ? rel : void 0
	};
	let { pressProps, isPressed } = $d27d541f9569d26d$export$45712eceda6fad21({
		onPressStart,
		onPressEnd,
		onPressChange,
		onPress,
		onPressUp,
		onClick,
		isDisabled,
		preventFocusOnPress,
		ref
	});
	let { focusableProps } = $d1116acdf220c2da$export$4c014de7c8940b4c(props, ref);
	if (allowFocusWhenDisabled) focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
	let buttonProps = $bbaa08b3cd72f041$export$9d1611c77c2fe928(focusableProps, pressProps, $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, { labelable: true }));
	return {
		isPressed,
		buttonProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(additionalProps, buttonProps, {
			"aria-haspopup": props["aria-haspopup"],
			"aria-expanded": props["aria-expanded"],
			"aria-controls": props["aria-controls"],
			"aria-pressed": props["aria-pressed"],
			"aria-current": props["aria-current"],
			"aria-disabled": props["aria-disabled"]
		})
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useHover.mjs
var $e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents = false;
var $e969f22b6713ca4a$var$hoverCount = 0;
function $e969f22b6713ca4a$var$setGlobalIgnoreEmulatedMouseEvents() {
	$e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents = true;
	setTimeout(() => {
		$e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents = false;
	}, 500);
}
function $e969f22b6713ca4a$var$handleGlobalPointerEvent(e) {
	if (e.pointerType === "touch") $e969f22b6713ca4a$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $e969f22b6713ca4a$var$setupGlobalTouchEvents() {
	let ownerDocument = $d447af545b77c9f1$export$b204af158042fbac(null);
	if (typeof ownerDocument === "undefined") return;
	if ($e969f22b6713ca4a$var$hoverCount === 0) {
		if (typeof PointerEvent !== "undefined") ownerDocument.addEventListener("pointerup", $e969f22b6713ca4a$var$handleGlobalPointerEvent);
	}
	$e969f22b6713ca4a$var$hoverCount++;
	return () => {
		$e969f22b6713ca4a$var$hoverCount--;
		if ($e969f22b6713ca4a$var$hoverCount > 0) return;
		if (typeof PointerEvent !== "undefined") ownerDocument.removeEventListener("pointerup", $e969f22b6713ca4a$var$handleGlobalPointerEvent);
	};
}
function $e969f22b6713ca4a$export$ae780daf29e6d456(props) {
	let { onHoverStart, onHoverChange, onHoverEnd, isDisabled } = props;
	let [isHovered, setHovered] = (0, import_react.useState)(false);
	let state = (0, import_react.useRef)({
		isHovered: false,
		ignoreEmulatedMouseEvents: false,
		pointerType: "",
		target: null
	}).current;
	(0, import_react.useEffect)($e969f22b6713ca4a$var$setupGlobalTouchEvents, []);
	let { addGlobalListener, removeAllGlobalListeners } = $48a7d519b337145d$export$4eaf04e54aa8eed6();
	let { hoverProps, triggerHoverEnd } = (0, import_react.useMemo)(() => {
		let triggerHoverStart = (event, pointerType) => {
			state.pointerType = pointerType;
			if (isDisabled || pointerType === "touch" || state.isHovered || !$23f2114a1b82827e$export$4282f70798064fe0(event.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(event))) return;
			state.isHovered = true;
			let target = event.currentTarget;
			state.target = target;
			addGlobalListener($d447af545b77c9f1$export$b204af158042fbac($23f2114a1b82827e$export$e58f029f0fbfdb29(event)), "pointerover", (e) => {
				if (state.isHovered && state.target && !$23f2114a1b82827e$export$4282f70798064fe0(state.target, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) triggerHoverEnd(e, e.pointerType);
			}, { capture: true });
			if (onHoverStart) onHoverStart({
				type: "hoverstart",
				target,
				pointerType
			});
			if (onHoverChange) onHoverChange(true);
			setHovered(true);
		};
		let triggerHoverEnd = (event, pointerType) => {
			let target = state.target;
			state.pointerType = "";
			state.target = null;
			if (pointerType === "touch" || !state.isHovered || !target) return;
			state.isHovered = false;
			removeAllGlobalListeners();
			if (onHoverEnd) onHoverEnd({
				type: "hoverend",
				target,
				pointerType
			});
			if (onHoverChange) onHoverChange(false);
			setHovered(false);
		};
		let hoverProps = {};
		if (typeof PointerEvent !== "undefined") {
			hoverProps.onPointerEnter = (e) => {
				if ($e969f22b6713ca4a$var$globalIgnoreEmulatedMouseEvents && e.pointerType === "mouse") return;
				triggerHoverStart(e, e.pointerType);
			};
			hoverProps.onPointerLeave = (e) => {
				if (!isDisabled && $23f2114a1b82827e$export$4282f70798064fe0(e.currentTarget, $23f2114a1b82827e$export$e58f029f0fbfdb29(e))) triggerHoverEnd(e, e.pointerType);
			};
		}
		return {
			hoverProps,
			triggerHoverEnd
		};
	}, [
		onHoverStart,
		onHoverChange,
		onHoverEnd,
		isDisabled,
		state,
		addGlobalListener,
		removeAllGlobalListeners
	]);
	(0, import_react.useEffect)(() => {
		if (isDisabled) triggerHoverEnd({ currentTarget: state.target }, state.pointerType);
	}, [isDisabled]);
	return {
		hoverProps,
		isHovered
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/link/useLink.mjs
function $40d752843fab8930$export$dcf14c9974fe2767(props, ref) {
	let { elementType = "a", onPress, onPressStart, onPressEnd, onClick, isDisabled, ...otherProps } = props;
	let linkProps = {};
	if (elementType !== "a") linkProps = {
		role: "link",
		tabIndex: !isDisabled ? 0 : void 0
	};
	let { focusableProps } = $d1116acdf220c2da$export$4c014de7c8940b4c(props, ref);
	let { pressProps, isPressed } = $d27d541f9569d26d$export$45712eceda6fad21({
		onPress,
		onPressStart,
		onPressEnd,
		onClick,
		isDisabled,
		ref
	});
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, { labelable: true });
	let interactionHandlers = $bbaa08b3cd72f041$export$9d1611c77c2fe928(focusableProps, pressProps);
	let router = $caaf0dd3060ed57c$export$9a302a45f65d0572();
	let routerLinkProps = $caaf0dd3060ed57c$export$7e924b3091a3bd18(props);
	return {
		isPressed,
		linkProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(domProps, routerLinkProps, {
			...interactionHandlers,
			...linkProps,
			"aria-disabled": isDisabled || void 0,
			"aria-current": props["aria-current"],
			onClick: (e) => {
				pressProps.onClick?.(e);
				$caaf0dd3060ed57c$export$13aea1a3cb5e3f1f(e, router, props.href, props.routerOptions);
			}
		})
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/number.mjs
/**
* Takes a value and forces it to the closest min/max if it's outside. Also forces it to the closest
* valid step.
*/ function $240e9101ba2842f5$export$7d15b64cf5a3a4c4(value, min = -Infinity, max = Infinity) {
	return Math.min(Math.max(value, min), max);
}
function $240e9101ba2842f5$export$e1a7b8e69ef6c52f(value, step) {
	let roundedValue = value;
	let precision = 0;
	let stepString = step.toString();
	let eIndex = stepString.toLowerCase().indexOf("e-");
	if (eIndex > 0) precision = Math.abs(Math.floor(Math.log10(Math.abs(step)))) + eIndex;
	else {
		let pointIndex = stepString.indexOf(".");
		if (pointIndex >= 0) precision = stepString.length - pointIndex;
	}
	if (precision > 0) {
		let pow = Math.pow(10, precision);
		roundedValue = Math.round(roundedValue * pow) / pow;
	}
	return roundedValue;
}
function $240e9101ba2842f5$export$cb6e0bb50bc19463(value, min, max, step) {
	min = Number(min);
	max = Number(max);
	let remainder = (value - (isNaN(min) ? 0 : min)) % step;
	let snappedValue = $240e9101ba2842f5$export$e1a7b8e69ef6c52f(Math.abs(remainder) * 2 >= step ? value + Math.sign(remainder) * (step - Math.abs(remainder)) : value - remainder, step);
	if (!isNaN(min)) {
		if (snappedValue < min) snappedValue = min;
		else if (!isNaN(max) && snappedValue > max) snappedValue = min + Math.floor($240e9101ba2842f5$export$e1a7b8e69ef6c52f((max - min) / step, step)) * step;
	} else if (!isNaN(max) && snappedValue > max) snappedValue = Math.floor($240e9101ba2842f5$export$e1a7b8e69ef6c52f(max / step, step)) * step;
	snappedValue = $240e9101ba2842f5$export$e1a7b8e69ef6c52f(snappedValue, step);
	return snappedValue;
}
//#endregion
//#region node_modules/react-aria/dist/private/progress/useProgressBar.mjs
function $723aca2821613fe7$export$ed5abd763a836edc(props) {
	let { value = 0, minValue = 0, maxValue = 100, valueLabel, isIndeterminate, formatOptions = { style: "percent" } } = props;
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, { labelable: true });
	let { labelProps, fieldProps } = $0beb20c9744a2065$export$8467354a121f1b9f({
		...props,
		labelElementType: "span"
	});
	value = $240e9101ba2842f5$export$7d15b64cf5a3a4c4(value, minValue, maxValue);
	let percentage = (value - minValue) / (maxValue - minValue);
	let formatter = $bd90acf18e792be6$export$b7a616150fdb9f44(formatOptions);
	if (!isIndeterminate && !valueLabel) {
		let valueToFormat = formatOptions.style === "percent" ? percentage : value;
		valueLabel = formatter.format(valueToFormat);
	}
	return {
		progressBarProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(domProps, {
			...fieldProps,
			"aria-valuenow": isIndeterminate ? void 0 : value,
			"aria-valuemin": minValue,
			"aria-valuemax": maxValue,
			"aria-valuetext": isIndeterminate ? void 0 : valueLabel,
			role: "progressbar"
		}),
		labelProps
	};
}
keyframes({
	from: { transform: "translate(-100%)" },
	to: { transform: "translate(100%)" }
});
keyframes({
	from: { transform: "translate(100%)" },
	to: { transform: "translate(-100%)" }
});
/**
* Progress circles show the progression of a system operation such as
* downloading, uploading, processing, etc. in a visual way. They can represent
* determinate or indeterminate progress.
*/
var ProgressCircle = /*#__PURE__*/ (0, import_react.forwardRef)(function ProgressCircle(props, forwardRef) {
	var _isIndeterminate, _isIndeterminate2, _isIndeterminate3;
	const $ = c(40);
	let t0;
	let t1;
	let t2;
	let t3;
	let otherProps;
	let ariaLabel;
	let ariaLabelledby;
	let isIndeterminate;
	if ($[0] !== props) {
		({value: t0, minValue: t1, maxValue: t2, size: t3, isIndeterminate, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ...otherProps} = props);
		$[0] = props;
		$[1] = t0;
		$[2] = t1;
		$[3] = t2;
		$[4] = t3;
		$[5] = otherProps;
		$[6] = ariaLabel;
		$[7] = ariaLabelledby;
		$[8] = isIndeterminate;
	} else {
		t0 = $[1];
		t1 = $[2];
		t2 = $[3];
		t3 = $[4];
		otherProps = $[5];
		ariaLabel = $[6];
		ariaLabelledby = $[7];
		isIndeterminate = $[8];
	}
	let value = t0 === void 0 ? 0 : t0;
	const minValue = t1 === void 0 ? 0 : t1;
	const maxValue = t2 === void 0 ? 100 : t2;
	const size = t3 === void 0 ? "medium" : t3;
	value = $240e9101ba2842f5$export$7d15b64cf5a3a4c4(value, minValue, maxValue);
	let t4;
	if ($[9] !== props || $[10] !== value) {
		t4 = {
			...props,
			value
		};
		$[9] = props;
		$[10] = value;
		$[11] = t4;
	} else t4 = $[11];
	const { progressBarProps } = $723aca2821613fe7$export$ed5abd763a836edc(t4);
	const styleProps = useStyleProps(otherProps);
	warning(!!(ariaLabel || ariaLabelledby), "ProgressCircle requires an aria-label or aria-labelledby attribute for accessibility.");
	const t5 = (_isIndeterminate = isIndeterminate) !== null && _isIndeterminate !== void 0 ? _isIndeterminate : void 0;
	const t6 = size === "medium" ? void 0 : size;
	let t7;
	if ($[12] !== t5 || $[13] !== t6) {
		t7 = toDataAttributes({
			indeterminate: t5,
			size: t6
		});
		$[12] = t5;
		$[13] = t6;
		$[14] = t7;
	} else t7 = $[14];
	let t8;
	if ($[15] !== styleProps.className) {
		t8 = classNames(css({
			height: "var(--diameter)",
			width: "var(--diameter)",
			"--diameter": tokenSchema.size.element.regular,
			"--radius": "calc(var(--diameter) / 2)",
			"--stroke-width": tokenSchema.size.scale[40],
			"--offset-radius": "calc(var(--radius) - var(--stroke-width) / 2)",
			"--circumference": `calc(var(--offset-radius) * pi * 2)`,
			"&[data-size=small]": {
				"--diameter": tokenSchema.size.element.xsmall,
				"--stroke-width": tokenSchema.size.border.medium
			},
			"&[data-size=large]": {
				"--diameter": tokenSchema.size.element.xlarge,
				"--stroke-width": tokenSchema.size.border.large
			}
		}), styleProps.className);
		$[15] = styleProps.className;
		$[16] = t8;
	} else t8 = $[16];
	const t9 = (value - minValue) / (maxValue - minValue);
	let t10;
	if ($[17] !== t9 || $[18] !== styleProps.style) {
		t10 = {
			"--percent": t9,
			...styleProps.style
		};
		$[17] = t9;
		$[18] = styleProps.style;
		$[19] = t10;
	} else t10 = $[19];
	const t11 = (_isIndeterminate2 = isIndeterminate) !== null && _isIndeterminate2 !== void 0 ? _isIndeterminate2 : void 0;
	let t12;
	if ($[20] !== t11) {
		t12 = toDataAttributes({ indeterminate: t11 });
		$[20] = t11;
		$[21] = t12;
	} else t12 = $[21];
	let t13;
	if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
		t13 = css({
			height: "var(--diameter)",
			width: "var(--diameter)",
			"&[data-indeterminate]": { animation: `${rotateAnimation} ${tokenSchema.animation.duration.xlong} linear infinite` }
		});
		$[22] = t13;
	} else t13 = $[22];
	let t14;
	if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
		t14 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", { className: circle({ stroke: tokenSchema.color.border.muted }) });
		$[23] = t14;
	} else t14 = $[23];
	const t15 = (_isIndeterminate3 = isIndeterminate) !== null && _isIndeterminate3 !== void 0 ? _isIndeterminate3 : void 0;
	let t16;
	if ($[24] !== t15) {
		t16 = toDataAttributes({ indeterminate: t15 });
		$[24] = t15;
		$[25] = t16;
	} else t16 = $[25];
	let t17;
	if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
		t17 = circle({
			stroke: tokenSchema.color.background.accentEmphasis,
			strokeDasharray: "var(--circumference)",
			strokeLinecap: "round",
			"&:not([data-indeterminate])": {
				strokeDashoffset: `calc(var(--circumference) - var(--percent) * var(--circumference))`,
				transition: transition("stroke-dashoffset", { duration: "regular" }),
				transform: "rotate(-90deg)",
				transformOrigin: "center"
			},
			"&[data-indeterminate]": { animation: `${dashAnimation} ${tokenSchema.animation.duration.xlong} ${tokenSchema.animation.easing.easeInOut} infinite` }
		});
		$[26] = t17;
	} else t17 = $[26];
	let t18;
	if ($[27] !== t16) {
		t18 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("circle", {
			...t16,
			className: t17
		});
		$[27] = t16;
		$[28] = t18;
	} else t18 = $[28];
	let t19;
	if ($[29] !== t12 || $[30] !== t18) {
		t19 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
			...t12,
			role: "presentation",
			tabIndex: -1,
			className: t13,
			children: [t14, t18]
		});
		$[29] = t12;
		$[30] = t18;
		$[31] = t19;
	} else t19 = $[31];
	let t20;
	if ($[32] !== styleProps || $[33] !== progressBarProps || $[34] !== forwardRef || $[35] !== t7 || $[36] !== t8 || $[37] !== t10 || $[38] !== t19) {
		t20 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...styleProps,
			...progressBarProps,
			ref: forwardRef,
			...t7,
			className: t8,
			style: t10,
			children: t19
		});
		$[32] = styleProps;
		$[33] = progressBarProps;
		$[34] = forwardRef;
		$[35] = t7;
		$[36] = t8;
		$[37] = t10;
		$[38] = t19;
		$[39] = t20;
	} else t20 = $[39];
	return t20;
});
function circle(styles) {
	return css([{
		cx: "var(--radius)",
		cy: "var(--radius)",
		r: "var(--offset-radius)",
		fill: "transparent",
		strokeWidth: "var(--stroke-width)"
	}, styles]);
}
var rotateAnimation = keyframes({
	from: { transform: "rotate(0deg)" },
	to: { transform: "rotate(360deg)" }
});
var dashAnimation = keyframes({
	from: { strokeDashoffset: "calc(var(--circumference) * 1.25)" },
	to: { strokeDashoffset: "calc(var(--circumference) * -0.75)" }
});
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-icon-icons-xIcon.js
/** ![xIcon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz48cGF0aCBkPSJNMTggNiA2IDE4TTYgNmwxMiAxMiIvPjwvc3ZnPg==) */
var xIcon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M18 6 6 18M6 6l12 12" });
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-icon.js
var STROKE_VAR = `--kui-icon-stroke`;
var Icon = (props) => {
	var _maybeTokenByKey;
	props = useSlotProps(props, "icon");
	const { strokeScaling, size, color, ...otherProps } = props;
	const stroke = (_maybeTokenByKey = maybeTokenByKey("color.foreground", color)) !== null && _maybeTokenByKey !== void 0 ? _maybeTokenByKey : "currentColor";
	const iconClassName = css({
		fill: "none",
		stroke: `var(${STROKE_VAR})`,
		flexShrink: 0,
		height: tokenSchema.size.icon.regular,
		width: tokenSchema.size.icon.regular,
		"&[data-size=small]": {
			height: tokenSchema.size.icon.small,
			width: tokenSchema.size.icon.small
		},
		"&[data-size=medium]": {
			height: tokenSchema.size.icon.medium,
			width: tokenSchema.size.icon.medium
		},
		"&[data-size=large]": {
			height: tokenSchema.size.icon.large,
			width: tokenSchema.size.icon.large
		},
		"&[data-stroke-scaling=false] > *": { vectorEffect: "non-scaling-stroke" }
	});
	const styleProps = useStyleProps(otherProps);
	const hasAriaLabel = "aria-label" in props && !!props["aria-label"];
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...toDataAttributes({
			strokeScaling,
			size
		}),
		...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, { labelable: true }),
		"aria-hidden": !hasAriaLabel,
		focusable: "false",
		role: "img",
		className: classNames(iconClassName, styleProps.className),
		style: {
			[STROKE_VAR]: stroke,
			...styleProps.style
		},
		height: "1em",
		children: props.src
	});
};
//#endregion
//#region node_modules/react-aria/dist/private/button/useToggleButton.mjs
function $b54a524c670b905d$export$51e84d46ca0bc451(props, state, ref) {
	const { isSelected } = state;
	const { isPressed, buttonProps } = $ac4318a9c075bb9f$export$ea18c227d4417cc3({
		...props,
		onPress: $a4e76a5424781910$export$e08e3b67e392101e(state.toggle, props.onPress)
	}, ref);
	return {
		isPressed,
		isSelected,
		isDisabled: props.isDisabled || false,
		buttonProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, { "aria-pressed": isSelected })
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/toggle/useToggleState.mjs
function $fd3c5e01e837dc20$export$8042c6c013fd5226(props = {}) {
	let { isReadOnly } = props;
	let [isSelected, setSelected] = $3e6197669829fe11$export$40bfa8c7b0832715(props.isSelected, props.defaultSelected || false, props.onChange);
	let [initialValue] = (0, import_react.useState)(isSelected);
	function updateSelected(value) {
		if (!isReadOnly) setSelected(value);
	}
	function toggleState() {
		if (!isReadOnly) setSelected(!isSelected);
	}
	return {
		isSelected,
		defaultSelected: props.defaultSelected ?? initialValue,
		setSelected: updateSelected,
		toggle: toggleState
	};
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-button.js
function getCheckForOverflow(domRef, orientation, _scale, setHasOverflow, _children) {
	return () => {
		let computeHasOverflow = () => {
			if (domRef.current && orientation === "horizontal") {
				let buttonGroupChildren = Array.from(domRef.current.children);
				let maxX = domRef.current.offsetWidth + 1;
				if (buttonGroupChildren.some((child) => child.offsetLeft < 0 || child.offsetLeft + child.offsetWidth > maxX)) return true;
				return false;
			}
		};
		if (orientation === "horizontal") setHasOverflow(function* () {
			yield false;
			yield computeHasOverflow();
		});
	};
}
/**
* Handles overflow for a grouping of buttons whose actions are related to each
* other.
*/
var ButtonGroup = /*#__PURE__*/ (0, import_react.forwardRef)(function ButtonGroup(props, forwardedRef) {
	const $ = c(37);
	const { scale } = useProvider();
	props = useProviderProps(props);
	props = useSlotProps(props, "buttonGroup");
	let t0;
	let t1;
	let otherProps;
	let children;
	let isDisabled;
	if ($[0] !== props) {
		({align: t0, children, isDisabled, orientation: t1, ...otherProps} = props);
		$[0] = props;
		$[1] = t0;
		$[2] = t1;
		$[3] = otherProps;
		$[4] = children;
		$[5] = isDisabled;
	} else {
		t0 = $[1];
		t1 = $[2];
		otherProps = $[3];
		children = $[4];
		isDisabled = $[5];
	}
	const align = t0 === void 0 ? "start" : t0;
	const orientation = t1 === void 0 ? "horizontal" : t1;
	const styleProps = useStyleProps(otherProps);
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const [hasOverflow, setHasOverflow] = $1a716630a9e3a599$export$14d238f342723f25(false);
	let t2;
	let t3;
	if ($[6] !== domRef || $[7] !== orientation || $[8] !== scale || $[9] !== setHasOverflow || $[10] !== children) {
		t3 = getCheckForOverflow(domRef, orientation, scale, setHasOverflow);
		$[6] = domRef;
		$[7] = orientation;
		$[8] = scale;
		$[9] = setHasOverflow;
		$[10] = children;
		$[11] = t3;
	} else t3 = $[11];
	t2 = t3;
	const checkForOverflow = t2;
	let t4;
	let t5;
	if ($[12] !== checkForOverflow) {
		t4 = () => {
			checkForOverflow();
		};
		t5 = [checkForOverflow];
		$[12] = checkForOverflow;
		$[13] = t4;
		$[14] = t5;
	} else {
		t4 = $[13];
		t5 = $[14];
	}
	(0, import_react.useLayoutEffect)(t4, t5);
	const parent = (0, import_react.useRef)(null);
	let t6;
	if ($[15] !== domRef.current) {
		t6 = () => {
			if (domRef.current) parent.current = domRef.current.parentElement;
		};
		$[15] = domRef.current;
		$[16] = t6;
	} else t6 = $[16];
	(0, import_react.useLayoutEffect)(t6);
	let t7;
	if ($[17] !== parent || $[18] !== checkForOverflow) {
		t7 = {
			ref: parent,
			onResize: checkForOverflow
		};
		$[17] = parent;
		$[18] = checkForOverflow;
		$[19] = t7;
	} else t7 = $[19];
	$970072cf4b13fde3$export$683480f191c0e3ea(t7);
	let t8;
	if ($[20] !== otherProps) {
		t8 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
		$[20] = otherProps;
		$[21] = t8;
	} else t8 = $[21];
	const t9 = hasOverflow ? "vertical" : orientation;
	let t10;
	if ($[22] !== align || $[23] !== t9) {
		t10 = toDataAttributes({
			align,
			orientation: t9
		});
		$[22] = align;
		$[23] = t9;
		$[24] = t10;
	} else t10 = $[24];
	let t11;
	if ($[25] !== styleProps.className) {
		t11 = classNames(styleProps.className, css({
			alignItems: "flex-start",
			display: "inline-flex",
			gap: tokenSchema.size.space.regular,
			position: "relative",
			"&[data-orientation=\"horizontal\"]": {
				"&[data-align=\"center\"]": { justifyContent: "center" },
				"&[data-align=\"end\"]": { justifyContent: "flex-end" }
			},
			"&[data-orientation=\"vertical\"]": {
				flexDirection: "column",
				"&[data-align=\"center\"]": { alignItems: "center" },
				"&[data-align=\"end\"]": { alignItems: "flex-end" }
			}
		}));
		$[25] = styleProps.className;
		$[26] = t11;
	} else t11 = $[26];
	let t12;
	if ($[27] !== isDisabled || $[28] !== children) {
		t12 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(KeystarProvider, {
			isDisabled,
			children
		});
		$[27] = isDisabled;
		$[28] = children;
		$[29] = t12;
	} else t12 = $[29];
	let t13;
	if ($[30] !== t8 || $[31] !== t10 || $[32] !== styleProps || $[33] !== domRef || $[34] !== t11 || $[35] !== t12) {
		t13 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...t8,
			...t10,
			...styleProps,
			ref: domRef,
			className: t11,
			children: t12
		});
		$[30] = t8;
		$[31] = t10;
		$[32] = styleProps;
		$[33] = domRef;
		$[34] = t11;
		$[35] = t12;
		$[36] = t13;
	} else t13 = $[36];
	return t13;
});
var localizedMessages$1 = {
	"ar-AE": { "pending": `قيد الانتظار` },
	"bg-BG": { "pending": `недовършено` },
	"cs-CZ": { "pending": `čeká na vyřízení` },
	"da-DK": { "pending": `afventende` },
	"de-DE": { "pending": `Ausstehend` },
	"el-GR": { "pending": `σε εκκρεμότητα` },
	"en-US": { "pending": `pending` },
	"es-ES": { "pending": `pendiente` },
	"et-EE": { "pending": `ootel` },
	"fi-FI": { "pending": `odottaa` },
	"fr-FR": { "pending": `En attente` },
	"he-IL": { "pending": `ממתין ל` },
	"hr-HR": { "pending": `u tijeku` },
	"hu-HU": { "pending": `függőben levő` },
	"it-IT": { "pending": `in sospeso` },
	"ja-JP": { "pending": `保留` },
	"ko-KR": { "pending": `보류 중` },
	"lt-LT": { "pending": `laukiama` },
	"lv-LV": { "pending": `gaida` },
	"nb-NO": { "pending": `avventer` },
	"nl-NL": { "pending": `in behandeling` },
	"pl-PL": { "pending": `oczekujące` },
	"pt-BR": { "pending": `pendente` },
	"pt-PT": { "pending": `pendente` },
	"ro-RO": { "pending": `în așteptare` },
	"ru-RU": { "pending": `в ожидании` },
	"sk-SK": { "pending": `čakajúce` },
	"sl-SI": { "pending": `v teku` },
	"sr-SP": { "pending": `nerešeno` },
	"sv-SE": { "pending": `väntande` },
	"tr-TR": { "pending": `beklemede` },
	"uk-UA": { "pending": `в очікуванні` },
	"zh-CN": { "pending": `待处理` },
	"zh-TW": { "pending": `待處理` }
};
var buttonClassList = new ClassList("Button", ["icon", "text"]);
function useButtonStyles(props, state) {
	const { prominence = "default", tone = prominence === "high" ? "accent" : "neutral" } = props;
	const { isHovered, isPending, isPressed } = state;
	const styleProps = useStyleProps(props);
	return {
		...toDataAttributes({
			hovered: isHovered || void 0,
			pending: isPending || void 0,
			pressed: isPressed || void 0,
			prominence: prominence === "default" ? void 0 : prominence,
			tone,
			static: props.static
		}),
		style: styleProps.style,
		className: classNames(buttonClassList.element("root"), css({
			alignItems: "center",
			borderRadius: tokenSchema.size.radius.full,
			cursor: "default",
			display: "inline-flex",
			flexShrink: 0,
			fontSize: tokenSchema.typography.text.regular.size,
			fontWeight: tokenSchema.typography.fontWeight.medium,
			height: tokenSchema.size.element.regular,
			justifyContent: "center",
			minWidth: tokenSchema.size.element.regular,
			outline: 0,
			paddingInline: tokenSchema.size.space.medium,
			position: "relative",
			transitionDuration: "130ms",
			transitionProperty: "background, border-color, box-shadow, color, ",
			transitionTimingFunction: "ease-out",
			userSelect: "none",
			"a&": { cursor: "pointer" },
			"&:disabled, &[aria-disabled]": { cursor: "default" },
			[buttonClassList.selector("text", "descendant")]: {
				fontSize: "inherit",
				fontWeight: "inherit",
				marginInline: tokenSchema.size.space.regular
			},
			[`&[data-pending] ${buttonClassList.selector("text")}`]: { opacity: 0 },
			[buttonClassList.selector("icon", "descendant")]: {
				height: tokenSchema.size.scale[225],
				width: tokenSchema.size.scale[225]
			},
			[`&[data-pending] ${buttonClassList.selector("icon")}`]: { opacity: 0 },
			"--focus-ring-color": tokenSchema.color.alias.focusRing,
			"&[data-static=light]": { "--focus-ring-color": "#fff" },
			"&[data-static=dark]": { "--focus-ring-color": "#000" },
			"&::after": {
				borderRadius: tokenSchema.size.radius.full,
				content: "\"\"",
				inset: 0,
				pointerEvents: "none",
				position: "absolute",
				transition: transition(["box-shadow", "margin"], { easing: "easeOut" })
			},
			"&[data-focus=visible]::after": {
				boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} var(--focus-ring-color)`,
				margin: `calc(-1 * ${tokenSchema.size.alias.focusRingGap})`
			},
			"&:not([data-prominence])": {
				backgroundColor: tokenSchema.color.scale.slate4,
				color: tokenSchema.color.foreground.neutralEmphasis,
				"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: tokenSchema.color.scale.slate5 },
				"&[data-pressed]": { backgroundColor: tokenSchema.color.scale.slate6 },
				"&[data-tone=accent]": { color: tokenSchema.color.foreground.accent },
				"&[data-tone=critical]": { color: tokenSchema.color.foreground.critical },
				"&:disabled, &[aria-disabled=true]": {
					backgroundColor: tokenSchema.color.alias.backgroundDisabled,
					color: tokenSchema.color.alias.foregroundDisabled
				},
				"&[data-static=light]": {
					backgroundColor: "#ffffff12",
					color: "#fff",
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: "#ffffff1a" },
					"&[data-pressed]": { backgroundColor: "#ffffff26" },
					"&:disabled, &[aria-disabled]": {
						backgroundColor: "#ffffff1a",
						color: "#ffffff8c"
					}
				},
				"&[data-static=dark]": {
					backgroundColor: "#00000012",
					color: "#000",
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: "#0000001a" },
					"&[data-pressed]": { backgroundColor: "#00000026" },
					"&:disabled, &[aria-disabled]": {
						backgroundColor: "#0000001a",
						color: "#0000008c"
					}
				}
			},
			"&[data-prominence=high]": {
				backgroundColor: tokenSchema.color.scale.slate10,
				color: tokenSchema.color.foreground.inverse,
				"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: tokenSchema.color.scale.slate11 },
				"&[data-pressed]": { backgroundColor: tokenSchema.color.scale.slate11 },
				"&[data-tone=accent]": {
					backgroundColor: tokenSchema.color.scale.indigo9,
					color: tokenSchema.color.foreground.onEmphasis,
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: tokenSchema.color.scale.indigo10 },
					"&[data-pressed]": { backgroundColor: tokenSchema.color.scale.indigo11 }
				},
				"&[data-tone=critical]": {
					backgroundColor: tokenSchema.color.scale.red9,
					color: tokenSchema.color.foreground.onEmphasis,
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: tokenSchema.color.scale.red10 },
					"&[data-pressed]": { backgroundColor: tokenSchema.color.scale.red11 }
				},
				"&[data-tone]:disabled, &[data-tone][aria-disabled=true]": {
					backgroundColor: tokenSchema.color.alias.backgroundDisabled,
					color: tokenSchema.color.alias.foregroundDisabled
				},
				"&[data-static=light]": {
					backgroundColor: "#ffffffe6",
					color: "#000",
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: "#fff" },
					"&[data-pressed]": { backgroundColor: "#fff" },
					"&:disabled, &[aria-disabled]": {
						backgroundColor: "#ffffff1a",
						color: "#ffffff8c"
					}
				},
				"&[data-static=dark]": {
					backgroundColor: "#000000e6",
					color: "#fff",
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: "#000" },
					"&[data-pressed]": { backgroundColor: "#000" },
					"&:disabled, &[aria-disabled]": {
						backgroundColor: "#0000001a",
						color: "#0000008c"
					}
				}
			},
			"&[data-prominence=low]": {
				color: tokenSchema.color.foreground.neutral,
				"&[data-hovered], &[data-focus=\"visible\"]": {
					backgroundColor: tokenSchema.color.alias.backgroundHovered,
					color: tokenSchema.color.foreground.neutralEmphasis
				},
				"&[data-pressed]": { backgroundColor: tokenSchema.color.alias.backgroundPressed },
				"&[data-tone=accent]": {
					color: tokenSchema.color.foreground.accent,
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: tokenSchema.color.scale.indigo3 },
					"&[data-pressed]": { backgroundColor: tokenSchema.color.scale.indigo4 }
				},
				"&[data-tone=critical]": {
					color: tokenSchema.color.foreground.critical,
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: tokenSchema.color.scale.red3 },
					"&[data-pressed]": { backgroundColor: tokenSchema.color.scale.red4 }
				},
				"&:disabled, &[aria-disabled=true]": {
					backgroundColor: tokenSchema.color.alias.backgroundDisabled,
					color: tokenSchema.color.alias.foregroundDisabled
				},
				"&[data-static=light]": {
					color: "#fff",
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: "#ffffff1a" },
					"&[data-pressed]": { backgroundColor: "#ffffff26" },
					"&:disabled, &[aria-disabled]": { color: "#ffffff8c" }
				},
				"&[data-static=dark]": {
					color: "#000",
					"&[data-hovered], &[data-focus=\"visible\"]": { backgroundColor: "#0000001a" },
					"&[data-pressed]": { backgroundColor: "#00000026" },
					"&:disabled, &[aria-disabled]": { color: "#0000008c" }
				}
			}
		}), styleProps.className)
	};
}
var Button = /*#__PURE__*/ (0, import_react.forwardRef)(function Button(props, forwardedRef) {
	const $ = c(14);
	props = useProviderProps(props);
	props = useSlotProps(props, "button");
	const children = useButtonChildren(props);
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	if ("href" in props && props.href) {
		const t0 = domRef;
		let t1;
		if ($[0] !== t0 || $[1] !== props || $[2] !== children) {
			t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LinkButton$1, {
				ref: t0,
				...props,
				children
			});
			$[0] = t0;
			$[1] = props;
			$[2] = children;
			$[3] = t1;
		} else t1 = $[3];
		let t2;
		if ($[4] !== props.autoFocus || $[5] !== t1) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
				autoFocus: props.autoFocus,
				children: t1
			});
			$[4] = props.autoFocus;
			$[5] = t1;
			$[6] = t2;
		} else t2 = $[6];
		return t2;
	}
	const t0 = domRef;
	let t1;
	if ($[7] !== t0 || $[8] !== props || $[9] !== children) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(BaseButton$1, {
			ref: t0,
			...props,
			children
		});
		$[7] = t0;
		$[8] = props;
		$[9] = children;
		$[10] = t1;
	} else t1 = $[10];
	let t2;
	if ($[11] !== props.autoFocus || $[12] !== t1) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
			autoFocus: props.autoFocus,
			children: t1
		});
		$[11] = props.autoFocus;
		$[12] = t1;
		$[13] = t2;
	} else t2 = $[13];
	return t2;
});
/** @private Forked variant where an "href" is provided. */
var LinkButton$1 = /*#__PURE__*/ (0, import_react.forwardRef)(function Button(props, forwardedRef) {
	const $ = c(23);
	let isDisabled;
	let otherProps;
	let children;
	if ($[0] !== props) {
		({children, isDisabled, ...otherProps} = props);
		$[0] = props;
		$[1] = isDisabled;
		$[2] = otherProps;
		$[3] = children;
	} else {
		isDisabled = $[1];
		otherProps = $[2];
		children = $[3];
	}
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let t0;
	if ($[4] !== props) {
		t0 = {
			elementType: "a",
			...props
		};
		$[4] = props;
		$[5] = t0;
	} else t0 = $[5];
	const { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3(t0, domRef);
	const { linkProps } = $40d752843fab8930$export$dcf14c9974fe2767(props, domRef);
	let t1;
	if ($[6] !== isDisabled) {
		t1 = { isDisabled };
		$[6] = isDisabled;
		$[7] = t1;
	} else t1 = $[7];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t1);
	let t2;
	if ($[8] !== isHovered || $[9] !== isPressed) {
		t2 = {
			isHovered,
			isPressed
		};
		$[8] = isHovered;
		$[9] = isPressed;
		$[10] = t2;
	} else t2 = $[10];
	const styleProps = useButtonStyles(props, t2);
	let t3;
	if ($[11] !== otherProps) {
		t3 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
		$[11] = otherProps;
		$[12] = t3;
	} else t3 = $[12];
	let t4;
	if ($[13] !== buttonProps || $[14] !== linkProps || $[15] !== hoverProps || $[16] !== styleProps) {
		t4 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, linkProps, hoverProps, styleProps);
		$[13] = buttonProps;
		$[14] = linkProps;
		$[15] = hoverProps;
		$[16] = styleProps;
		$[17] = t4;
	} else t4 = $[17];
	let t5;
	if ($[18] !== t3 || $[19] !== t4 || $[20] !== domRef || $[21] !== children) {
		t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("a", {
			...t3,
			...t4,
			ref: domRef,
			children
		});
		$[18] = t3;
		$[19] = t4;
		$[20] = domRef;
		$[21] = children;
		$[22] = t5;
	} else t5 = $[22];
	return t5;
});
/** @private Forked variant where an "href" is NOT provided. */
var BaseButton$1 = /*#__PURE__*/ (0, import_react.forwardRef)(function Button(props, forwardedRef) {
	const $ = c(39);
	let t0;
	if ($[0] !== props) {
		t0 = disablePendingProps(props);
		$[0] = props;
		$[1] = t0;
	} else t0 = $[1];
	props = t0;
	let isDisabled;
	let isPending;
	let otherProps;
	let children;
	if ($[2] !== props) {
		({children, isDisabled, isPending, ...otherProps} = props);
		$[2] = props;
		$[3] = isDisabled;
		$[4] = isPending;
		$[5] = otherProps;
		$[6] = children;
	} else {
		isDisabled = $[3];
		isPending = $[4];
		otherProps = $[5];
		children = $[6];
	}
	const [isProgressVisible, setIsProgressVisible] = (0, import_react.useState)(false);
	const stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages$1);
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3(props, domRef);
	let t1;
	if ($[7] !== isDisabled) {
		t1 = { isDisabled };
		$[7] = isDisabled;
		$[8] = t1;
	} else t1 = $[8];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t1);
	let t2;
	if ($[9] !== isHovered || $[10] !== isProgressVisible || $[11] !== isPressed) {
		t2 = {
			isHovered,
			isPending: isProgressVisible,
			isPressed
		};
		$[9] = isHovered;
		$[10] = isProgressVisible;
		$[11] = isPressed;
		$[12] = t2;
	} else t2 = $[12];
	const styleProps = useButtonStyles(props, t2);
	let t3;
	let t4;
	if ($[13] !== isPending) {
		t3 = () => {
			let timeout;
			if (isPending) timeout = setTimeout(() => {
				setIsProgressVisible(true);
			}, 1e3);
			else setIsProgressVisible(false);
			return () => {
				clearTimeout(timeout);
			};
		};
		t4 = [isPending];
		$[13] = isPending;
		$[14] = t3;
		$[15] = t4;
	} else {
		t3 = $[14];
		t4 = $[15];
	}
	(0, import_react.useEffect)(t3, t4);
	let t5;
	let t6;
	let t7;
	let t8;
	if ($[16] !== isPending || $[17] !== domRef || $[18] !== styleProps || $[19] !== otherProps || $[20] !== buttonProps || $[21] !== hoverProps) {
		const pendingProps = isPending ? { onClick: (e) => e.preventDefault() } : { onClick: () => {} };
		t5 = domRef;
		t6 = styleProps;
		if ($[26] !== otherProps) {
			t7 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, { propNames: /* @__PURE__ */ new Set(["form"]) });
			$[26] = otherProps;
			$[27] = t7;
		} else t7 = $[27];
		t8 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, hoverProps, pendingProps);
		$[16] = isPending;
		$[17] = domRef;
		$[18] = styleProps;
		$[19] = otherProps;
		$[20] = buttonProps;
		$[21] = hoverProps;
		$[22] = t5;
		$[23] = t6;
		$[24] = t7;
		$[25] = t8;
	} else {
		t5 = $[22];
		t6 = $[23];
		t7 = $[24];
		t8 = $[25];
	}
	const t9 = isPending ? "true" : void 0;
	let t10;
	if ($[28] !== isProgressVisible || $[29] !== stringFormatter) {
		t10 = isProgressVisible && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ProgressCircle, {
			"aria-atomic": "false",
			"aria-live": "assertive",
			"aria-label": stringFormatter.format("pending"),
			isIndeterminate: true,
			size: "small",
			UNSAFE_style: { position: "absolute" }
		});
		$[28] = isProgressVisible;
		$[29] = stringFormatter;
		$[30] = t10;
	} else t10 = $[30];
	let t11;
	if ($[31] !== t5 || $[32] !== t6 || $[33] !== t7 || $[34] !== t8 || $[35] !== t9 || $[36] !== children || $[37] !== t10) {
		t11 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("button", {
			ref: t5,
			...t6,
			...t7,
			...t8,
			"aria-disabled": t9,
			children: [children, t10]
		});
		$[31] = t5;
		$[32] = t6;
		$[33] = t7;
		$[34] = t8;
		$[35] = t9;
		$[36] = children;
		$[37] = t10;
		$[38] = t11;
	} else t11 = $[38];
	return t11;
});
function disablePendingProps(props) {
	if (props.isPending) {
		props = { ...props };
		props.onKeyDown = void 0;
		props.onKeyUp = void 0;
		props.onPress = void 0;
		props.onPressChange = void 0;
		props.onPressEnd = void 0;
		props.onPressStart = void 0;
		props.onPressUp = void 0;
	}
	return props;
}
var useButtonChildren = (props) => {
	const $ = c(4);
	const { children } = props;
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = { UNSAFE_className: buttonClassList.element("icon") };
		$[0] = t1;
	} else t1 = $[0];
	let t2;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = {
			icon: t1,
			text: {
				color: "inherit",
				overflow: "unset",
				trim: false,
				UNSAFE_className: buttonClassList.element("text")
			}
		};
		$[1] = t2;
	} else t2 = $[1];
	t0 = t2;
	const slots = t0;
	let t3;
	if ($[2] !== children) {
		t3 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SlotProvider, {
			slots,
			children: isReactText(children) ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, { children }) : children
		});
		$[2] = children;
		$[3] = t3;
	} else t3 = $[3];
	return t3;
};
var actionButtonClassList = new ClassList("ActionButton", ["icon", "text"]);
function useActionButtonStyles(props, state) {
	const { prominence = "default" } = props;
	const { isHovered, isPressed } = state;
	const isSelected = "isSelected" in props && props.isSelected || state.isSelected;
	const styleProps = useStyleProps(props);
	return {
		...toDataAttributes({
			interaction: isPressed ? "press" : isHovered ? "hover" : void 0,
			prominence: prominence === "default" ? void 0 : prominence,
			selected: isSelected || void 0,
			static: props.static
		}),
		style: styleProps.style,
		className: classNames(actionButtonClassList.element("root"), css({
			alignItems: "center",
			borderColor: "transparent",
			borderRadius: tokenSchema.size.radius.regular,
			borderStyle: "solid",
			borderWidth: tokenSchema.size.border.regular,
			cursor: "default",
			display: "inline-flex",
			flexShrink: 0,
			fontWeight: tokenSchema.typography.fontWeight.regular,
			height: tokenSchema.size.element.regular,
			justifyContent: "center",
			minWidth: tokenSchema.size.element.regular,
			outline: 0,
			paddingInline: tokenSchema.size.space.regular,
			position: "relative",
			transitionDuration: "130ms",
			transitionProperty: "background, border-color, box-shadow, color",
			transitionTimingFunction: "ease-out",
			userSelect: "none",
			"a&": { cursor: "pointer" },
			[actionButtonClassList.selector("text", "descendant")]: {
				fontWeight: "inherit",
				marginInline: tokenSchema.size.space.small,
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap"
			},
			"--focus-ring-color": tokenSchema.color.alias.focusRing,
			"&[data-static]": { "--focus-ring-color": "currentColor" },
			"&::after": {
				borderRadius: `inherit`,
				content: "\"\"",
				inset: 0,
				margin: 0,
				pointerEvents: "none",
				position: "absolute",
				transition: transition(["box-shadow", "margin"], { easing: "easeOut" })
			},
			"&[data-focus=visible]::after": { boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} var(--focus-ring-color)` },
			"&:not([data-prominence])": {
				backgroundColor: tokenSchema.color.alias.backgroundIdle,
				borderColor: tokenSchema.color.alias.borderIdle,
				color: tokenSchema.color.alias.foregroundIdle,
				"&[data-interaction=hover]": {
					backgroundColor: tokenSchema.color.alias.backgroundHovered,
					borderColor: tokenSchema.color.alias.borderHovered,
					color: tokenSchema.color.alias.foregroundHovered
				},
				"&[data-interaction=press]": {
					backgroundColor: tokenSchema.color.alias.backgroundPressed,
					borderColor: tokenSchema.color.alias.borderPressed,
					color: tokenSchema.color.alias.foregroundPressed
				},
				"&[data-selected]": {
					backgroundColor: tokenSchema.color.foreground.neutralSecondary,
					borderColor: tokenSchema.color.foreground.neutralSecondary,
					color: tokenSchema.color.foreground.inverse,
					"&[data-interaction=hover]": {
						backgroundColor: tokenSchema.color.foreground.neutral,
						borderColor: tokenSchema.color.foreground.neutral
					},
					"&[data-interaction=press]": {
						backgroundColor: tokenSchema.color.foreground.neutralEmphasis,
						borderColor: tokenSchema.color.foreground.neutralEmphasis
					}
				},
				"&:disabled, &[aria-disabled=true], &[data-disabled=true]": {
					backgroundColor: tokenSchema.color.alias.backgroundDisabled,
					borderColor: "transparent",
					color: tokenSchema.color.alias.foregroundDisabled
				},
				"&[data-static]": { backgroundColor: "transparent" },
				"&[data-static=light]": {
					borderColor: "#fff6",
					color: "#fff",
					"&[data-interaction=hover], &[data-focus=\"visible\"]": {
						backgroundColor: "#ffffff1a",
						borderColor: "#ffffff8c"
					},
					"&[data-interaction=press]": {
						backgroundColor: "#ffffff26",
						borderColor: "#ffffffb3"
					},
					"&:disabled, &[aria-disabled]": {
						borderColor: "#ffffff40",
						color: "#ffffff8c"
					}
				},
				"&[data-static=dark]": {
					borderColor: "#0006",
					color: "#000",
					"&[data-interaction=hover], &[data-focus=\"visible\"]": {
						backgroundColor: "#0000001a",
						borderColor: "#0000008c"
					},
					"&[data-interaction=press]": {
						backgroundColor: "#00000026",
						borderColor: "#000000b3"
					},
					"&:disabled, &[aria-disabled]": {
						borderColor: "#00000040",
						color: "#0000008c"
					}
				}
			},
			"&[data-prominence=low]": {
				color: tokenSchema.color.foreground.neutral,
				"&[data-interaction=hover]": {
					backgroundColor: tokenSchema.color.alias.backgroundHovered,
					color: tokenSchema.color.alias.foregroundHovered
				},
				"&[data-interaction=press]": {
					backgroundColor: tokenSchema.color.alias.backgroundPressed,
					color: tokenSchema.color.alias.foregroundPressed
				},
				"&[data-selected]": {
					backgroundColor: tokenSchema.color.foreground.neutralSecondary,
					borderColor: tokenSchema.color.foreground.neutralSecondary,
					color: tokenSchema.color.foreground.inverse,
					"&[data-interaction=hover]": {
						backgroundColor: tokenSchema.color.foreground.neutral,
						borderColor: tokenSchema.color.foreground.neutral
					},
					"&[data-interaction=press]": {
						backgroundColor: tokenSchema.color.foreground.neutralEmphasis,
						borderColor: tokenSchema.color.foreground.neutralEmphasis
					}
				},
				"&:disabled, &[aria-disabled=true], &[data-disabled=true]": {
					borderColor: "transparent",
					color: tokenSchema.color.alias.foregroundDisabled
				},
				"&[data-static=light]": {
					color: "#fff",
					"&[data-interaction=hover], &[data-focus=\"visible\"]": { backgroundColor: "#ffffff1a" },
					"&[data-interaction=press]": { backgroundColor: "#ffffff26" },
					"&:disabled, &[aria-disabled]": { color: "#ffffff8c" }
				},
				"&[data-static=dark]": {
					color: "#000",
					"&[data-interaction=hover], &[data-focus=\"visible\"]": { backgroundColor: "#0000001a" },
					"&[data-interaction=press]": { backgroundColor: "#00000026" },
					"&:disabled, &[aria-disabled]": { color: "#0000008c" }
				}
			}
		}), styleProps.className)
	};
}
/**
* Action buttons allow users to perform an action. They’re used for similar,
* task-based options within a workflow, and are ideal for interfaces where
* buttons aren’t meant to draw a lot of attention.
*/
var ActionButton = /*#__PURE__*/ (0, import_react.forwardRef)(function ActionButton(props, forwardedRef) {
	const $ = c(14);
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const children = useActionButtonChildren(props);
	if ("href" in props && props.href) {
		const t0 = domRef;
		let t1;
		if ($[0] !== t0 || $[1] !== props || $[2] !== children) {
			t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(LinkButton, {
				ref: t0,
				...props,
				children
			});
			$[0] = t0;
			$[1] = props;
			$[2] = children;
			$[3] = t1;
		} else t1 = $[3];
		let t2;
		if ($[4] !== props.autoFocus || $[5] !== t1) {
			t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
				autoFocus: props.autoFocus,
				children: t1
			});
			$[4] = props.autoFocus;
			$[5] = t1;
			$[6] = t2;
		} else t2 = $[6];
		return t2;
	}
	const t0 = domRef;
	let t1;
	if ($[7] !== t0 || $[8] !== props || $[9] !== children) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(BaseButton, {
			ref: t0,
			...props,
			children
		});
		$[7] = t0;
		$[8] = props;
		$[9] = children;
		$[10] = t1;
	} else t1 = $[10];
	let t2;
	if ($[11] !== props.autoFocus || $[12] !== t1) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
			autoFocus: props.autoFocus,
			children: t1
		});
		$[11] = props.autoFocus;
		$[12] = t1;
		$[13] = t2;
	} else t2 = $[13];
	return t2;
});
/** @private Forked variant where an "href" is provided. */
var LinkButton = /*#__PURE__*/ (0, import_react.forwardRef)(function LinkActionButton(props, forwardedRef) {
	const $ = c(23);
	let isDisabled;
	let otherProps;
	let children;
	if ($[0] !== props) {
		({children, isDisabled, ...otherProps} = props);
		$[0] = props;
		$[1] = isDisabled;
		$[2] = otherProps;
		$[3] = children;
	} else {
		isDisabled = $[1];
		otherProps = $[2];
		children = $[3];
	}
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let t0;
	if ($[4] !== props) {
		t0 = {
			elementType: "a",
			...props
		};
		$[4] = props;
		$[5] = t0;
	} else t0 = $[5];
	const { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3(t0, domRef);
	const { linkProps } = $40d752843fab8930$export$dcf14c9974fe2767(props, domRef);
	let t1;
	if ($[6] !== isDisabled) {
		t1 = { isDisabled };
		$[6] = isDisabled;
		$[7] = t1;
	} else t1 = $[7];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t1);
	let t2;
	if ($[8] !== isHovered || $[9] !== isPressed) {
		t2 = {
			isHovered,
			isPressed
		};
		$[8] = isHovered;
		$[9] = isPressed;
		$[10] = t2;
	} else t2 = $[10];
	const styleProps = useActionButtonStyles(props, t2);
	let t3;
	if ($[11] !== otherProps) {
		t3 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
		$[11] = otherProps;
		$[12] = t3;
	} else t3 = $[12];
	let t4;
	if ($[13] !== buttonProps || $[14] !== linkProps || $[15] !== hoverProps || $[16] !== styleProps) {
		t4 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, linkProps, hoverProps, styleProps);
		$[13] = buttonProps;
		$[14] = linkProps;
		$[15] = hoverProps;
		$[16] = styleProps;
		$[17] = t4;
	} else t4 = $[17];
	let t5;
	if ($[18] !== t3 || $[19] !== t4 || $[20] !== domRef || $[21] !== children) {
		t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("a", {
			...t3,
			...t4,
			ref: domRef,
			children
		});
		$[18] = t3;
		$[19] = t4;
		$[20] = domRef;
		$[21] = children;
		$[22] = t5;
	} else t5 = $[22];
	return t5;
});
/** @private Forked variant where an "href" is NOT provided. */
var BaseButton = /*#__PURE__*/ (0, import_react.forwardRef)(function BaseActionButton(props, forwardedRef) {
	const $ = c(20);
	props = useProviderProps(props);
	props = useSlotProps(props, "button");
	let isDisabled;
	let otherProps;
	let children;
	if ($[0] !== props) {
		({children, isDisabled, ...otherProps} = props);
		$[0] = props;
		$[1] = isDisabled;
		$[2] = otherProps;
		$[3] = children;
	} else {
		isDisabled = $[1];
		otherProps = $[2];
		children = $[3];
	}
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3(props, domRef);
	let t0;
	if ($[4] !== isDisabled) {
		t0 = { isDisabled };
		$[4] = isDisabled;
		$[5] = t0;
	} else t0 = $[5];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t0);
	let t1;
	if ($[6] !== isHovered || $[7] !== isPressed) {
		t1 = {
			isHovered,
			isPressed
		};
		$[6] = isHovered;
		$[7] = isPressed;
		$[8] = t1;
	} else t1 = $[8];
	const styleProps = useActionButtonStyles(props, t1);
	let t2;
	if ($[9] !== otherProps) {
		t2 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, { propNames: /* @__PURE__ */ new Set(["form"]) });
		$[9] = otherProps;
		$[10] = t2;
	} else t2 = $[10];
	let t3;
	if ($[11] !== buttonProps || $[12] !== hoverProps) {
		t3 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, hoverProps);
		$[11] = buttonProps;
		$[12] = hoverProps;
		$[13] = t3;
	} else t3 = $[13];
	let t4;
	if ($[14] !== domRef || $[15] !== styleProps || $[16] !== t2 || $[17] !== t3 || $[18] !== children) {
		t4 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
			ref: domRef,
			...styleProps,
			...t2,
			...t3,
			children
		});
		$[14] = domRef;
		$[15] = styleProps;
		$[16] = t2;
		$[17] = t3;
		$[18] = children;
		$[19] = t4;
	} else t4 = $[19];
	return t4;
});
var iconClassName = actionButtonClassList.element("icon");
var textClassName = actionButtonClassList.element("text");
var useActionButtonChildren = (props, alternateSlots) => {
	const $ = c(13);
	const { children } = props;
	let t0;
	const t1 = alternateSlots === null || alternateSlots === void 0 ? void 0 : alternateSlots.icon;
	let t2;
	if ($[0] !== t1) {
		t2 = {
			UNSAFE_className: iconClassName,
			...t1
		};
		$[0] = t1;
		$[1] = t2;
	} else t2 = $[1];
	const t3 = alternateSlots === null || alternateSlots === void 0 ? void 0 : alternateSlots.text;
	let t4;
	if ($[2] !== t3) {
		t4 = {
			color: "inherit",
			overflow: "unset",
			trim: false,
			UNSAFE_className: textClassName,
			...t3
		};
		$[2] = t3;
		$[3] = t4;
	} else t4 = $[3];
	let t5;
	if ($[4] !== alternateSlots || $[5] !== t2 || $[6] !== t4) {
		t5 = {
			...alternateSlots,
			icon: t2,
			text: t4
		};
		$[4] = alternateSlots;
		$[5] = t2;
		$[6] = t4;
		$[7] = t5;
	} else t5 = $[7];
	t0 = t5;
	const slots = t0;
	let t6;
	if ($[8] !== children) {
		t6 = isReactText(children) ? /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, { children }) : children;
		$[8] = children;
		$[9] = t6;
	} else t6 = $[9];
	let t7;
	if ($[10] !== slots || $[11] !== t6) {
		t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SlotProvider, {
			slots,
			children: t6
		});
		$[10] = slots;
		$[11] = t6;
		$[12] = t7;
	} else t7 = $[12];
	return t7;
};
/**
* A clear button is a button that is typically found on search fields and is
* used to clear the current search query. This can be useful if the user has
* entered a search query by mistake, or if they want to start over with a new
* search.
*/
var ClearButton = /*#__PURE__*/ (0, import_react.forwardRef)(function ClearButton(props, forwardedRef) {
	const $ = c(28);
	let t0;
	let preventFocus;
	let isDisabled;
	let otherProps;
	let autoFocus;
	if ($[0] !== props) {
		({autoFocus, isDisabled, preventFocus, elementType: t0, ...otherProps} = props);
		$[0] = props;
		$[1] = t0;
		$[2] = preventFocus;
		$[3] = isDisabled;
		$[4] = otherProps;
		$[5] = autoFocus;
	} else {
		t0 = $[1];
		preventFocus = $[2];
		isDisabled = $[3];
		otherProps = $[4];
		autoFocus = $[5];
	}
	const elementType = t0 === void 0 ? preventFocus ? "div" : "button" : t0;
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let t1;
	if ($[6] !== props || $[7] !== elementType) {
		t1 = {
			...props,
			elementType
		};
		$[6] = props;
		$[7] = elementType;
		$[8] = t1;
	} else t1 = $[8];
	let { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3(t1, domRef);
	let t2;
	if ($[9] !== isDisabled) {
		t2 = { isDisabled };
		$[9] = isDisabled;
		$[10] = t2;
	} else t2 = $[10];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t2);
	let t3;
	if ($[11] !== isHovered || $[12] !== isPressed) {
		t3 = {
			isHovered,
			isPressed
		};
		$[11] = isHovered;
		$[12] = isPressed;
		$[13] = t3;
	} else t3 = $[13];
	const styleProps = useClearButtonStyles(otherProps, t3);
	if (preventFocus) {
		let _buttonProps;
		if ($[14] !== buttonProps) {
			const { tabIndex, ...t4 } = buttonProps;
			_buttonProps = t4;
			$[14] = buttonProps;
			$[15] = _buttonProps;
		} else _buttonProps = $[15];
		buttonProps = _buttonProps;
	}
	const ElementType = elementType;
	let t4;
	if ($[16] !== buttonProps || $[17] !== hoverProps) {
		t4 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, hoverProps);
		$[16] = buttonProps;
		$[17] = hoverProps;
		$[18] = t4;
	} else t4 = $[18];
	let t5;
	if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, { src: xIcon });
		$[19] = t5;
	} else t5 = $[19];
	let t6;
	if ($[20] !== ElementType || $[21] !== styleProps || $[22] !== t4 || $[23] !== domRef) {
		t6 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
			...styleProps,
			...t4,
			ref: domRef,
			children: t5
		});
		$[20] = ElementType;
		$[21] = styleProps;
		$[22] = t4;
		$[23] = domRef;
		$[24] = t6;
	} else t6 = $[24];
	let t7;
	if ($[25] !== autoFocus || $[26] !== t6) {
		t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
			autoFocus,
			children: t6
		});
		$[25] = autoFocus;
		$[26] = t6;
		$[27] = t7;
	} else t7 = $[27];
	return t7;
});
function useClearButtonStyles(props, state) {
	const $ = c(14);
	const { isPressed, isHovered } = state;
	const styleProps = useStyleProps(props);
	let t0;
	let t1;
	let t2;
	if ($[0] !== styleProps || $[1] !== isPressed || $[2] !== isHovered || $[3] !== props.static) {
		const clearButtonStyles = css({
			alignItems: "center",
			borderRadius: "100%",
			color: tokenSchema.color.foreground.neutralSecondary,
			display: "flex",
			height: tokenSchema.size.element.regular,
			justifyContent: "center",
			outline: 0,
			position: "relative",
			transition: transition(["box-shadow", "margin"], { easing: "easeOut" }),
			width: tokenSchema.size.element.regular,
			"--focus-ring-color": tokenSchema.color.alias.focusRing,
			"&[data-static]": { "--focus-ring-color": "currentColor" },
			"&::after": {
				borderRadius: `inherit`,
				content: "\"\"",
				inset: 0,
				pointerEvents: "none",
				position: "absolute",
				transition: transition(["box-shadow", "margin"], { easing: "easeOut" })
			},
			"&[data-focus=visible]::after": {
				boxShadow: `0 0 0 ${tokenSchema.size.alias.focusRing} var(--focus-ring-color)`,
				margin: `calc(-1 * ${tokenSchema.size.alias.focusRingGap})`
			},
			"&[data-interaction=hover]": { color: tokenSchema.color.foreground.neutral },
			"&[data-interaction=press]": { color: tokenSchema.color.foreground.neutralEmphasis },
			"&:disabled, &[aria-disabled]": { color: tokenSchema.color.alias.foregroundDisabled },
			"&[data-static=light]": {
				color: "#fff",
				"&[data-interaction=hover], &[data-focus=\"visible\"]": { backgroundColor: "#ffffff1a" },
				"&[data-interaction=press]": { backgroundColor: "#ffffff26" },
				"&:disabled, &[aria-disabled]": {
					backgroundColor: "#ffffff1a",
					color: "#ffffff8c"
				}
			},
			"&[data-static=dark]": {
				color: "#000",
				"&[data-interaction=hover], &[data-focus=\"visible\"]": { backgroundColor: "#0000001a" },
				"&[data-interaction=press]": { backgroundColor: "#00000026" },
				"&:disabled, &[aria-disabled]": {
					backgroundColor: "#0000001a",
					color: "#0000008c"
				}
			}
		});
		t0 = styleProps;
		const t3 = isPressed ? "press" : isHovered ? "hover" : void 0;
		if ($[7] !== props.static || $[8] !== t3) {
			t1 = toDataAttributes({
				static: props.static,
				interaction: t3
			});
			$[7] = props.static;
			$[8] = t3;
			$[9] = t1;
		} else t1 = $[9];
		t2 = classNames(clearButtonStyles, styleProps.className);
		$[0] = styleProps;
		$[1] = isPressed;
		$[2] = isHovered;
		$[3] = props.static;
		$[4] = t0;
		$[5] = t1;
		$[6] = t2;
	} else {
		t0 = $[4];
		t1 = $[5];
		t2 = $[6];
	}
	let t3;
	if ($[10] !== t0 || $[11] !== t1 || $[12] !== t2) {
		t3 = {
			...t0,
			...t1,
			className: t2
		};
		$[10] = t0;
		$[11] = t1;
		$[12] = t2;
		$[13] = t3;
	} else t3 = $[13];
	return t3;
}
var FieldButton = /*#__PURE__*/ (0, import_react.forwardRef)(function FieldButton(props, forwardedRef) {
	const $ = c(23);
	props = useSlotProps(props, "button");
	const { elementType: t0, isDisabled, autoFocus, isActive } = props;
	const ElementType = t0 === void 0 ? "button" : t0;
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const { buttonProps, isPressed } = $ac4318a9c075bb9f$export$ea18c227d4417cc3(props, domRef);
	let t1;
	if ($[0] !== isDisabled) {
		t1 = { isDisabled };
		$[0] = isDisabled;
		$[1] = t1;
	} else t1 = $[1];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t1);
	const t2 = isActive !== null && isActive !== void 0 ? isActive : isPressed;
	let t3;
	if ($[2] !== isHovered || $[3] !== t2) {
		t3 = {
			isHovered,
			isPressed: t2
		};
		$[2] = isHovered;
		$[3] = t2;
		$[4] = t3;
	} else t3 = $[4];
	const { children, styleProps } = useFieldButton(props, t3);
	let t4;
	if ($[5] !== buttonProps || $[6] !== hoverProps) {
		t4 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, hoverProps);
		$[5] = buttonProps;
		$[6] = hoverProps;
		$[7] = t4;
	} else t4 = $[7];
	let t5;
	if ($[8] !== styleProps.className) {
		t5 = classNames(css({
			justifyContent: "space-between",
			textAlign: "start"
		}), styleProps.className);
		$[8] = styleProps.className;
		$[9] = t5;
	} else t5 = $[9];
	let t6;
	if ($[10] !== styleProps.style) {
		t6 = {
			...styleProps.style,
			boxShadow: "none"
		};
		$[10] = styleProps.style;
		$[11] = t6;
	} else t6 = $[11];
	let t7;
	if ($[12] !== ElementType || $[13] !== styleProps || $[14] !== t4 || $[15] !== domRef || $[16] !== t5 || $[17] !== t6 || $[18] !== children) {
		t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
			...styleProps,
			...t4,
			ref: domRef,
			className: t5,
			style: t6,
			children
		});
		$[12] = ElementType;
		$[13] = styleProps;
		$[14] = t4;
		$[15] = domRef;
		$[16] = t5;
		$[17] = t6;
		$[18] = children;
		$[19] = t7;
	} else t7 = $[19];
	let t8;
	if ($[20] !== autoFocus || $[21] !== t7) {
		t8 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
			autoFocus,
			children: t7
		});
		$[20] = autoFocus;
		$[21] = t7;
		$[22] = t8;
	} else t8 = $[22];
	return t8;
});
function useFieldButton(props, state) {
	const $ = c(7);
	const { isHovered, isPressed } = state;
	let t0;
	if ($[0] !== isHovered || $[1] !== isPressed) {
		t0 = {
			isHovered,
			isPressed
		};
		$[0] = isHovered;
		$[1] = isPressed;
		$[2] = t0;
	} else t0 = $[2];
	const styleProps = useActionButtonStyles(props, t0);
	let t1;
	let t2;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = { text: { flex: true } };
		$[3] = t2;
	} else t2 = $[3];
	t1 = t2;
	const children = useActionButtonChildren(props, t1);
	let t3;
	if ($[4] !== children || $[5] !== styleProps) {
		t3 = {
			children,
			styleProps
		};
		$[4] = children;
		$[5] = styleProps;
		$[6] = t3;
	} else t3 = $[6];
	return t3;
}
var ToggleButton = /*#__PURE__*/ (0, import_react.forwardRef)(function ToggleButton(props, forwardedRef) {
	const $ = c(23);
	let isDisabled;
	let otherProps;
	if ($[0] !== props) {
		({isDisabled, ...otherProps} = props);
		$[0] = props;
		$[1] = isDisabled;
		$[2] = otherProps;
	} else {
		isDisabled = $[1];
		otherProps = $[2];
	}
	props = useProviderProps(props);
	props = useSlotProps(props, "button");
	const children = useActionButtonChildren(props);
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const state = $fd3c5e01e837dc20$export$8042c6c013fd5226(props);
	const { buttonProps, isPressed } = $b54a524c670b905d$export$51e84d46ca0bc451(props, state, domRef);
	let t0;
	if ($[3] !== isDisabled) {
		t0 = { isDisabled };
		$[3] = isDisabled;
		$[4] = t0;
	} else t0 = $[4];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t0);
	let t1;
	if ($[5] !== isHovered || $[6] !== isPressed || $[7] !== state.isSelected) {
		t1 = {
			isHovered,
			isPressed,
			isSelected: state.isSelected
		};
		$[5] = isHovered;
		$[6] = isPressed;
		$[7] = state.isSelected;
		$[8] = t1;
	} else t1 = $[8];
	const styleProps = useActionButtonStyles(props, t1);
	let t2;
	if ($[9] !== buttonProps || $[10] !== hoverProps) {
		t2 = $bbaa08b3cd72f041$export$9d1611c77c2fe928(buttonProps, hoverProps);
		$[9] = buttonProps;
		$[10] = hoverProps;
		$[11] = t2;
	} else t2 = $[11];
	let t3;
	if ($[12] !== otherProps) {
		t3 = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps);
		$[12] = otherProps;
		$[13] = t3;
	} else t3 = $[13];
	let t4;
	if ($[14] !== domRef || $[15] !== styleProps || $[16] !== t2 || $[17] !== t3 || $[18] !== children) {
		t4 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("button", {
			ref: domRef,
			...styleProps,
			...t2,
			...t3,
			children
		});
		$[14] = domRef;
		$[15] = styleProps;
		$[16] = t2;
		$[17] = t3;
		$[18] = children;
		$[19] = t4;
	} else t4 = $[19];
	let t5;
	if ($[20] !== props.autoFocus || $[21] !== t4) {
		t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
			autoFocus: props.autoFocus,
			children: t4
		});
		$[20] = props.autoFocus;
		$[21] = t4;
		$[22] = t5;
	} else t5 = $[22];
	return t5;
});
//#endregion
//#region node_modules/react-aria/dist/private/separator/useSeparator.mjs
function $dc321dbb6473ef33$export$52210f68a14655d0(props) {
	let domProps = $8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, { labelable: true });
	let ariaOrientation;
	if (props.orientation === "vertical") ariaOrientation = "vertical";
	if (props.elementType !== "hr") return { separatorProps: {
		...domProps,
		role: "separator",
		"aria-orientation": ariaOrientation
	} };
	return { separatorProps: domProps };
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-layout.js
/** Exposes a prop-based API for adding styles to a view, within the constraints of the theme. */
var Box = forwardRefWithAs((props, forwardedRef) => {
	const { elementType: ElementType = "div", children, ...otherProps } = props;
	const styleProps = useStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref: forwardedRef,
		...filterStyleProps(otherProps),
		...styleProps,
		children
	});
});
var dividerClassList = new ClassList("Divider");
var filterOptions = { propNames: /* @__PURE__ */ new Set(["role"]) };
/**
* Dividers bring clarity to a layout by grouping and dividing content in close proximity.
* They can also be used to establish rhythm and hierarchy.
*/
var Divider = forwardRefWithAs((props, forwardedRef) => {
	props = useSlotProps(props, "divider");
	const { orientation = "horizontal", elementType: Element = orientation === "vertical" ? "div" : "hr", size = "regular", ...otherProps } = props;
	const styleProps = useStyleProps(otherProps);
	let { separatorProps } = $dc321dbb6473ef33$export$52210f68a14655d0({
		...props,
		elementType: Element
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Element, {
		...styleProps,
		...separatorProps,
		...toDataAttributes({
			orientation,
			size
		}),
		...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(otherProps, filterOptions),
		ref: forwardedRef,
		className: classNames(dividerClassList.element("root"), css({
			alignSelf: "stretch",
			backgroundColor: tokenSchema.color.border.neutral,
			borderRadius: "var(--size)",
			"&[data-size=regular]": { "--size": tokenSchema.size.border.regular },
			"&[data-size=medium]": { "--size": tokenSchema.size.border.medium },
			"&[data-size=large]": { "--size": tokenSchema.size.border.large },
			"&[data-orientation=horizontal]": { height: "var(--size)" },
			"&[data-orientation=vertical]": { width: "var(--size)" }
		}), styleProps.className)
	});
});
var sharedStyleProps = {
	gap: resolvePropWithPath("gap", "size.space"),
	columnGap: resolvePropWithPath("columnGap", "size.space"),
	rowGap: resolvePropWithPath("rowGap", "size.space"),
	alignContent: resolveProp("alignContent", flexAlignValue),
	alignItems: resolveProp("alignItems", flexAlignValue),
	direction: resolveProp("flexDirection"),
	justifyContent: resolveProp("justifyContent", flexAlignValue)
};
function displayInline(block) {
	const resolver = (inline) => inline ? `inline-${block}` : block;
	return resolver;
}
function useFlexStyleProps(props) {
	const $ = c(2);
	let t0;
	if ($[0] !== props) {
		t0 = {
			inline: false,
			...props
		};
		$[0] = props;
		$[1] = t0;
	} else t0 = $[1];
	return useStyleProps(t0, flexStyleProps);
}
var flexStyleProps = {
	...sharedStyleProps,
	direction: resolveProp("flexDirection"),
	inline: resolveProp("display", displayInline("flex")),
	wrap: resolveProp("flexWrap", flexWrapValue)
};
/**
* Normalize 'start' and 'end' alignment values to 'flex-start' and 'flex-end'
* in flex containers for browser compatibility.
*/
function flexAlignValue(value) {
	if (value === "start") return "flex-start";
	if (value === "end") return "flex-end";
	return value;
}
function flexWrapValue(value) {
	if (typeof value === "boolean") return value ? "wrap" : "nowrap";
	return value;
}
function isFractionUnit(value) {
	return value.endsWith("fr");
}
function gridSizeResolver(value) {
	if (typeof value === "number") return value;
	if (isFractionUnit(value)) return value;
	return sizeResolver(value);
}
function useGridStyleProps(props) {
	const $ = c(2);
	let t0;
	if ($[0] !== props) {
		t0 = {
			inline: false,
			...props
		};
		$[0] = props;
		$[1] = t0;
	} else t0 = $[1];
	return useStyleProps(t0, gridStyleProps);
}
var gridStyleProps = {
	...sharedStyleProps,
	inline: resolveProp("display", displayInline("grid")),
	autoFlow: resolveProp("gridAutoFlow"),
	autoColumns: resolveProp("gridAutoColumns", sizeResolver),
	autoRows: resolveProp("gridAutoRows", sizeResolver),
	areas: resolveProp("gridTemplateAreas", gridTemplateAreasValue),
	columns: resolveProp("gridTemplateColumns", gridTemplateValue),
	rows: resolveProp("gridTemplateRows", gridTemplateValue),
	justifyItems: resolveProp("justifyItems"),
	justifyContent: resolveProp("justifyContent"),
	alignItems: resolveProp("alignItems"),
	alignContent: resolveProp("alignContent")
};
function gridTemplateAreasValue(values) {
	return values.map((value) => `"${value}"`).join("\n");
}
function gridTemplateValue(value) {
	if (Array.isArray(value)) return value.map(gridSizeResolver).join(" ");
	return value;
}
/**
* Defines a size range greater than or equal to min and less than or equal to max.
* See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax).
* @param min - The minimum size.
* @param max - The maximum size.
*/
function minmax(min, max) {
	return `minmax(${gridSizeResolver(min)}, ${gridSizeResolver(max)})`;
}
/**
* A layout container CSS flex. Keystar UI dimension values provide
* consistent spacing between items.
*/
var Flex = forwardRefWithAs((props, forwardedRef) => {
	const { elementType: ElementType = "div", children, ...otherProps } = props;
	const styleProps = useFlexStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref: forwardedRef,
		...filterStyleProps(otherProps, Object.keys(flexStyleProps)),
		...styleProps,
		children
	});
});
/**
* A layout container using CSS grid. Keystar UI dimension values provide
* consistent sizing and spacing.
*/
var Grid = forwardRefWithAs((props, forwardedRef) => {
	const { elementType: ElementType = "div", children, ...otherProps } = props;
	const styleProps = useGridStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref: forwardedRef,
		...filterStyleProps(otherProps, Object.keys(gridStyleProps)),
		...styleProps,
		children
	});
});
var ScrollView = /*#__PURE__*/ (0, import_react.forwardRef)(function ScrollView(props, forwardedRef) {
	let { children, direction = "vertical", ...otherProps } = props;
	let ref = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let [scrollIndicator, setScrollIndicator] = (0, import_react.useState)("none");
	let styleProps = useGridStyleProps(otherProps);
	let updateScrollPosition = (0, import_react.useCallback)(() => {
		let node = ref.current;
		if (!node) return;
		let { clientDimension, scrollDimension, scrollStart } = getScrollProps(direction, node);
		let indicator = "none";
		if (scrollDimension > clientDimension) {
			if (scrollStart === 0) indicator = "end";
			else if (Math.ceil(scrollStart + clientDimension) >= scrollDimension) indicator = "start";
			else if (scrollStart > 0) indicator = "both";
		}
		setScrollIndicator(indicator);
	}, [direction, ref]);
	(0, import_react.useLayoutEffect)(() => {
		updateScrollPosition();
	}, [updateScrollPosition]);
	$970072cf4b13fde3$export$683480f191c0e3ea({
		ref,
		onResize: updateScrollPosition
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		...styleProps,
		...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props),
		onScroll: updateScrollPosition,
		ref,
		"data-scroll-indicator": scrollIndicator,
		"data-scroll-direction": direction,
		className: classNames(css({
			height: "100%",
			width: "100%",
			minHeight: 0,
			minWidth: 0,
			transition: transition("border-color", { duration: "regular" }),
			WebkitOverflowScrolling: "touch",
			"&[data-scroll-direction=vertical]": {
				borderBlock: `${tokenSchema.size.border.regular} solid transparent`,
				overflowX: "hidden",
				overflowY: "auto",
				"&[data-scroll-indicator=both]": { borderBlockColor: tokenSchema.color.border.neutral },
				"&[data-scroll-indicator=start]": { borderBlockStartColor: tokenSchema.color.border.neutral },
				"&[data-scroll-indicator=end]": { borderBlockEndColor: tokenSchema.color.border.neutral }
			},
			"&[data-scroll-direction=horizontal]": {
				borderInline: `${tokenSchema.size.border.regular} solid transparent`,
				gridAutoFlow: "column",
				overflowX: "auto",
				overflowY: "hidden",
				"&[data-scroll-indicator=both]": { borderInlineColor: tokenSchema.color.border.neutral },
				"&[data-scroll-indicator=start]": { borderInlineStartColor: tokenSchema.color.border.neutral },
				"&[data-scroll-indicator=end]": { borderInlineEndColor: tokenSchema.color.border.neutral }
			}
		}), styleProps.className),
		children
	});
});
function getScrollProps(direction, node) {
	let scrollStart = direction === "horizontal" ? node.scrollLeft : node.scrollTop;
	let scrollDimension = direction === "horizontal" ? node.scrollWidth : node.scrollHeight;
	return {
		clientDimension: direction === "horizontal" ? node.clientWidth : node.clientHeight,
		scrollDimension,
		scrollStart
	};
}
/** A thin wrapper around `Flex`, for stacking elements vertically. */
var VStack = forwardRefWithAs((props, forwardedRef) => {
	const { elementType: ElementType = "div", children, ...otherProps } = props;
	const styleProps = useFlexStyleProps({
		direction: "column",
		...otherProps
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref: forwardedRef,
		...filterStyleProps(otherProps, Object.keys(flexStyleProps)),
		...styleProps,
		children
	});
});
/** A thin wrapper around `Flex`, for stacking elements horizontally. */
var HStack = forwardRefWithAs((props, forwardedRef) => {
	const { elementType: ElementType = "div", children, ...otherProps } = props;
	const styleProps = useFlexStyleProps({
		direction: "row",
		...otherProps
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
		ref: forwardedRef,
		...filterStyleProps(otherProps, Object.keys(flexStyleProps)),
		...styleProps,
		children
	});
});
var levels = [
	"one",
	"two",
	"three"
];
var MAX_LEVEL = levels.length - 1;
var SurfaceContext = /*#__PURE__*/ (0, import_react.createContext)(1);
forwardRefWithAs((props, forwardedRef) => {
	const { elementType: ElementType = "div", children, level: overrideLevel, ...otherProps } = props;
	const contextLevel = (0, import_react.useContext)(SurfaceContext);
	const level = overrideLevel !== null && overrideLevel !== void 0 ? overrideLevel : contextLevel;
	const levelClassName = `kui--surface-${levels[level]}`;
	const value = Math.max(0, Math.min(level + 1, MAX_LEVEL));
	const styleProps = useStyleProps(otherProps);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SurfaceContext.Provider, {
		value,
		children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ElementType, {
			ref: forwardedRef,
			...filterStyleProps(otherProps),
			...styleProps,
			className: classNames(levelClassName, styleProps.className),
			children
		})
	});
});
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-icon-icons-alertTriangleIcon.js
/** ![alertTriangleIcon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz48cGF0aCBkPSJtMjEuNzMgMTgtOC0xNGEyIDIgMCAwIDAtMy40OCAwbC04IDE0QTIgMiAwIDAgMCA0IDIxaDE2YTIgMiAwIDAgMCAxLjczLTNNMTIgOXY0TTEyIDE3aC4wMSIvPjwvc3ZnPg==) */
var alertTriangleIcon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01" });
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-field.js
var FieldDescription = (props) => {
	const $ = c(2);
	let t0;
	if ($[0] !== props) {
		t0 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
			size: "small",
			color: "neutralSecondary",
			...props
		});
		$[0] = props;
		$[1] = t0;
	} else t0 = $[1];
	return t0;
};
var localizedMessages = {
	"ar-AE": {
		"(optional)": `(اختياري)`,
		"(required)": `(مطلوب)`
	},
	"bg-BG": {
		"(optional)": `(незадължително)`,
		"(required)": `(задължително)`
	},
	"cs-CZ": {
		"(optional)": `(volitelně)`,
		"(required)": `(požadováno)`
	},
	"da-DK": {
		"(optional)": `(valgfrit)`,
		"(required)": `(obligatorisk)`
	},
	"de-DE": {
		"(optional)": `(optional)`,
		"(required)": `(erforderlich)`
	},
	"el-GR": {
		"(optional)": `(προαιρετικό)`,
		"(required)": `(απαιτείται)`
	},
	"en-US": {
		"(optional)": `(optional)`,
		"(required)": `(required)`
	},
	"es-ES": {
		"(optional)": `(opcional)`,
		"(required)": `(necesario)`
	},
	"et-EE": {
		"(optional)": `(valikuline)`,
		"(required)": `(nõutav)`
	},
	"fi-FI": {
		"(optional)": `(valinnainen)`,
		"(required)": `(pakollinen)`
	},
	"fr-FR": {
		"(optional)": `(facultatif)`,
		"(required)": `(requis)`
	},
	"he-IL": {
		"(optional)": `(אופציונלי)`,
		"(required)": `(נדרש)`
	},
	"hr-HR": {
		"(optional)": `(opcionalno)`,
		"(required)": `(obvezno)`
	},
	"hu-HU": {
		"(optional)": `(opcionális)`,
		"(required)": `(kötelező)`
	},
	"it-IT": {
		"(optional)": `(facoltativo)`,
		"(required)": `(obbligatorio)`
	},
	"ja-JP": {
		"(optional)": `（オプション）`,
		"(required)": `（必須）`
	},
	"ko-KR": {
		"(optional)": `(선택 사항)`,
		"(required)": `(필수 사항)`
	},
	"lt-LT": {
		"(optional)": `(pasirenkama)`,
		"(required)": `(privaloma)`
	},
	"lv-LV": {
		"(optional)": `(neobligāti)`,
		"(required)": `(obligāti)`
	},
	"nb-NO": {
		"(optional)": `(valgfritt)`,
		"(required)": `(obligatorisk)`
	},
	"nl-NL": {
		"(optional)": `(optioneel)`,
		"(required)": `(vereist)`
	},
	"pl-PL": {
		"(optional)": `(opcjonalne)`,
		"(required)": `(wymagane)`
	},
	"pt-BR": {
		"(optional)": `(opcional)`,
		"(required)": `(obrigatório)`
	},
	"pt-PT": {
		"(optional)": `(opcional)`,
		"(required)": `(obrigatório)`
	},
	"ro-RO": {
		"(optional)": `(opţional)`,
		"(required)": `(obligatoriu)`
	},
	"ru-RU": {
		"(optional)": `(дополнительно)`,
		"(required)": `(обязательно)`
	},
	"sk-SK": {
		"(optional)": `(nepovinné)`,
		"(required)": `(povinné)`
	},
	"sl-SI": {
		"(optional)": `(opcijsko)`,
		"(required)": `(obvezno)`
	},
	"sr-SP": {
		"(optional)": `(opciono)`,
		"(required)": `(obavezno)`
	},
	"sv-SE": {
		"(optional)": `(valfritt)`,
		"(required)": `(krävs)`
	},
	"tr-TR": {
		"(optional)": `(isteğe bağlı)`,
		"(required)": `(gerekli)`
	},
	"uk-UA": {
		"(optional)": `(необов’язково)`,
		"(required)": `(обов’язково)`
	},
	"zh-CN": {
		"(optional)": `（可选）`,
		"(required)": `（必填）`
	},
	"zh-TW": {
		"(optional)": `(選填)`,
		"(required)": `(必填)`
	}
};
var FieldLabel = forwardRefWithAs(function FieldLabel({ children, elementType: ElementType = "label", isRequired, supplementRequiredState, ...labelProps }, forwardedRef) {
	const styleProps = useTextStyles({
		color: "neutral",
		size: "regular",
		trim: true,
		weight: "medium",
		UNSAFE_className: css({ cursor: "default" })
	});
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(ElementType, {
		ref: forwardedRef,
		...labelProps,
		...styleProps,
		children: [children, isRequired && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Asterisk, { supplementRequiredState })]
	});
});
/**
* Display a required indicator for monitor users.
*
* In cases that don't include a semantic element for user input, describe the
* required state for users of assistive technology.
*/
function Asterisk(t0) {
	const $ = c(6);
	const { supplementRequiredState } = t0;
	const stringFormatter = $cf2482eff2eeeec2$export$f12b703ca79dfbb1(localizedMessages);
	let t1;
	if ($[0] !== supplementRequiredState || $[1] !== stringFormatter) {
		t1 = supplementRequiredState ? stringFormatter.format("(required)") : void 0;
		$[0] = supplementRequiredState;
		$[1] = stringFormatter;
		$[2] = t1;
	} else t1 = $[2];
	let t2;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: css({
				color: tokenSchema.color.foreground.critical,
				fontSize: tokenSchema.typography.text.large.size,
				lineHeight: 1,
				paddingInlineStart: "0.125em"
			}),
			children: "*"
		});
		$[3] = t2;
	} else t2 = $[3];
	let t3;
	if ($[4] !== t1) {
		t3 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			"aria-label": t1,
			children: t2
		});
		$[4] = t1;
		$[5] = t3;
	} else t3 = $[5];
	return t3;
}
var FieldMessage = (props) => {
	const $ = c(6);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = css({ marginTop: "calc(var(--icon-offset) * -1)" });
		$[0] = t0;
	} else t0 = $[0];
	let t1;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = { "--icon-offset": `calc(${tokenSchema.size.icon.regular} - ${tokenSchema.typography.text.small.size})` };
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Icon, {
			src: alertTriangleIcon,
			color: "critical"
		});
		$[2] = t2;
	} else t2 = $[2];
	let t3;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = css({ paddingTop: "var(--icon-offset)" });
		$[3] = t3;
	} else t3 = $[3];
	let t4;
	if ($[4] !== props) {
		t4 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
			gap: "regular",
			UNSAFE_className: t0,
			UNSAFE_style: t1,
			children: [t2, /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Text, {
				color: "critical",
				size: "small",
				UNSAFE_className: t3,
				...props
			})]
		});
		$[4] = props;
		$[5] = t4;
	} else t4 = $[5];
	return t4;
};
var FieldPrimitive = /*#__PURE__*/ (0, import_react.forwardRef)(function FieldPrimitive(props, forwardedRef) {
	const $ = c(30);
	const { children, contextualHelp, isRequired, label, labelElementType, labelProps, description, descriptionProps, errorMessage, errorMessageProps, supplementRequiredState } = props;
	const styleProps = useStyleProps(props);
	const contextualHelpId = (0, import_react.useId)();
	labelProps === null || labelProps === void 0 || labelProps.id;
	let t0;
	let t1;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = css({
			marginBottom: tokenSchema.typography.text.regular.capheightTrim,
			marginTop: tokenSchema.typography.text.regular.baselineTrim
		});
		$[0] = t1;
	} else t1 = $[0];
	const t2 = labelProps !== null && labelProps !== void 0 && labelProps.id ? `${labelProps.id} ${contextualHelpId}` : void 0;
	let t3;
	if ($[1] !== contextualHelpId || $[2] !== t2) {
		t3 = { button: {
			UNSAFE_className: t1,
			id: contextualHelpId,
			"aria-labelledby": t2
		} };
		$[1] = contextualHelpId;
		$[2] = t2;
		$[3] = t3;
	} else t3 = $[3];
	t0 = t3;
	const contextualHelpSlots = t0;
	let t4;
	bb0: {
		if (!label) {
			t4 = null;
			break bb0;
		}
		let t5;
		if ($[4] !== labelElementType || $[5] !== isRequired || $[6] !== supplementRequiredState || $[7] !== labelProps || $[8] !== label) {
			t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldLabel, {
				elementType: labelElementType,
				isRequired,
				supplementRequiredState,
				...labelProps,
				children: label
			});
			$[4] = labelElementType;
			$[5] = isRequired;
			$[6] = supplementRequiredState;
			$[7] = labelProps;
			$[8] = label;
			$[9] = t5;
		} else t5 = $[9];
		const labelUI = t5;
		if (contextualHelp) {
			let t6;
			if ($[10] !== contextualHelpSlots || $[11] !== contextualHelp) {
				t6 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(SlotProvider, {
					slots: contextualHelpSlots,
					children: contextualHelp
				});
				$[10] = contextualHelpSlots;
				$[11] = contextualHelp;
				$[12] = t6;
			} else t6 = $[12];
			let t7;
			if ($[13] !== labelUI || $[14] !== t6) {
				t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
					gap: "small",
					alignItems: "center",
					children: [labelUI, t6]
				});
				$[13] = labelUI;
				$[14] = t6;
				$[15] = t7;
			} else t7 = $[15];
			t4 = t7;
			break bb0;
		}
		t4 = labelUI;
	}
	let t5;
	if ($[16] !== description || $[17] !== descriptionProps) {
		t5 = description && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldDescription, {
			...descriptionProps,
			children: description
		});
		$[16] = description;
		$[17] = descriptionProps;
		$[18] = t5;
	} else t5 = $[18];
	let t6;
	if ($[19] !== errorMessage || $[20] !== errorMessageProps) {
		t6 = errorMessage && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldMessage, {
			...errorMessageProps,
			children: errorMessage
		});
		$[19] = errorMessage;
		$[20] = errorMessageProps;
		$[21] = t6;
	} else t6 = $[21];
	let t7;
	if ($[22] !== forwardedRef || $[23] !== styleProps.className || $[24] !== styleProps.style || $[25] !== t4 || $[26] !== t5 || $[27] !== children || $[28] !== t6) {
		t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)(Flex, {
			ref: forwardedRef,
			direction: "column",
			gap: "medium",
			minWidth: 0,
			UNSAFE_className: styleProps.className,
			UNSAFE_style: styleProps.style,
			children: [
				t4,
				t5,
				children,
				t6
			]
		});
		$[22] = forwardedRef;
		$[23] = styleProps.className;
		$[24] = styleProps.style;
		$[25] = t4;
		$[26] = t5;
		$[27] = children;
		$[28] = t6;
		$[29] = t7;
	} else t7 = $[29];
	return t7;
});
/**
* Provides the accessibility implementation for input fields. Fields accept
* user input, gain context from their label, and may display a description or
* error message.
*/
var Field = (props) => {
	const $ = c(44);
	let isRequired;
	let errorMessage;
	let isDisabled;
	let isReadOnly;
	let label;
	let description;
	let otherProps;
	let children;
	if ($[0] !== props) {
		({children, description, errorMessage, isDisabled, isReadOnly, isRequired, label, ...otherProps} = props);
		$[0] = props;
		$[1] = isRequired;
		$[2] = errorMessage;
		$[3] = isDisabled;
		$[4] = isReadOnly;
		$[5] = label;
		$[6] = description;
		$[7] = otherProps;
		$[8] = children;
	} else {
		isRequired = $[1];
		errorMessage = $[2];
		isDisabled = $[3];
		isReadOnly = $[4];
		label = $[5];
		description = $[6];
		otherProps = $[7];
		children = $[8];
	}
	const { labelProps, fieldProps, descriptionProps, errorMessageProps } = $191c9b6d48a0a4e2$export$294aa081a6c6f55d(props);
	const t0 = isRequired || void 0;
	const t1 = errorMessage ? true : void 0;
	let T0;
	let t2;
	let t3;
	let t4;
	let t5;
	let t6;
	let t7;
	let t8;
	let t9;
	let t10;
	if ($[9] !== fieldProps || $[10] !== isDisabled || $[11] !== isReadOnly || $[12] !== t0 || $[13] !== t1 || $[14] !== isRequired || $[15] !== label || $[16] !== labelProps || $[17] !== description || $[18] !== descriptionProps || $[19] !== errorMessage || $[20] !== errorMessageProps || $[21] !== otherProps || $[22] !== children) {
		const renderProps = {
			...fieldProps,
			disabled: isDisabled,
			readOnly: isReadOnly,
			"aria-required": t0,
			"aria-invalid": t1
		};
		T0 = FieldPrimitive;
		t2 = isRequired;
		t3 = label;
		t4 = labelProps;
		t5 = description;
		t6 = descriptionProps;
		t7 = errorMessage;
		t8 = errorMessageProps;
		t9 = otherProps;
		t10 = children(renderProps);
		$[9] = fieldProps;
		$[10] = isDisabled;
		$[11] = isReadOnly;
		$[12] = t0;
		$[13] = t1;
		$[14] = isRequired;
		$[15] = label;
		$[16] = labelProps;
		$[17] = description;
		$[18] = descriptionProps;
		$[19] = errorMessage;
		$[20] = errorMessageProps;
		$[21] = otherProps;
		$[22] = children;
		$[23] = T0;
		$[24] = t2;
		$[25] = t3;
		$[26] = t4;
		$[27] = t5;
		$[28] = t6;
		$[29] = t7;
		$[30] = t8;
		$[31] = t9;
		$[32] = t10;
	} else {
		T0 = $[23];
		t2 = $[24];
		t3 = $[25];
		t4 = $[26];
		t5 = $[27];
		t6 = $[28];
		t7 = $[29];
		t8 = $[30];
		t9 = $[31];
		t10 = $[32];
	}
	let t11;
	if ($[33] !== T0 || $[34] !== t2 || $[35] !== t3 || $[36] !== t4 || $[37] !== t5 || $[38] !== t6 || $[39] !== t7 || $[40] !== t8 || $[41] !== t9 || $[42] !== t10) {
		t11 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(T0, {
			isRequired: t2,
			label: t3,
			labelProps: t4,
			description: t5,
			descriptionProps: t6,
			errorMessage: t7,
			errorMessageProps: t8,
			...t9,
			children: t10
		});
		$[33] = T0;
		$[34] = t2;
		$[35] = t3;
		$[36] = t4;
		$[37] = t5;
		$[38] = t6;
		$[39] = t7;
		$[40] = t8;
		$[41] = t9;
		$[42] = t10;
		$[43] = t11;
	} else t11 = $[43];
	return t11;
};
/**
* Add `validationState` when `errorMessage` is provided. Used by
* "@react-aria/*" hooks to determine aria attributes.
*/
function validateFieldProps(props) {
	if (props.errorMessage) return Object.assign({}, { validationState: "invalid" }, props);
	return props;
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-icon-icons-chevronDownIcon.js
/** ![chevronDownIcon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiI+PHJlY3QgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiLz48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=) */
var chevronDownIcon = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "m6 9 6 6 6-6" });
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useInteractOutside.mjs
function $e260d131964da0f9$export$872b660ac5a1ff98(props) {
	let { ref, onInteractOutside, isDisabled, onInteractOutsideStart } = props;
	let stateRef = (0, import_react.useRef)({
		isPointerDown: false,
		ignoreEmulatedMouseEvents: false
	});
	let onPointerDown = $fe16bffc7a557bf0$export$7f54fc3180508a52((e) => {
		if (onInteractOutside && $e260d131964da0f9$var$isValidEvent(e, ref)) {
			if (onInteractOutsideStart) onInteractOutsideStart(e);
			stateRef.current.isPointerDown = true;
		}
	});
	let triggerInteractOutside = $fe16bffc7a557bf0$export$7f54fc3180508a52((e) => {
		if (onInteractOutside) onInteractOutside(e);
	});
	(0, import_react.useEffect)(() => {
		let state = stateRef.current;
		if (isDisabled) return;
		const element = ref.current;
		const documentObject = $d447af545b77c9f1$export$b204af158042fbac(element);
		if (typeof PointerEvent !== "undefined") {
			let onClick = (e) => {
				if (state.isPointerDown && $e260d131964da0f9$var$isValidEvent(e, ref)) triggerInteractOutside(e);
				state.isPointerDown = false;
			};
			documentObject.addEventListener("pointerdown", onPointerDown, true);
			documentObject.addEventListener("click", onClick, true);
			return () => {
				documentObject.removeEventListener("pointerdown", onPointerDown, true);
				documentObject.removeEventListener("click", onClick, true);
			};
		}
	}, [ref, isDisabled]);
}
function $e260d131964da0f9$var$isValidEvent(event, ref) {
	if (event.button > 0) return false;
	let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(event);
	if (target) {
		const ownerDocument = target.ownerDocument;
		if (!ownerDocument || !$23f2114a1b82827e$export$4282f70798064fe0(ownerDocument.documentElement, target)) return false;
		if (target.closest("[data-react-aria-top-layer]")) return false;
	}
	if (!ref.current) return false;
	return !event.composedPath().includes(ref.current);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlay.mjs
var $77844860df94ba23$var$visibleOverlays = [];
function $77844860df94ba23$export$ea8f71083e90600f(props, ref) {
	let { onClose, shouldCloseOnBlur, isOpen, isDismissable = false, isKeyboardDismissDisabled = false, shouldCloseOnInteractOutside } = props;
	let lastVisibleOverlay = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => {
		if (isOpen && !$77844860df94ba23$var$visibleOverlays.includes(ref)) {
			$77844860df94ba23$var$visibleOverlays.push(ref);
			return () => {
				let index = $77844860df94ba23$var$visibleOverlays.indexOf(ref);
				if (index >= 0) $77844860df94ba23$var$visibleOverlays.splice(index, 1);
			};
		}
	}, [isOpen, ref]);
	let onHide = () => {
		if ($77844860df94ba23$var$visibleOverlays[$77844860df94ba23$var$visibleOverlays.length - 1] === ref && onClose) onClose();
	};
	let onInteractOutsideStart = (e) => {
		const topMostOverlay = $77844860df94ba23$var$visibleOverlays[$77844860df94ba23$var$visibleOverlays.length - 1];
		lastVisibleOverlay.current = topMostOverlay;
		if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside($23f2114a1b82827e$export$e58f029f0fbfdb29(e))) {
			if (topMostOverlay === ref) e.stopPropagation();
		}
	};
	let onInteractOutside = (e) => {
		if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside($23f2114a1b82827e$export$e58f029f0fbfdb29(e))) {
			if ($77844860df94ba23$var$visibleOverlays[$77844860df94ba23$var$visibleOverlays.length - 1] === ref) e.stopPropagation();
			if (lastVisibleOverlay.current === ref) onHide();
		}
		lastVisibleOverlay.current = void 0;
	};
	let onKeyDown = (e) => {
		if (e.key === "Escape" && !isKeyboardDismissDisabled && !e.nativeEvent.isComposing) {
			e.stopPropagation();
			e.preventDefault();
			onHide();
		}
	};
	$e260d131964da0f9$export$872b660ac5a1ff98({
		ref,
		onInteractOutside: isDismissable && isOpen ? onInteractOutside : void 0,
		onInteractOutsideStart
	});
	let { focusWithinProps } = $2c9edc598a03d523$export$420e68273165f4ec({
		isDisabled: !shouldCloseOnBlur,
		onBlurWithin: (e) => {
			if (!e.relatedTarget || $535772f9d2c1f38d$export$1258395f99bf9cbf(e.relatedTarget)) return;
			if (!shouldCloseOnInteractOutside || shouldCloseOnInteractOutside(e.relatedTarget)) onClose?.();
		}
	});
	return {
		overlayProps: {
			onKeyDown,
			...focusWithinProps
		},
		underlayProps: {}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/Overlay.mjs
var $d7a937236970dc7f$export$a2200b96afd16271 = /*#__PURE__*/ import_react.createContext(null);
function $d7a937236970dc7f$export$c6fdb837b070b4ff(props) {
	let isSSR = $c7eafbbe1ea5834e$export$535bd6ca7f90a273();
	let { portalContainer = isSSR ? null : document.body, isExiting } = props;
	let [contain, setContain] = (0, import_react.useState)(false);
	let contextValue = (0, import_react.useMemo)(() => ({
		contain,
		setContain
	}), [contain, setContain]);
	let { getContainer } = $72abaeab4d80592f$export$9fc1347d4195ccb3();
	if (!props.portalContainer && getContainer) portalContainer = getContainer();
	if (!portalContainer) return null;
	let contents = props.children;
	if (!props.disableFocusManagement) contents = /*#__PURE__*/ import_react.createElement($535772f9d2c1f38d$export$20e40289641fbbb6, {
		restoreFocus: true,
		contain: (props.shouldContainFocus || contain) && !isExiting
	}, contents);
	contents = /*#__PURE__*/ import_react.createElement($d7a937236970dc7f$export$a2200b96afd16271.Provider, { value: contextValue }, /*#__PURE__*/ import_react.createElement($0d47b37c475c5231$export$cf75428e0b9ed1ea, null, contents));
	return /*#__PURE__*/ import_react_dom.createPortal(contents, portalContainer);
}
function $d7a937236970dc7f$export$14c98a7594375490() {
	let setContain = (0, import_react.useContext)($d7a937236970dc7f$export$a2200b96afd16271)?.setContain;
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		setContain?.(true);
	}, [setContain]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getScrollParent.mjs
function $3578607fe3d4b096$export$cfa2225e87938781(node, checkForOverflow) {
	let scrollableNode = node;
	if ($901761b40e390936$export$2bb74740c4e19def(scrollableNode, checkForOverflow)) scrollableNode = scrollableNode.parentElement;
	while (scrollableNode && !$901761b40e390936$export$2bb74740c4e19def(scrollableNode, checkForOverflow)) scrollableNode = scrollableNode.parentElement;
	return scrollableNode || document.scrollingElement || document.documentElement;
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/usePreventScroll.mjs
var $0644e3663365bfe5$var$visualViewport = typeof document !== "undefined" && window.visualViewport;
var $0644e3663365bfe5$var$preventScrollCount = 0;
var $0644e3663365bfe5$var$restore;
function $0644e3663365bfe5$export$ee0f7cc6afcd1c18(options = {}) {
	let { isDisabled } = options;
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		if (isDisabled) return;
		$0644e3663365bfe5$var$preventScrollCount++;
		if ($0644e3663365bfe5$var$preventScrollCount === 1) {
			if ($2add3ce32c6007eb$export$fedb369cb70207f1()) $0644e3663365bfe5$var$restore = $0644e3663365bfe5$var$preventScrollMobileSafari();
			else $0644e3663365bfe5$var$restore = $0644e3663365bfe5$var$preventScrollStandard();
		}
		return () => {
			$0644e3663365bfe5$var$preventScrollCount--;
			if ($0644e3663365bfe5$var$preventScrollCount === 0) $0644e3663365bfe5$var$restore();
		};
	}, [isDisabled]);
}
function $0644e3663365bfe5$var$preventScrollStandard() {
	let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
	return $a4e76a5424781910$export$e08e3b67e392101e(scrollbarWidth > 0 && ("scrollbarGutter" in document.documentElement.style ? $0644e3663365bfe5$var$setStyle(document.documentElement, "scrollbarGutter", "stable") : $0644e3663365bfe5$var$setStyle(document.documentElement, "paddingRight", `${scrollbarWidth}px`)), $0644e3663365bfe5$var$setStyle(document.documentElement, "overflow", "hidden"));
}
function $0644e3663365bfe5$var$preventScrollMobileSafari() {
	let restoreOverflow = $0644e3663365bfe5$var$setStyle(document.documentElement, "overflow", "hidden");
	let scrollable;
	let allowTouchMove = false;
	let onTouchStart = (e) => {
		let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		scrollable = $901761b40e390936$export$2bb74740c4e19def(target) ? target : $3578607fe3d4b096$export$cfa2225e87938781(target, true);
		allowTouchMove = false;
		let selection = target.ownerDocument.defaultView.getSelection();
		if (selection && !selection.isCollapsed && selection.containsNode(target, true)) allowTouchMove = true;
		if (e.composedPath().some((el) => el instanceof HTMLInputElement && el.type === "range")) allowTouchMove = true;
		if ("selectionStart" in target && "selectionEnd" in target && target.selectionStart < target.selectionEnd && target.ownerDocument.activeElement === target) allowTouchMove = true;
	};
	let style = document.createElement("style");
	let nonce = $2b2d34ff061957fb$export$2b85b721e524d74b();
	if (nonce) style.nonce = nonce;
	style.textContent = `
@layer {
  * {
    overscroll-behavior: contain;
  }
}`.trim();
	document.head.prepend(style);
	let onTouchMove = (e) => {
		if (e.touches.length === 2 || allowTouchMove) return;
		if (!scrollable || scrollable === document.documentElement || scrollable === document.body) {
			e.preventDefault();
			return;
		}
		if (scrollable.scrollHeight === scrollable.clientHeight && scrollable.scrollWidth === scrollable.clientWidth) e.preventDefault();
	};
	let onBlur = (e) => {
		let target = $23f2114a1b82827e$export$e58f029f0fbfdb29(e);
		let relatedTarget = e.relatedTarget;
		if (relatedTarget && $bb39c0fc1c19b34c$export$c57958e35f31ed73(relatedTarget)) {
			relatedTarget.focus({ preventScroll: true });
			$0644e3663365bfe5$var$scrollIntoViewWhenReady(relatedTarget, $bb39c0fc1c19b34c$export$c57958e35f31ed73(target));
		} else if (!relatedTarget) (target.parentElement?.closest("[tabindex]"))?.focus({ preventScroll: true });
	};
	let focus = HTMLElement.prototype.focus;
	HTMLElement.prototype.focus = function(opts) {
		let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576();
		let wasKeyboardVisible = activeElement != null && $bb39c0fc1c19b34c$export$c57958e35f31ed73(activeElement);
		focus.call(this, {
			...opts,
			preventScroll: true
		});
		if (!opts || !opts.preventScroll) $0644e3663365bfe5$var$scrollIntoViewWhenReady(this, wasKeyboardVisible);
	};
	let removeEvents = $a4e76a5424781910$export$e08e3b67e392101e($0644e3663365bfe5$var$addEvent(document, "touchstart", onTouchStart, {
		passive: false,
		capture: true
	}), $0644e3663365bfe5$var$addEvent(document, "touchmove", onTouchMove, {
		passive: false,
		capture: true
	}), $0644e3663365bfe5$var$addEvent(document, "blur", onBlur, true));
	return () => {
		restoreOverflow();
		removeEvents();
		style.remove();
		HTMLElement.prototype.focus = focus;
	};
}
function $0644e3663365bfe5$var$setStyle(element, style, value) {
	let cur = element.style[style];
	element.style[style] = value;
	return () => {
		element.style[style] = cur;
	};
}
function $0644e3663365bfe5$var$addEvent(target, event, handler, options) {
	target.addEventListener(event, handler, options);
	return () => {
		target.removeEventListener(event, handler, options);
	};
}
function $0644e3663365bfe5$var$scrollIntoViewWhenReady(target, wasKeyboardVisible) {
	if (wasKeyboardVisible || !$0644e3663365bfe5$var$visualViewport) $0644e3663365bfe5$var$scrollIntoView(target);
	else $0644e3663365bfe5$var$visualViewport.addEventListener("resize", () => $0644e3663365bfe5$var$scrollIntoView(target), { once: true });
}
function $0644e3663365bfe5$var$scrollIntoView(target) {
	let root = document.scrollingElement || document.documentElement;
	let nextTarget = target;
	while (nextTarget && nextTarget !== root) {
		let scrollable = $3578607fe3d4b096$export$cfa2225e87938781(nextTarget);
		if (scrollable !== document.documentElement && scrollable !== document.body && scrollable !== nextTarget) {
			let scrollableRect = scrollable.getBoundingClientRect();
			let targetRect = nextTarget.getBoundingClientRect();
			if (targetRect.top < scrollableRect.top || targetRect.bottom > scrollableRect.top + nextTarget.clientHeight) {
				let bottom = scrollableRect.bottom;
				if ($0644e3663365bfe5$var$visualViewport) bottom = Math.min(bottom, $0644e3663365bfe5$var$visualViewport.offsetTop + $0644e3663365bfe5$var$visualViewport.height);
				let adjustment = targetRect.top - scrollableRect.top - ((bottom - scrollableRect.top) / 2 - targetRect.height / 2);
				scrollable.scrollTo({
					top: Math.max(0, Math.min(scrollable.scrollHeight - scrollable.clientHeight, scrollable.scrollTop + adjustment)),
					behavior: "smooth"
				});
			}
		}
		nextTarget = scrollable.parentElement;
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useModalOverlay.mjs
function $5698867baeb53f4e$export$dbc0f175b25fb0fb(props, state, ref) {
	let { overlayProps, underlayProps } = $77844860df94ba23$export$ea8f71083e90600f({
		...props,
		isOpen: state.isOpen,
		onClose: state.close
	}, ref);
	$0644e3663365bfe5$export$ee0f7cc6afcd1c18({ isDisabled: !state.isOpen });
	$d7a937236970dc7f$export$14c98a7594375490();
	(0, import_react.useEffect)(() => {
		if (state.isOpen && ref.current) return $58196c8d6a1f38fc$export$1c3ebcada18427bf([ref.current], { shouldUseInert: true });
	}, [state.isOpen, ref]);
	return {
		modalProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(overlayProps),
		underlayProps
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useViewportSize.mjs
var $6066a2c586ade9e1$var$visualViewport = typeof document !== "undefined" && window.visualViewport;
function $6066a2c586ade9e1$export$d699905dd57c73ca() {
	let isSSR = $c7eafbbe1ea5834e$export$535bd6ca7f90a273();
	let [size, setSize] = (0, import_react.useState)(() => isSSR ? {
		width: 0,
		height: 0
	} : $6066a2c586ade9e1$var$getViewportSize());
	(0, import_react.useEffect)(() => {
		let updateSize = (newSize) => {
			setSize((size) => {
				if (newSize.width === size.width && newSize.height === size.height) return size;
				return newSize;
			});
		};
		let onResize = () => {
			if ($6066a2c586ade9e1$var$visualViewport && $6066a2c586ade9e1$var$visualViewport.scale > 1) return;
			updateSize($6066a2c586ade9e1$var$getViewportSize());
		};
		let frame;
		let onBlur = (e) => {
			if ($6066a2c586ade9e1$var$visualViewport && $6066a2c586ade9e1$var$visualViewport.scale > 1) return;
			if ($bb39c0fc1c19b34c$export$c57958e35f31ed73($23f2114a1b82827e$export$e58f029f0fbfdb29(e))) frame = requestAnimationFrame(() => {
				let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576();
				if (!activeElement || !$bb39c0fc1c19b34c$export$c57958e35f31ed73(activeElement)) updateSize({
					width: document.documentElement.clientWidth,
					height: document.documentElement.clientHeight
				});
			});
		};
		updateSize($6066a2c586ade9e1$var$getViewportSize());
		if ($2add3ce32c6007eb$export$fedb369cb70207f1()) window.addEventListener("blur", onBlur, true);
		if (!$6066a2c586ade9e1$var$visualViewport) window.addEventListener("resize", onResize);
		else $6066a2c586ade9e1$var$visualViewport.addEventListener("resize", onResize);
		return () => {
			cancelAnimationFrame(frame);
			if ($2add3ce32c6007eb$export$fedb369cb70207f1()) window.removeEventListener("blur", onBlur, true);
			if (!$6066a2c586ade9e1$var$visualViewport) window.removeEventListener("resize", onResize);
			else $6066a2c586ade9e1$var$visualViewport.removeEventListener("resize", onResize);
		};
	}, []);
	return size;
}
/**
* Get the viewport size without the scrollbar.
*/ function $6066a2c586ade9e1$var$getViewportSize() {
	return {
		width: $6066a2c586ade9e1$var$visualViewport ? Math.min($6066a2c586ade9e1$var$visualViewport.width * $6066a2c586ade9e1$var$visualViewport.scale, document.documentElement.clientWidth) : document.documentElement.clientWidth,
		height: $6066a2c586ade9e1$var$visualViewport ? $6066a2c586ade9e1$var$visualViewport.height * $6066a2c586ade9e1$var$visualViewport.scale : document.documentElement.clientHeight
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ar-AE.mjs
var $e5024b484f7c3e21$exports = {};
$e5024b484f7c3e21$exports = { "dismiss": `\u{62A}\u{62C}\u{627}\u{647}\u{644}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/bg-BG.mjs
var $0c4209a7da92851c$exports = {};
$0c4209a7da92851c$exports = { "dismiss": `\u{41E}\u{442}\u{445}\u{432}\u{44A}\u{440}\u{43B}\u{44F}\u{43D}\u{435}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/cs-CZ.mjs
var $75fa0397632d287b$exports = {};
$75fa0397632d287b$exports = { "dismiss": `Odstranit` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/da-DK.mjs
var $3fc6e6880cad247e$exports = {};
$3fc6e6880cad247e$exports = { "dismiss": `Luk` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/de-DE.mjs
var $5f637eb0c91d0f64$exports = {};
$5f637eb0c91d0f64$exports = { "dismiss": `Schlie\xdfen` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/el-GR.mjs
var $5a0b3a154dcf111b$exports = {};
$5a0b3a154dcf111b$exports = { "dismiss": `\u{391}\u{3C0}\u{3CC}\u{3C1}\u{3C1}\u{3B9}\u{3C8}\u{3B7}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/en-US.mjs
var $ea518f18e6f13288$exports = {};
$ea518f18e6f13288$exports = { "dismiss": `Dismiss` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/es-ES.mjs
var $3bf3cb0ce48a8078$exports = {};
$3bf3cb0ce48a8078$exports = { "dismiss": `Descartar` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/et-EE.mjs
var $a416146243e75233$exports = {};
$a416146243e75233$exports = { "dismiss": `L\xf5peta` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/fi-FI.mjs
var $2872659e6c428111$exports = {};
$2872659e6c428111$exports = { "dismiss": `Hylk\xe4\xe4` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/fr-FR.mjs
var $657a7a1f03941145$exports = {};
$657a7a1f03941145$exports = { "dismiss": `Rejeter` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/he-IL.mjs
var $9f18aee5ddbe5e0f$exports = {};
$9f18aee5ddbe5e0f$exports = { "dismiss": `\u{5D4}\u{5EA}\u{5E2}\u{5DC}\u{5DD}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/hr-HR.mjs
var $e2e63adb0c1f3db6$exports = {};
$e2e63adb0c1f3db6$exports = { "dismiss": `Odbaci` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/hu-HU.mjs
var $46fbd53e8bc70315$exports = {};
$46fbd53e8bc70315$exports = { "dismiss": `Elutas\xedt\xe1s` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/it-IT.mjs
var $47234f3018c55486$exports = {};
$47234f3018c55486$exports = { "dismiss": `Ignora` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ja-JP.mjs
var $0dfacfad01736641$exports = {};
$0dfacfad01736641$exports = { "dismiss": `\u{9589}\u{3058}\u{308B}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ko-KR.mjs
var $a9056b50f6fbb1ef$exports = {};
$a9056b50f6fbb1ef$exports = { "dismiss": `\u{BB34}\u{C2DC}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/lt-LT.mjs
var $217b78056fce917f$exports = {};
$217b78056fce917f$exports = { "dismiss": `Atmesti` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/lv-LV.mjs
var $c32f8c2b8956f20a$exports = {};
$c32f8c2b8956f20a$exports = { "dismiss": `Ner\u{101}d\u{12B}t` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/nb-NO.mjs
var $f65392426e2dae6a$exports = {};
$f65392426e2dae6a$exports = { "dismiss": `Lukk` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/nl-NL.mjs
var $1d0fa5f3cc68e5b0$exports = {};
$1d0fa5f3cc68e5b0$exports = { "dismiss": `Negeren` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pl-PL.mjs
var $ff8aa6518e51f809$exports = {};
$ff8aa6518e51f809$exports = { "dismiss": `Zignoruj` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pt-BR.mjs
var $fe3a4eb3eebfb0a2$exports = {};
$fe3a4eb3eebfb0a2$exports = { "dismiss": `Descartar` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pt-PT.mjs
var $f692c6bcabd26695$exports = {};
$f692c6bcabd26695$exports = { "dismiss": `Dispensar` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ro-RO.mjs
var $627fbb16c92fb654$exports = {};
$627fbb16c92fb654$exports = { "dismiss": `Revocare` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ru-RU.mjs
var $2c9c1dfc72c7bac2$exports = {};
$2c9c1dfc72c7bac2$exports = { "dismiss": `\u{41F}\u{440}\u{43E}\u{43F}\u{443}\u{441}\u{442}\u{438}\u{442}\u{44C}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sk-SK.mjs
var $7e7ece760f897013$exports = {};
$7e7ece760f897013$exports = { "dismiss": `Zru\u{161}i\u{165}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sl-SI.mjs
var $1e894e47be1bf217$exports = {};
$1e894e47be1bf217$exports = { "dismiss": `Opusti` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sr-SP.mjs
var $f4ce49adf6ef095f$exports = {};
$f4ce49adf6ef095f$exports = { "dismiss": `Odbaci` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sv-SE.mjs
var $7c9dc206185355b5$exports = {};
$7c9dc206185355b5$exports = { "dismiss": `Avvisa` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/tr-TR.mjs
var $c288097c5ef4ae98$exports = {};
$c288097c5ef4ae98$exports = { "dismiss": `Kapat` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/uk-UA.mjs
var $d5863f94ad4c3f07$exports = {};
$d5863f94ad4c3f07$exports = { "dismiss": `\u{421}\u{43A}\u{430}\u{441}\u{443}\u{432}\u{430}\u{442}\u{438}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/zh-CN.mjs
var $34a6eb7890264192$exports = {};
$34a6eb7890264192$exports = { "dismiss": `\u{53D6}\u{6D88}` };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/zh-TW.mjs
var $79ae244e9d286cb7$exports = {};
$79ae244e9d286cb7$exports = { "dismiss": `\u{95DC}\u{9589}` };
//#endregion
//#region node_modules/react-aria/dist/private/overlays/intlStrings.mjs
var $8ad4f9eb0c0f6434$exports = {};
$8ad4f9eb0c0f6434$exports = {
	"ar-AE": $e5024b484f7c3e21$exports,
	"bg-BG": $0c4209a7da92851c$exports,
	"cs-CZ": $75fa0397632d287b$exports,
	"da-DK": $3fc6e6880cad247e$exports,
	"de-DE": $5f637eb0c91d0f64$exports,
	"el-GR": $5a0b3a154dcf111b$exports,
	"en-US": $ea518f18e6f13288$exports,
	"es-ES": $3bf3cb0ce48a8078$exports,
	"et-EE": $a416146243e75233$exports,
	"fi-FI": $2872659e6c428111$exports,
	"fr-FR": $657a7a1f03941145$exports,
	"he-IL": $9f18aee5ddbe5e0f$exports,
	"hr-HR": $e2e63adb0c1f3db6$exports,
	"hu-HU": $46fbd53e8bc70315$exports,
	"it-IT": $47234f3018c55486$exports,
	"ja-JP": $0dfacfad01736641$exports,
	"ko-KR": $a9056b50f6fbb1ef$exports,
	"lt-LT": $217b78056fce917f$exports,
	"lv-LV": $c32f8c2b8956f20a$exports,
	"nb-NO": $f65392426e2dae6a$exports,
	"nl-NL": $1d0fa5f3cc68e5b0$exports,
	"pl-PL": $ff8aa6518e51f809$exports,
	"pt-BR": $fe3a4eb3eebfb0a2$exports,
	"pt-PT": $f692c6bcabd26695$exports,
	"ro-RO": $627fbb16c92fb654$exports,
	"ru-RU": $2c9c1dfc72c7bac2$exports,
	"sk-SK": $7e7ece760f897013$exports,
	"sl-SI": $1e894e47be1bf217$exports,
	"sr-SP": $f4ce49adf6ef095f$exports,
	"sv-SE": $7c9dc206185355b5$exports,
	"tr-TR": $c288097c5ef4ae98$exports,
	"uk-UA": $d5863f94ad4c3f07$exports,
	"zh-CN": $34a6eb7890264192$exports,
	"zh-TW": $79ae244e9d286cb7$exports
};
//#endregion
//#region node_modules/react-aria/dist/private/overlays/DismissButton.mjs
function $parcel$interopDefault(a) {
	return a && a.__esModule ? a.default : a;
}
function $081058010ef8962e$export$2317d149ed6f78c4(props) {
	let { onDismiss, ...otherProps } = props;
	let labels = $e8ac3c3f5d4bae7f$export$d6875122194c7b44(otherProps, $cf2482eff2eeeec2$export$f12b703ca79dfbb1($parcel$interopDefault($8ad4f9eb0c0f6434$exports), "@react-aria/overlays").format("dismiss"));
	let onClick = () => {
		if (onDismiss) onDismiss();
	};
	return /*#__PURE__*/ import_react.createElement($ea3928288112382f$export$439d29a4e110a164, null, /*#__PURE__*/ import_react.createElement("button", {
		...labels,
		tabIndex: -1,
		onClick,
		style: {
			width: 1,
			height: 1
		}
	}));
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/calculatePosition.mjs
var $954926fb6168ae2a$var$AXIS = {
	top: "top",
	bottom: "top",
	left: "left",
	right: "left"
};
var $954926fb6168ae2a$var$FLIPPED_DIRECTION = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
};
var $954926fb6168ae2a$var$CROSS_AXIS = {
	top: "left",
	left: "top"
};
var $954926fb6168ae2a$var$AXIS_SIZE = {
	top: "height",
	left: "width"
};
var $954926fb6168ae2a$var$TOTAL_SIZE = {
	width: "totalWidth",
	height: "totalHeight"
};
var $954926fb6168ae2a$var$PARSED_PLACEMENT_CACHE = {};
var $954926fb6168ae2a$var$getVisualViewport = () => typeof document !== "undefined" ? window.visualViewport : null;
function $954926fb6168ae2a$var$getContainerDimensions(containerNode, visualViewport) {
	let width = 0, height = 0, totalWidth = 0, totalHeight = 0, top = 0, left = 0;
	let scroll = {};
	let isPinchZoomedIn = (visualViewport?.scale ?? 1) > 1;
	if (containerNode.tagName === "BODY" || containerNode.tagName === "HTML") {
		let documentElement = document.documentElement;
		totalWidth = documentElement.clientWidth;
		totalHeight = documentElement.clientHeight;
		width = visualViewport?.width ?? totalWidth;
		height = visualViewport?.height ?? totalHeight;
		scroll.top = documentElement.scrollTop || containerNode.scrollTop;
		scroll.left = documentElement.scrollLeft || containerNode.scrollLeft;
		if (visualViewport) {
			top = visualViewport.offsetTop;
			left = visualViewport.offsetLeft;
		}
	} else {
		({width: width, height: height, top: top, left: left} = $954926fb6168ae2a$var$getOffset(containerNode, false));
		scroll.top = containerNode.scrollTop;
		scroll.left = containerNode.scrollLeft;
		totalWidth = width;
		totalHeight = height;
	}
	if ($2add3ce32c6007eb$export$78551043582a6a98() && (containerNode.tagName === "BODY" || containerNode.tagName === "HTML") && isPinchZoomedIn) {
		scroll.top = 0;
		scroll.left = 0;
		top = visualViewport?.pageTop ?? 0;
		left = visualViewport?.pageLeft ?? 0;
	}
	return {
		width,
		height,
		totalWidth,
		totalHeight,
		scroll,
		top,
		left
	};
}
function $954926fb6168ae2a$var$getScroll(node) {
	return {
		top: node.scrollTop,
		left: node.scrollLeft,
		width: node.scrollWidth,
		height: node.scrollHeight
	};
}
function $954926fb6168ae2a$var$getDelta(axis, offset, size, boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary) {
	let containerScroll = containerDimensions.scroll[axis] ?? 0;
	let boundarySize = boundaryDimensions[$954926fb6168ae2a$var$AXIS_SIZE[axis]];
	let boundaryStartEdge = containerOffsetWithBoundary[axis] + boundaryDimensions.scroll[$954926fb6168ae2a$var$AXIS[axis]] + padding;
	let boundaryEndEdge = containerOffsetWithBoundary[axis] + boundaryDimensions.scroll[$954926fb6168ae2a$var$AXIS[axis]] + boundarySize - padding;
	let startEdgeOffset = offset - containerScroll + boundaryDimensions.scroll[$954926fb6168ae2a$var$AXIS[axis]] + containerOffsetWithBoundary[axis] - boundaryDimensions[$954926fb6168ae2a$var$AXIS[axis]];
	let endEdgeOffset = offset - containerScroll + size + boundaryDimensions.scroll[$954926fb6168ae2a$var$AXIS[axis]] + containerOffsetWithBoundary[axis] - boundaryDimensions[$954926fb6168ae2a$var$AXIS[axis]];
	if (startEdgeOffset < boundaryStartEdge) return boundaryStartEdge - startEdgeOffset;
	else if (endEdgeOffset > boundaryEndEdge) return Math.max(boundaryEndEdge - endEdgeOffset, boundaryStartEdge - startEdgeOffset);
	else return 0;
}
function $954926fb6168ae2a$var$getMargins(node) {
	let style = window.getComputedStyle(node);
	return {
		top: parseInt(style.marginTop, 10) || 0,
		bottom: parseInt(style.marginBottom, 10) || 0,
		left: parseInt(style.marginLeft, 10) || 0,
		right: parseInt(style.marginRight, 10) || 0
	};
}
function $954926fb6168ae2a$var$parsePlacement(input) {
	if ($954926fb6168ae2a$var$PARSED_PLACEMENT_CACHE[input]) return $954926fb6168ae2a$var$PARSED_PLACEMENT_CACHE[input];
	let [placement, crossPlacement] = input.split(" ");
	let axis = $954926fb6168ae2a$var$AXIS[placement] || "right";
	let crossAxis = $954926fb6168ae2a$var$CROSS_AXIS[axis];
	if (!$954926fb6168ae2a$var$AXIS[crossPlacement]) crossPlacement = "center";
	let size = $954926fb6168ae2a$var$AXIS_SIZE[axis];
	let crossSize = $954926fb6168ae2a$var$AXIS_SIZE[crossAxis];
	$954926fb6168ae2a$var$PARSED_PLACEMENT_CACHE[input] = {
		placement,
		crossPlacement,
		axis,
		crossAxis,
		size,
		crossSize
	};
	return $954926fb6168ae2a$var$PARSED_PLACEMENT_CACHE[input];
}
function $954926fb6168ae2a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions) {
	let { placement, crossPlacement, axis, crossAxis, size, crossSize } = placementInfo;
	let position = {};
	position[crossAxis] = childOffset[crossAxis] ?? 0;
	if (crossPlacement === "center") position[crossAxis] += ((childOffset[crossSize] ?? 0) - (overlaySize[crossSize] ?? 0)) / 2;
	else if (crossPlacement !== crossAxis) position[crossAxis] += (childOffset[crossSize] ?? 0) - (overlaySize[crossSize] ?? 0);
	position[crossAxis] += crossOffset;
	const minPosition = childOffset[crossAxis] - overlaySize[crossSize] + arrowSize + arrowBoundaryOffset;
	const maxPosition = childOffset[crossAxis] + childOffset[crossSize] - arrowSize - arrowBoundaryOffset;
	position[crossAxis] = $240e9101ba2842f5$export$7d15b64cf5a3a4c4(position[crossAxis], minPosition, maxPosition);
	if (placement === axis) {
		let containerHeight = isContainerPositioned ? containerDimensions[size] : containerDimensions[$954926fb6168ae2a$var$TOTAL_SIZE[size]];
		position[$954926fb6168ae2a$var$FLIPPED_DIRECTION[axis]] = Math.floor(containerHeight - childOffset[axis] + offset);
	} else position[axis] = Math.floor(childOffset[axis] + childOffset[size] + offset);
	return position;
}
function $954926fb6168ae2a$var$getMaxHeight(position, boundaryDimensions, containerOffsetWithBoundary, isContainerPositioned, margins, padding, overlayHeight, heightGrowthDirection, containerDimensions, isContainerDescendentOfBoundary, visualViewport) {
	let overlayTop = (position.top != null ? position.top : containerDimensions[$954926fb6168ae2a$var$TOTAL_SIZE.height] - (position.bottom ?? 0) - overlayHeight) - (containerDimensions.scroll.top ?? 0);
	let boundaryToContainerTransformOffset = isContainerDescendentOfBoundary ? containerOffsetWithBoundary.top : 0;
	let boundingRect = {
		top: Math.max(boundaryDimensions.top + boundaryToContainerTransformOffset, (visualViewport?.offsetTop ?? boundaryDimensions.top) + boundaryToContainerTransformOffset),
		bottom: Math.min(boundaryDimensions.top + boundaryDimensions.height + boundaryToContainerTransformOffset, (visualViewport?.offsetTop ?? 0) + (visualViewport?.height ?? 0))
	};
	return heightGrowthDirection !== "top" ? Math.max(0, boundingRect.bottom - overlayTop - ((margins.top ?? 0) + (margins.bottom ?? 0) + padding)) : Math.max(0, overlayTop + overlayHeight - boundingRect.top - ((margins.top ?? 0) + (margins.bottom ?? 0) + padding));
}
function $954926fb6168ae2a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding, placementInfo, containerDimensions, isContainerDescendentOfBoundary) {
	let { placement, axis, size } = placementInfo;
	if (placement === axis) return Math.max(0, childOffset[axis] - (containerDimensions.scroll[axis] ?? 0) - (boundaryDimensions[axis] + (isContainerDescendentOfBoundary ? containerOffsetWithBoundary[axis] : 0)) - (margins[axis] ?? 0) - margins[$954926fb6168ae2a$var$FLIPPED_DIRECTION[axis]] - padding);
	return Math.max(0, boundaryDimensions[size] + boundaryDimensions[axis] + (isContainerDescendentOfBoundary ? containerOffsetWithBoundary[axis] : 0) - childOffset[axis] - childOffset[size] + (containerDimensions.scroll[axis] ?? 0) - (margins[axis] ?? 0) - margins[$954926fb6168ae2a$var$FLIPPED_DIRECTION[axis]] - padding);
}
function $954926fb6168ae2a$export$6839422d1f33cee9(placementInput, childOffset, overlaySize, scrollSize, margins, padding, flip, boundaryDimensions, containerDimensions, containerOffsetWithBoundary, offset, crossOffset, isContainerPositioned, userSetMaxHeight, arrowSize, arrowBoundaryOffset, isContainerDescendentOfBoundary, visualViewport) {
	let placementInfo = $954926fb6168ae2a$var$parsePlacement(placementInput);
	let { size, crossAxis, crossSize, placement, crossPlacement } = placementInfo;
	let position = $954926fb6168ae2a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions);
	let normalizedOffset = offset;
	let space = $954926fb6168ae2a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset, placementInfo, containerDimensions, isContainerDescendentOfBoundary);
	if (flip && overlaySize[size] > space) {
		let flippedPlacementInfo = $954926fb6168ae2a$var$parsePlacement(`${$954926fb6168ae2a$var$FLIPPED_DIRECTION[placement]} ${crossPlacement}`);
		let flippedPosition = $954926fb6168ae2a$var$computePosition(childOffset, boundaryDimensions, overlaySize, flippedPlacementInfo, offset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions);
		if ($954926fb6168ae2a$var$getAvailableSpace(boundaryDimensions, containerOffsetWithBoundary, childOffset, margins, padding + offset, flippedPlacementInfo, containerDimensions, isContainerDescendentOfBoundary) > space) {
			placementInfo = flippedPlacementInfo;
			position = flippedPosition;
			normalizedOffset = offset;
		}
	}
	let heightGrowthDirection = "bottom";
	if (placementInfo.axis === "top") {
		if (placementInfo.placement === "top") heightGrowthDirection = "top";
		else if (placementInfo.placement === "bottom") heightGrowthDirection = "bottom";
	} else if (placementInfo.crossAxis === "top") {
		if (placementInfo.crossPlacement === "top") heightGrowthDirection = "bottom";
		else if (placementInfo.crossPlacement === "bottom") heightGrowthDirection = "top";
	}
	let delta = $954926fb6168ae2a$var$getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary);
	position[crossAxis] += delta;
	let maxHeight = $954926fb6168ae2a$var$getMaxHeight(position, boundaryDimensions, containerOffsetWithBoundary, isContainerPositioned, margins, padding, overlaySize.height, heightGrowthDirection, containerDimensions, isContainerDescendentOfBoundary, visualViewport);
	if (userSetMaxHeight && userSetMaxHeight < maxHeight) maxHeight = userSetMaxHeight;
	overlaySize.height = Math.min(overlaySize.height, maxHeight);
	position = $954926fb6168ae2a$var$computePosition(childOffset, boundaryDimensions, overlaySize, placementInfo, normalizedOffset, crossOffset, containerOffsetWithBoundary, isContainerPositioned, arrowSize, arrowBoundaryOffset, containerDimensions);
	delta = $954926fb6168ae2a$var$getDelta(crossAxis, position[crossAxis], overlaySize[crossSize], boundaryDimensions, containerDimensions, padding, containerOffsetWithBoundary);
	position[crossAxis] += delta;
	let arrowPosition = {};
	let origin = childOffset[crossAxis] - position[crossAxis] - margins[$954926fb6168ae2a$var$AXIS[crossAxis]];
	let preferredArrowPosition = origin + .5 * childOffset[crossSize];
	const arrowMinPosition = arrowSize / 2 + arrowBoundaryOffset;
	const overlayMargin = $954926fb6168ae2a$var$AXIS[crossAxis] === "left" ? (margins.left ?? 0) + (margins.right ?? 0) : (margins.top ?? 0) + (margins.bottom ?? 0);
	const arrowMaxPosition = overlaySize[crossSize] - overlayMargin - arrowSize / 2 - arrowBoundaryOffset;
	arrowPosition[crossAxis] = $240e9101ba2842f5$export$7d15b64cf5a3a4c4($240e9101ba2842f5$export$7d15b64cf5a3a4c4(preferredArrowPosition, childOffset[crossAxis] + arrowSize / 2 - (position[crossAxis] + margins[$954926fb6168ae2a$var$AXIS[crossAxis]]), childOffset[crossAxis] + childOffset[crossSize] - arrowSize / 2 - (position[crossAxis] + margins[$954926fb6168ae2a$var$AXIS[crossAxis]])), arrowMinPosition, arrowMaxPosition);
	({placement: placement, crossPlacement: crossPlacement} = placementInfo);
	if (arrowSize) origin = arrowPosition[crossAxis];
	else if (crossPlacement === "right") origin += childOffset[crossSize];
	else if (crossPlacement === "center") origin += childOffset[crossSize] / 2;
	let crossOrigin = placement === "left" || placement === "top" ? overlaySize[size] : 0;
	let triggerAnchorPoint = {
		x: placement === "top" || placement === "bottom" ? origin : crossOrigin,
		y: placement === "left" || placement === "right" ? origin : crossOrigin
	};
	return {
		position,
		maxHeight,
		arrowOffsetLeft: arrowPosition.left,
		arrowOffsetTop: arrowPosition.top,
		placement,
		triggerAnchorPoint
	};
}
function $954926fb6168ae2a$export$b3ceb0cbf1056d98(opts) {
	let { placement, targetNode, overlayNode, scrollNode, padding, shouldFlip, boundaryElement, offset, crossOffset, maxHeight, arrowSize = 0, arrowBoundaryOffset = 0, targetRect } = opts;
	let visualViewport = $954926fb6168ae2a$var$getVisualViewport();
	let container = overlayNode instanceof HTMLElement ? $954926fb6168ae2a$var$getContainingBlock(overlayNode) : document.documentElement;
	let isViewportContainer = container === document.documentElement;
	const containerPositionStyle = window.getComputedStyle(container).position;
	let isContainerPositioned = !!containerPositionStyle && containerPositionStyle !== "static";
	let childOffset = isViewportContainer ? $954926fb6168ae2a$var$getOffset(targetNode, false, targetRect) : $954926fb6168ae2a$var$getPosition(targetNode, container, false, targetRect);
	if (!isViewportContainer) {
		let { marginTop, marginLeft } = window.getComputedStyle(targetNode);
		childOffset.top += parseInt(marginTop, 10) || 0;
		childOffset.left += parseInt(marginLeft, 10) || 0;
	}
	let overlaySize = $954926fb6168ae2a$var$getOffset(overlayNode, true);
	let margins = $954926fb6168ae2a$var$getMargins(overlayNode);
	overlaySize.width += (margins.left ?? 0) + (margins.right ?? 0);
	overlaySize.height += (margins.top ?? 0) + (margins.bottom ?? 0);
	let scrollSize = $954926fb6168ae2a$var$getScroll(scrollNode);
	let boundaryDimensions = $954926fb6168ae2a$var$getContainerDimensions(boundaryElement, visualViewport);
	let containerDimensions = $954926fb6168ae2a$var$getContainerDimensions(container, visualViewport);
	let containerOffsetWithBoundary;
	if ((boundaryElement.tagName === "BODY" || boundaryElement.tagName === "HTML") && !isViewportContainer) {
		let containerRect = $954926fb6168ae2a$export$4b834cebd9e5cebe(container, false);
		containerOffsetWithBoundary = {
			top: -(containerRect.top - boundaryDimensions.top),
			left: -(containerRect.left - boundaryDimensions.left),
			width: 0,
			height: 0
		};
	} else if ((boundaryElement.tagName === "BODY" || boundaryElement.tagName === "HTML") && isViewportContainer) containerOffsetWithBoundary = {
		top: 0,
		left: 0,
		width: 0,
		height: 0
	};
	else containerOffsetWithBoundary = $954926fb6168ae2a$var$getPosition(boundaryElement, container, false);
	let isContainerDescendentOfBoundary = $23f2114a1b82827e$export$4282f70798064fe0(boundaryElement, container);
	return $954926fb6168ae2a$export$6839422d1f33cee9(placement, childOffset, overlaySize, scrollSize, margins, padding, shouldFlip, boundaryDimensions, containerDimensions, containerOffsetWithBoundary, offset, crossOffset, isContainerPositioned, maxHeight, arrowSize, arrowBoundaryOffset, isContainerDescendentOfBoundary, visualViewport);
}
function $954926fb6168ae2a$export$4b834cebd9e5cebe(node, ignoreScale) {
	let { top, left, width, height } = node.getBoundingClientRect();
	if (ignoreScale && node instanceof node.ownerDocument.defaultView.HTMLElement) {
		width = node.offsetWidth;
		height = node.offsetHeight;
	}
	return {
		top,
		left,
		width,
		height
	};
}
function $954926fb6168ae2a$var$getOffset(node, ignoreScale, overrideRect) {
	let { top, left, width, height } = overrideRect || $954926fb6168ae2a$export$4b834cebd9e5cebe(node, ignoreScale);
	let { scrollTop, scrollLeft, clientTop, clientLeft } = document.documentElement;
	return {
		top: top + scrollTop - clientTop,
		left: left + scrollLeft - clientLeft,
		width,
		height
	};
}
function $954926fb6168ae2a$var$getPosition(node, parent, ignoreScale, overrideRect) {
	let style = window.getComputedStyle(node);
	let offset;
	if (style.position === "fixed") offset = overrideRect || $954926fb6168ae2a$export$4b834cebd9e5cebe(node, ignoreScale);
	else {
		offset = $954926fb6168ae2a$var$getOffset(node, ignoreScale, overrideRect);
		let parentOffset = $954926fb6168ae2a$var$getOffset(parent, ignoreScale);
		let parentStyle = window.getComputedStyle(parent);
		parentOffset.top += (parseInt(parentStyle.borderTopWidth, 10) || 0) - parent.scrollTop;
		parentOffset.left += (parseInt(parentStyle.borderLeftWidth, 10) || 0) - parent.scrollLeft;
		offset.top -= parentOffset.top;
		offset.left -= parentOffset.left;
	}
	offset.top -= parseInt(style.marginTop, 10) || 0;
	offset.left -= parseInt(style.marginLeft, 10) || 0;
	return offset;
}
function $954926fb6168ae2a$var$getContainingBlock(node) {
	let offsetParent = node.offsetParent;
	if (offsetParent && offsetParent === document.body && window.getComputedStyle(offsetParent).position === "static" && !$954926fb6168ae2a$var$isContainingBlock(offsetParent)) offsetParent = document.documentElement;
	if (offsetParent == null) {
		offsetParent = node.parentElement;
		while (offsetParent && !$954926fb6168ae2a$var$isContainingBlock(offsetParent)) offsetParent = offsetParent.parentElement;
	}
	return offsetParent || document.documentElement;
}
function $954926fb6168ae2a$var$isContainingBlock(node) {
	let style = window.getComputedStyle(node);
	return style.transform !== "none" || /transform|perspective/.test(style.willChange) || style.filter !== "none" || style.contain === "paint" || "backdropFilter" in style && style.backdropFilter !== "none" || "WebkitBackdropFilter" in style && style.WebkitBackdropFilter !== "none";
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlayPosition.mjs
var $b3526bc71400be8d$var$visualViewport = typeof document !== "undefined" ? window.visualViewport : null;
function $b3526bc71400be8d$export$d39e1813b3bdd0e1(props) {
	let { direction } = $2eb8e6d23f3d0cb0$export$43bb16f9c6d9e3f7();
	let { arrowSize, targetRef, overlayRef, arrowRef, scrollRef = overlayRef, placement = "bottom", containerPadding = 12, shouldFlip = true, boundaryElement = typeof document !== "undefined" ? document.body : null, offset = 0, crossOffset = 0, shouldUpdatePosition = true, isOpen = true, onClose, maxHeight, arrowBoundaryOffset = 0, getTargetRect } = props;
	let [position, setPosition] = (0, import_react.useState)(null);
	let deps = [
		shouldUpdatePosition,
		placement,
		overlayRef.current,
		targetRef.current,
		arrowRef?.current,
		scrollRef.current,
		containerPadding,
		shouldFlip,
		boundaryElement,
		offset,
		crossOffset,
		isOpen,
		direction,
		maxHeight,
		arrowBoundaryOffset,
		arrowSize
	];
	let lastScale = (0, import_react.useRef)($b3526bc71400be8d$var$visualViewport?.scale);
	(0, import_react.useEffect)(() => {
		if (isOpen) lastScale.current = $b3526bc71400be8d$var$visualViewport?.scale;
	}, [isOpen]);
	let updatePosition = (0, import_react.useCallback)(() => {
		if (shouldUpdatePosition === false || !isOpen || !overlayRef.current || !targetRef.current || !boundaryElement) return;
		if ($b3526bc71400be8d$var$visualViewport?.scale !== lastScale.current) return;
		let anchor = null;
		if (scrollRef.current && $23f2114a1b82827e$export$b4f377a2b6254582(scrollRef.current)) {
			let anchorRect = $23f2114a1b82827e$export$cd4e5573fbe2b576()?.getBoundingClientRect();
			let scrollRect = scrollRef.current.getBoundingClientRect();
			anchor = {
				type: "top",
				offset: (anchorRect?.top ?? 0) - scrollRect.top
			};
			if (anchor.offset > scrollRect.height / 2) {
				anchor.type = "bottom";
				anchor.offset = (anchorRect?.bottom ?? 0) - scrollRect.bottom;
			}
		}
		let overlay = overlayRef.current;
		if (!maxHeight && overlayRef.current) {
			overlay.style.top = "0px";
			overlay.style.bottom = "";
			overlay.style.maxHeight = (window.visualViewport?.height ?? window.innerHeight) + "px";
		}
		let position = $954926fb6168ae2a$export$b3ceb0cbf1056d98({
			placement: $b3526bc71400be8d$var$translateRTL(placement, direction),
			overlayNode: overlayRef.current,
			targetNode: targetRef.current,
			scrollNode: scrollRef.current || overlayRef.current,
			padding: containerPadding,
			shouldFlip,
			boundaryElement,
			offset,
			crossOffset,
			maxHeight,
			arrowSize: arrowSize ?? (arrowRef?.current ? $954926fb6168ae2a$export$4b834cebd9e5cebe(arrowRef.current, true).width : 0),
			arrowBoundaryOffset,
			targetRect: getTargetRect?.(targetRef.current)
		});
		if (!position.position) return;
		overlay.style.top = "";
		overlay.style.bottom = "";
		overlay.style.left = "";
		overlay.style.right = "";
		Object.keys(position.position).forEach((key) => overlay.style[key] = position.position[key] + "px");
		overlay.style.maxHeight = position.maxHeight != null ? position.maxHeight + "px" : "";
		let activeElement = $23f2114a1b82827e$export$cd4e5573fbe2b576();
		if (anchor && activeElement && scrollRef.current) {
			let anchorRect = activeElement.getBoundingClientRect();
			let scrollRect = scrollRef.current.getBoundingClientRect();
			let newOffset = anchorRect[anchor.type] - scrollRect[anchor.type];
			scrollRef.current.scrollTop += newOffset - anchor.offset;
		}
		setPosition(position);
	}, deps);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(updatePosition, deps);
	$b3526bc71400be8d$var$useResize(updatePosition);
	$970072cf4b13fde3$export$683480f191c0e3ea({
		ref: overlayRef,
		onResize: updatePosition
	});
	$970072cf4b13fde3$export$683480f191c0e3ea({
		ref: targetRef,
		onResize: updatePosition
	});
	let isResizing = (0, import_react.useRef)(false);
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		let timeout;
		let onResize = () => {
			isResizing.current = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				isResizing.current = false;
			}, 500);
			updatePosition();
		};
		let onScroll = () => {
			if (isResizing.current) onResize();
		};
		$b3526bc71400be8d$var$visualViewport?.addEventListener("resize", onResize);
		$b3526bc71400be8d$var$visualViewport?.addEventListener("scroll", onScroll);
		return () => {
			$b3526bc71400be8d$var$visualViewport?.removeEventListener("resize", onResize);
			$b3526bc71400be8d$var$visualViewport?.removeEventListener("scroll", onScroll);
		};
	}, [updatePosition]);
	let close = (0, import_react.useCallback)(() => {
		if (!isResizing.current) onClose?.();
	}, [onClose, isResizing]);
	$22e2f5f6490788e8$export$18fc8428861184da({
		triggerRef: targetRef,
		isOpen,
		onClose: onClose && close
	});
	return {
		overlayProps: { style: {
			position: position ? "absolute" : "fixed",
			top: !position ? 0 : void 0,
			left: !position ? 0 : void 0,
			zIndex: 1e5,
			...position?.position,
			maxHeight: position?.maxHeight ?? "100vh"
		} },
		placement: position?.placement ?? null,
		triggerAnchorPoint: position?.triggerAnchorPoint ?? null,
		arrowProps: {
			"aria-hidden": "true",
			role: "presentation",
			style: {
				left: position?.arrowOffsetLeft,
				top: position?.arrowOffsetTop
			}
		},
		updatePosition
	};
}
function $b3526bc71400be8d$var$useResize(onResize) {
	$c4867b2f328c2698$export$e5c5a5f917a5871c(() => {
		window.addEventListener("resize", onResize, false);
		return () => {
			window.removeEventListener("resize", onResize, false);
		};
	}, [onResize]);
}
function $b3526bc71400be8d$var$translateRTL(position, direction) {
	if (direction === "rtl") return position.replace("start", "right").replace("end", "left");
	return position.replace("start", "left").replace("end", "right");
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/usePopover.mjs
function $f8a024fbad3a5a2e$export$542a6fd13ac93354(props, state) {
	let { triggerRef, popoverRef, groupRef, isNonModal, isKeyboardDismissDisabled, shouldCloseOnInteractOutside, ...otherProps } = props;
	let isSubmenu = otherProps["trigger"] === "SubmenuTrigger";
	let { overlayProps, underlayProps } = $77844860df94ba23$export$ea8f71083e90600f({
		isOpen: state.isOpen,
		onClose: state.close,
		shouldCloseOnBlur: true,
		isDismissable: !isNonModal || isSubmenu,
		isKeyboardDismissDisabled,
		shouldCloseOnInteractOutside
	}, groupRef ?? popoverRef);
	let { overlayProps: positionProps, arrowProps, placement, triggerAnchorPoint: origin } = $b3526bc71400be8d$export$d39e1813b3bdd0e1({
		...otherProps,
		targetRef: triggerRef,
		overlayRef: popoverRef,
		isOpen: state.isOpen,
		onClose: isNonModal && !isSubmenu ? state.close : null
	});
	$0644e3663365bfe5$export$ee0f7cc6afcd1c18({ isDisabled: isNonModal || !state.isOpen });
	(0, import_react.useEffect)(() => {
		if (state.isOpen && popoverRef.current) {
			if (isNonModal) return $58196c8d6a1f38fc$export$1020fa7f77e17884(groupRef?.current ?? popoverRef.current);
			else return $58196c8d6a1f38fc$export$1c3ebcada18427bf([groupRef?.current ?? popoverRef.current], { shouldUseInert: true });
		}
	}, [
		isNonModal,
		state.isOpen,
		popoverRef,
		groupRef
	]);
	return {
		popoverProps: $bbaa08b3cd72f041$export$9d1611c77c2fe928(overlayProps, positionProps),
		arrowProps,
		underlayProps,
		placement,
		triggerAnchorPoint: origin
	};
}
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-overlays.js
/**
* A low-level utility component that covers the underlying interface while an
* overlay component is open.
*/
function Blanket(props) {
	const $ = c(18);
	let otherProps;
	let isTransparent;
	let isOpen;
	if ($[0] !== props) {
		({isOpen, isTransparent, ...otherProps} = props);
		$[0] = props;
		$[1] = otherProps;
		$[2] = isTransparent;
		$[3] = isOpen;
	} else {
		otherProps = $[1];
		isTransparent = $[2];
		isOpen = $[3];
	}
	const styleProps = useStyleProps(otherProps);
	let t0;
	if ($[4] !== otherProps) {
		t0 = filterStyleProps(otherProps);
		$[4] = otherProps;
		$[5] = t0;
	} else t0 = $[5];
	const t1 = isTransparent ? "transparent" : "translucent";
	const t2 = isOpen || void 0;
	let t3;
	if ($[6] !== t1 || $[7] !== t2) {
		t3 = toDataAttributes({
			fill: t1,
			open: t2
		});
		$[6] = t1;
		$[7] = t2;
		$[8] = t3;
	} else t3 = $[8];
	let t4;
	if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
		t4 = transition("opacity", {
			easing: "easeOut",
			duration: "regular",
			delay: "short"
		});
		$[9] = t4;
	} else t4 = $[9];
	let t5;
	if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = [t4, transition("visibility", {
			delay: "regular",
			duration: 0,
			easing: "linear"
		})];
		$[10] = t5;
	} else t5 = $[10];
	let t6;
	if ($[11] !== styleProps.className) {
		t6 = classNames(css({
			inset: 0,
			opacity: 0,
			overflow: "hidden",
			pointerEvents: "none",
			position: "fixed",
			visibility: "hidden",
			zIndex: 1,
			"&[data-fill=\"translucent\"]": {
				backgroundColor: "#0006",
				transition: t5.join(", ")
			},
			"&[data-open=\"true\"]": {
				opacity: 1,
				pointerEvents: "auto",
				visibility: "visible",
				transition: transition("opacity", { easing: "easeIn" })
			}
		}), styleProps.className);
		$[11] = styleProps.className;
		$[12] = t6;
	} else t6 = $[12];
	let t7;
	if ($[13] !== t0 || $[14] !== t3 || $[15] !== styleProps || $[16] !== t6) {
		t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...t0,
			...t3,
			...styleProps,
			className: t6
		});
		$[13] = t0;
		$[14] = t3;
		$[15] = styleProps;
		$[16] = t6;
		$[17] = t7;
	} else t7 = $[17];
	return t7;
}
function DirectionIndicator(t0) {
	const $ = c(25);
	let fill;
	let placement;
	let size;
	let props;
	let stroke;
	if ($[0] !== t0) {
		({fill, placement, size, stroke, ...props} = t0);
		$[0] = t0;
		$[1] = fill;
		$[2] = placement;
		$[3] = size;
		$[4] = props;
		$[5] = stroke;
	} else {
		fill = $[1];
		placement = $[2];
		size = $[3];
		props = $[4];
		stroke = $[5];
	}
	let t1;
	if ($[6] !== fill || $[7] !== placement || $[8] !== size) {
		t1 = toDataAttributes({
			fill,
			placement,
			size
		});
		$[6] = fill;
		$[7] = placement;
		$[8] = size;
		$[9] = t1;
	} else t1 = $[9];
	let t2;
	if ($[10] !== props.className) {
		t2 = classNames(css({
			height: "var(--size)",
			position: "absolute",
			width: "var(--size)",
			"&[data-fill=\"surface\"]": { fill: tokenSchema.color.background.surface },
			"&[data-fill=\"inverse\"]": { fill: tokenSchema.color.background.inverse },
			"&[data-fill=\"accent\"]": { fill: tokenSchema.color.background.accentEmphasis },
			"&[data-fill=\"critical\"]": { fill: tokenSchema.color.background.criticalEmphasis },
			"&[data-fill=\"positive\"]": { fill: tokenSchema.color.background.positiveEmphasis },
			"&[data-size=\"xsmall\"]": { "--size": tokenSchema.size.element.xsmall },
			"&[data-size=\"small\"]": { "--size": tokenSchema.size.element.small },
			"&[data-size=\"regular\"]": { "--size": tokenSchema.size.element.regular },
			"&[data-placement=\"top\"], &[data-placement=\"bottom\"]": {
				left: "50%",
				transform: "translateX(-50%)"
			},
			"&[data-placement=\"top\"]": { top: "100%" },
			"&[data-placement=\"bottom\"]": { bottom: "100%" },
			"&[data-placement=\"left\"], &[data-placement=\"right\"], &[data-placement=\"start\"], &[data-placement=\"end\"]": {
				top: "50%",
				transform: "translateY(-50%)"
			},
			"&[data-placement=\"left\"]": { left: "100%" },
			"&[data-placement=\"right\"]": { right: "100%" },
			"&[data-placement=\"start\"]": { insetInlineStart: "100%" },
			"&[data-placement=\"end\"]": { insetInlineEnd: "100%" }
		}), props.className);
		$[10] = props.className;
		$[11] = t2;
	} else t2 = $[11];
	let t3;
	if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
		t3 = css({
			"&[data-placement=\"top\"]": { transform: "rotate(180deg)" },
			"&[data-placement=\"left\"], [dir=ltr] &[data-placement=\"start\"], [dir=rtl] &[data-placement=\"end\"]": { transform: "rotate(90deg)" },
			"&[data-placement=\"right\"], [dir=ltr] &[data-placement=\"end\"], [dir=rtl] &[data-placement=\"start\"]": { transform: "rotate(270deg)" }
		});
		$[12] = t3;
	} else t3 = $[12];
	let t4;
	if ($[13] !== stroke) {
		t4 = stroke && /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", {
			fill: stroke,
			d: "M23.7,27.1L17,19.9C16.5,19.3,15.8,19,15,19s-1.6,0.3-2.1,0.9l-6.6,7.2C5.3,28.1,3.4,29,2,29h26 C26.7,29,24.6,28.1,23.7,27.1z"
		});
		$[13] = stroke;
		$[14] = t4;
	} else t4 = $[14];
	let t5;
	if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("path", { d: "M23,27.8c1.1,1.2,3.4,2.2,5,2.2h2H0h2c1.7,0,3.9-1,5-2.2l6.6-7.2c0.7-0.8,2-0.8,2.7,0L23,27.8L23,27.8z" });
		$[15] = t5;
	} else t5 = $[15];
	let t6;
	if ($[16] !== placement || $[17] !== t4) {
		t6 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("svg", {
			"data-placement": placement,
			viewBox: "0 0 30 30",
			className: t3,
			children: [t4, t5]
		});
		$[16] = placement;
		$[17] = t4;
		$[18] = t6;
	} else t6 = $[18];
	let t7;
	if ($[19] !== props || $[20] !== t1 || $[21] !== placement || $[22] !== t2 || $[23] !== t6) {
		t7 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("span", {
			...props,
			...t1,
			"data-placement": placement,
			className: t2,
			children: t6
		});
		$[19] = props;
		$[20] = t1;
		$[21] = placement;
		$[22] = t2;
		$[23] = t6;
		$[24] = t7;
	} else t7 = $[24];
	return t7;
}
var forceReflow = (node) => node.scrollTop;
/**
* A low-level utility component for implementing transitions, which
* safely unmount children _after_ their animation has completed.
*/
var Transition = function Transition(props) {
	const $ = c(3);
	const { isOpen } = useTransition(props);
	if (!isOpen) return null;
	let t0;
	if ($[0] !== props || $[1] !== isOpen) {
		var _cloneValidElement;
		t0 = (_cloneValidElement = cloneValidElement(props.children, { isOpen: isOpen === "mounting" ? false : props.isOpen })) !== null && _cloneValidElement !== void 0 ? _cloneValidElement : props.children;
		$[0] = props;
		$[1] = isOpen;
		$[2] = t0;
	} else t0 = $[2];
	return t0;
};
function useTransition(props) {
	const $ = c(22);
	const { isOpen: isOpenProp, nodeRef, onEnter, onEntered, onEntering, onExit, onExited, onExiting } = props;
	const [isOpen, setIsOpen] = (0, import_react.useState)(isOpenProp ? "mounting" : false);
	if (isOpenProp && !isOpen) setIsOpen("mounting");
	const hasCalledCompletedCallback = (0, import_react.useRef)(false);
	let t0;
	if ($[0] !== isOpenProp || $[1] !== isOpen || $[2] !== onEntered || $[3] !== onExited || $[4] !== onEnter || $[5] !== nodeRef.current || $[6] !== onEntering || $[7] !== onExit || $[8] !== onExiting) {
		t0 = () => {
			if (!hasCalledCompletedCallback.current && isOpenProp === isOpen) {
				hasCalledCompletedCallback.current = true;
				if (isOpenProp) onEntered === null || onEntered === void 0 || onEntered();
				else onExited === null || onExited === void 0 || onExited();
			}
			if (isOpenProp === isOpen) return;
			hasCalledCompletedCallback.current = false;
			if (isOpenProp) {
				onEnter === null || onEnter === void 0 || onEnter();
				if (nodeRef.current) forceReflow(nodeRef.current);
				setIsOpen(true);
				onEntering === null || onEntering === void 0 || onEntering();
			} else {
				onExit === null || onExit === void 0 || onExit();
				onExiting === null || onExiting === void 0 || onExiting();
				const id = setTimeout(() => {
					setIsOpen(false);
				}, 320);
				return () => clearTimeout(id);
			}
		};
		$[0] = isOpenProp;
		$[1] = isOpen;
		$[2] = onEntered;
		$[3] = onExited;
		$[4] = onEnter;
		$[5] = nodeRef.current;
		$[6] = onEntering;
		$[7] = onExit;
		$[8] = onExiting;
		$[9] = t0;
	} else t0 = $[9];
	let t1;
	if ($[10] !== isOpenProp || $[11] !== isOpen || $[12] !== nodeRef || $[13] !== onEnter || $[14] !== onEntering || $[15] !== onExit || $[16] !== onExiting || $[17] !== onEntered || $[18] !== onExited) {
		t1 = [
			isOpenProp,
			isOpen,
			nodeRef,
			onEnter,
			onEntering,
			onExit,
			onExiting,
			onEntered,
			onExited
		];
		$[10] = isOpenProp;
		$[11] = isOpen;
		$[12] = nodeRef;
		$[13] = onEnter;
		$[14] = onEntering;
		$[15] = onExit;
		$[16] = onExiting;
		$[17] = onEntered;
		$[18] = onExited;
		$[19] = t1;
	} else t1 = $[19];
	(0, import_react.useLayoutEffect)(t0, t1);
	let t2;
	if ($[20] !== isOpen) {
		t2 = {
			isOpen,
			setIsOpen
		};
		$[20] = isOpen;
		$[21] = t2;
	} else t2 = $[21];
	return t2;
}
/** * Utility component for implementing overlay transitions. */
var Overlay = /*#__PURE__*/ (0, import_react.forwardRef)(function Overlay(props, forwardedRef) {
	const $ = c(10);
	const { isOpen } = useTransition(props);
	if (!isOpen) return null;
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = {
			background: "transparent",
			isolation: "isolate"
		};
		$[0] = t0;
	} else t0 = $[0];
	let t1;
	if ($[1] !== props || $[2] !== isOpen) {
		var _cloneValidElement;
		t1 = (_cloneValidElement = cloneValidElement(props.children, { isOpen: isOpen === "mounting" ? false : props.isOpen })) !== null && _cloneValidElement !== void 0 ? _cloneValidElement : props.children;
		$[1] = props;
		$[2] = isOpen;
		$[3] = t1;
	} else t1 = $[3];
	let t2;
	if ($[4] !== forwardedRef || $[5] !== t1) {
		t2 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(KeystarProvider, {
			ref: forwardedRef,
			UNSAFE_style: t0,
			isDisabled: false,
			children: t1
		});
		$[4] = forwardedRef;
		$[5] = t1;
		$[6] = t2;
	} else t2 = $[6];
	let t3;
	if ($[7] !== props.container || $[8] !== t2) {
		t3 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)($d7a937236970dc7f$export$c6fdb837b070b4ff, {
			portalContainer: props.container,
			children: t2
		});
		$[7] = props.container;
		$[8] = t2;
		$[9] = t3;
	} else t3 = $[9];
	return t3;
});
/**
* A low-level utility component for implementing things like dialogs and
* popovers, in a layer above the page.
*/
var Modal = /*#__PURE__*/ (0, import_react.forwardRef)(function Modal(props, forwardedRef) {
	const $ = c(14);
	let children;
	let otherProps;
	let state;
	if ($[0] !== props) {
		({children, state, ...otherProps} = props);
		$[0] = props;
		$[1] = children;
		$[2] = otherProps;
		$[3] = state;
	} else {
		children = $[1];
		otherProps = $[2];
		state = $[3];
	}
	const wrapperRef = (0, import_react.useRef)(null);
	let t0;
	if ($[4] !== forwardedRef || $[5] !== props || $[6] !== wrapperRef || $[7] !== children) {
		t0 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(ModalWrapper, {
			ref: forwardedRef,
			...props,
			wrapperRef,
			children
		});
		$[4] = forwardedRef;
		$[5] = props;
		$[6] = wrapperRef;
		$[7] = children;
		$[8] = t0;
	} else t0 = $[8];
	let t1;
	if ($[9] !== otherProps || $[10] !== state.isOpen || $[11] !== wrapperRef || $[12] !== t0) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Overlay, {
			...otherProps,
			isOpen: state.isOpen,
			nodeRef: wrapperRef,
			children: t0
		});
		$[9] = otherProps;
		$[10] = state.isOpen;
		$[11] = wrapperRef;
		$[12] = t0;
		$[13] = t1;
	} else t1 = $[13];
	return t1;
});
var MAX_HEIGHT_VAR = `--kui-visual-viewport-height`;
var ModalWrapper = /*#__PURE__*/ (0, import_react.forwardRef)(function ModalWrapper(props, forwardedRef) {
	const $ = c(27);
	const { type, children, state, isOpen, wrapperRef } = props;
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const { modalProps, underlayProps } = $5698867baeb53f4e$export$dbc0f175b25fb0fb(props, state, domRef);
	const styleProps = useStyleProps(props);
	const viewport = $6066a2c586ade9e1$export$d699905dd57c73ca();
	let t0;
	if ($[0] !== underlayProps || $[1] !== isOpen) {
		t0 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Blanket, {
			...underlayProps,
			isOpen
		});
		$[0] = underlayProps;
		$[1] = isOpen;
		$[2] = t0;
	} else t0 = $[2];
	let t1;
	if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = css({
			alignItems: "center",
			boxSizing: "border-box",
			display: "flex",
			insetBlockStart: 0,
			insetInlineStart: 0,
			justifyContent: "center",
			pointerEvents: "none",
			position: "fixed",
			width: "100vw",
			zIndex: 2
		});
		$[3] = t1;
	} else t1 = $[3];
	const t2 = `${viewport.height}px`;
	let t3;
	if ($[4] !== t2) {
		t3 = {
			[MAX_HEIGHT_VAR]: t2,
			height: `var(${MAX_HEIGHT_VAR})`
		};
		$[4] = t2;
		$[5] = t3;
	} else t3 = $[5];
	let t4;
	if ($[6] !== isOpen || $[7] !== type) {
		t4 = toDataAttributes({
			open: isOpen,
			type
		});
		$[6] = isOpen;
		$[7] = type;
		$[8] = t4;
	} else t4 = $[8];
	let t5;
	if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
		t5 = transition("opacity", { easing: "easeIn" });
		$[9] = t5;
	} else t5 = $[9];
	let t6;
	if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
		t6 = [t5, transition("transform", {
			delay: "short",
			duration: 0,
			easing: "linear"
		})];
		$[10] = t6;
	} else t6 = $[10];
	let t7;
	if ($[11] !== styleProps.className) {
		t7 = classNames(styleProps.className, css({
			backgroundColor: tokenSchema.color.background.surface,
			borderRadius: tokenSchema.size.radius.large,
			boxShadow: `${tokenSchema.size.shadow.large} ${tokenSchema.color.shadow.emphasis}`,
			maxHeight: `calc(var(${MAX_HEIGHT_VAR}) * 0.9)`,
			maxWidth: "90vw",
			opacity: 0,
			outline: 0,
			pointerEvents: "auto",
			transform: `translateY(${tokenSchema.size.space.large})`,
			zIndex: 2,
			transition: t6.join(", "),
			"&[data-type=\"fullscreen\"]": {
				position: "fixed",
				inset: tokenSchema.size.space.xxlarge,
				maxWidth: "none",
				maxHeight: "none",
				width: `calc(100% - calc(2 * ${tokenSchema.size.space.xxlarge}))`,
				height: `calc(100% - calc(2 * ${tokenSchema.size.space.xxlarge}))`
			},
			"&[data-open=\"true\"]": {
				opacity: 1,
				transform: `translateY(0)`,
				transition: transition(["opacity", "transform"], { easing: "easeOut" })
			}
		}));
		$[11] = styleProps.className;
		$[12] = t7;
	} else t7 = $[12];
	let t8;
	if ($[13] !== modalProps || $[14] !== t4 || $[15] !== styleProps || $[16] !== domRef || $[17] !== t7 || $[18] !== children) {
		t8 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			...modalProps,
			...t4,
			...styleProps,
			ref: domRef,
			className: t7,
			children
		});
		$[13] = modalProps;
		$[14] = t4;
		$[15] = styleProps;
		$[16] = domRef;
		$[17] = t7;
		$[18] = children;
		$[19] = t8;
	} else t8 = $[19];
	let t9;
	if ($[20] !== t3 || $[21] !== t8) {
		t9 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			className: t1,
			style: t3,
			children: t8
		});
		$[20] = t3;
		$[21] = t8;
		$[22] = t9;
	} else t9 = $[22];
	let t10;
	if ($[23] !== wrapperRef || $[24] !== t0 || $[25] !== t9) {
		t10 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			ref: wrapperRef,
			children: [t0, t9]
		});
		$[23] = wrapperRef;
		$[24] = t0;
		$[25] = t9;
		$[26] = t10;
	} else t10 = $[26];
	return t10;
});
/**
* A low-level utility component for implementing things like info dialogs,
* menus and pickers.
*/
var Popover = /*#__PURE__*/ (0, import_react.forwardRef)(function Popover(props, forwardedRef) {
	const $ = c(14);
	let children;
	let otherProps;
	let state;
	if ($[0] !== props) {
		({children, state, ...otherProps} = props);
		$[0] = props;
		$[1] = children;
		$[2] = otherProps;
		$[3] = state;
	} else {
		children = $[1];
		otherProps = $[2];
		state = $[3];
	}
	const wrapperRef = (0, import_react.useRef)(null);
	let t0;
	if ($[4] !== forwardedRef || $[5] !== props || $[6] !== wrapperRef || $[7] !== children) {
		t0 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(PopoverWrapper, {
			ref: forwardedRef,
			...props,
			wrapperRef,
			children
		});
		$[4] = forwardedRef;
		$[5] = props;
		$[6] = wrapperRef;
		$[7] = children;
		$[8] = t0;
	} else t0 = $[8];
	let t1;
	if ($[9] !== otherProps || $[10] !== state.isOpen || $[11] !== wrapperRef || $[12] !== t0) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Overlay, {
			...otherProps,
			isOpen: state.isOpen,
			nodeRef: wrapperRef,
			children: t0
		});
		$[9] = otherProps;
		$[10] = state.isOpen;
		$[11] = wrapperRef;
		$[12] = t0;
		$[13] = t1;
	} else t1 = $[13];
	return t1;
});
var PopoverWrapper = /*#__PURE__*/ (0, import_react.forwardRef)(function PopoverWrapper(props, forwardedRef) {
	var _popoverProps$style, _popoverProps$style2;
	const $ = c(45);
	let ariaProps;
	let isNonModal;
	let state;
	let isOpen;
	let hideArrow;
	let children;
	let wrapperRef;
	if ($[0] !== props) {
		const { children: t0, isOpen: t1, hideArrow: t2, isNonModal: t3, state: t4, wrapperRef: t5, maxHeight: _maxHeight, ...t6 } = props;
		children = t0;
		isOpen = t1;
		hideArrow = t2;
		isNonModal = t3;
		state = t4;
		wrapperRef = t5;
		ariaProps = t6;
		$[0] = props;
		$[1] = ariaProps;
		$[2] = isNonModal;
		$[3] = state;
		$[4] = isOpen;
		$[5] = hideArrow;
		$[6] = children;
		$[7] = wrapperRef;
	} else {
		ariaProps = $[1];
		isNonModal = $[2];
		state = $[3];
		isOpen = $[4];
		hideArrow = $[5];
		children = $[6];
		wrapperRef = $[7];
	}
	const popoverRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let t0;
	if ($[8] !== ariaProps || $[9] !== isNonModal || $[10] !== popoverRef) {
		t0 = {
			...ariaProps,
			isNonModal,
			containerPadding: 8,
			popoverRef
		};
		$[8] = ariaProps;
		$[9] = isNonModal;
		$[10] = popoverRef;
		$[11] = t0;
	} else t0 = $[11];
	const { popoverProps, arrowProps, underlayProps, placement } = $f8a024fbad3a5a2e$export$542a6fd13ac93354(t0, state);
	const t1 = placement;
	let t2;
	if ($[12] !== props || $[13] !== t1) {
		t2 = {
			...props,
			placement: t1
		};
		$[12] = props;
		$[13] = t1;
		$[14] = t2;
	} else t2 = $[14];
	const styleProps = usePopoverStyles(t2);
	let t3;
	if ($[15] !== isNonModal || $[16] !== underlayProps || $[17] !== isOpen) {
		t3 = !isNonModal && /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Blanket, {
			isTransparent: true,
			...underlayProps,
			isOpen
		});
		$[15] = isNonModal;
		$[16] = underlayProps;
		$[17] = isOpen;
		$[18] = t3;
	} else t3 = $[18];
	const t4 = typeof ((_popoverProps$style = popoverProps.style) === null || _popoverProps$style === void 0 ? void 0 : _popoverProps$style.maxHeight) === "number" ? `${popoverProps.style.maxHeight}px` : (_popoverProps$style2 = popoverProps.style) === null || _popoverProps$style2 === void 0 ? void 0 : _popoverProps$style2.maxHeight;
	let t5;
	if ($[19] !== styleProps.style || $[20] !== popoverProps.style || $[21] !== t4) {
		t5 = {
			...styleProps.style,
			...popoverProps.style,
			"--popover-max-height": t4
		};
		$[19] = styleProps.style;
		$[20] = popoverProps.style;
		$[21] = t4;
		$[22] = t5;
	} else t5 = $[22];
	const t6 = t5;
	let t7;
	if ($[23] !== isNonModal || $[24] !== state) {
		t7 = !isNonModal && /*#__PURE__*/ (0, import_jsx_runtime.jsx)($081058010ef8962e$export$2317d149ed6f78c4, { onDismiss: state.close });
		$[23] = isNonModal;
		$[24] = state;
		$[25] = t7;
	} else t7 = $[25];
	let t8;
	if ($[26] !== hideArrow || $[27] !== placement || $[28] !== arrowProps) {
		t8 = hideArrow ? null : /*#__PURE__*/ (0, import_jsx_runtime.jsx)(DirectionIndicator, {
			...arrowProps,
			fill: "surface",
			stroke: tokenSchema.color.border.emphasis,
			placement,
			size: "regular"
		});
		$[26] = hideArrow;
		$[27] = placement;
		$[28] = arrowProps;
		$[29] = t8;
	} else t8 = $[29];
	let t9;
	if ($[30] !== state.close) {
		t9 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)($081058010ef8962e$export$2317d149ed6f78c4, { onDismiss: state.close });
		$[30] = state.close;
		$[31] = t9;
	} else t9 = $[31];
	let t10;
	if ($[32] !== styleProps || $[33] !== popoverProps || $[34] !== t6 || $[35] !== popoverRef || $[36] !== t7 || $[37] !== t8 || $[38] !== children || $[39] !== t9) {
		t10 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			...styleProps,
			...popoverProps,
			style: t6,
			ref: popoverRef,
			role: "presentation",
			children: [
				t7,
				t8,
				children,
				t9
			]
		});
		$[32] = styleProps;
		$[33] = popoverProps;
		$[34] = t6;
		$[35] = popoverRef;
		$[36] = t7;
		$[37] = t8;
		$[38] = children;
		$[39] = t9;
		$[40] = t10;
	} else t10 = $[40];
	let t11;
	if ($[41] !== wrapperRef || $[42] !== t3 || $[43] !== t10) {
		t11 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			ref: wrapperRef,
			children: [t3, t10]
		});
		$[41] = wrapperRef;
		$[42] = t3;
		$[43] = t10;
		$[44] = t11;
	} else t11 = $[44];
	return t11;
});
function usePopoverStyles(props) {
	const $ = c(19);
	const { hideArrow, isOpen, placement } = props;
	const consumerStyleProps = useStyleProps(props);
	let t0;
	if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
		t0 = transition("opacity", { easing: "easeIn" });
		$[0] = t0;
	} else t0 = $[0];
	let t1;
	if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
		t1 = [t0, transition("transform", {
			delay: "short",
			duration: 0,
			easing: "linear"
		})];
		$[1] = t1;
	} else t1 = $[1];
	let t2;
	let t3;
	if ($[2] !== hideArrow || $[3] !== isOpen || $[4] !== placement || $[5] !== consumerStyleProps.className) {
		const popoverStyles = css({
			backgroundColor: tokenSchema.color.background.surface,
			borderRadius: tokenSchema.size.radius.medium,
			border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.border.emphasis}`,
			boxSizing: "content-box",
			opacity: 0,
			outline: 0,
			pointerEvents: "auto",
			position: "absolute",
			filter: `drop-shadow(0 1px 4px ${tokenSchema.color.shadow.regular})`,
			willChange: "filter, transform",
			transition: t1.join(", "),
			"&[data-placement=top]": { marginTop: tokenSchema.size.space.regular },
			"&[data-placement=bottom]": { marginBottom: tokenSchema.size.space.regular },
			"&[data-placement=left]": { marginLeft: tokenSchema.size.space.regular },
			"&[data-placement=right]": { marginRight: tokenSchema.size.space.regular },
			"&[data-open]": {
				opacity: 1,
				transition: transition(["opacity", "transform"], { easing: "easeOut" })
			},
			"&[data-placement=top][data-open]": { transform: `translateY(calc(var(--popover-offset) * -1))` },
			"&[data-placement=bottom][data-open]": { transform: `translateY(var(--popover-offset))` },
			"&[data-placement=left][data-open]": { transform: `translateX(calc(var(--popover-offset) * -1))` },
			"&[data-placement=right][data-open]": { transform: `translateX(var(--popover-offset))` }
		});
		const t4 = !hideArrow || void 0;
		const t5 = isOpen || void 0;
		if ($[8] !== t4 || $[9] !== placement || $[10] !== t5) {
			t2 = toDataAttributes({
				arrow: t4,
				placement,
				open: t5
			});
			$[8] = t4;
			$[9] = placement;
			$[10] = t5;
			$[11] = t2;
		} else t2 = $[11];
		t3 = classNames(popoverStyles, consumerStyleProps.className);
		$[2] = hideArrow;
		$[3] = isOpen;
		$[4] = placement;
		$[5] = consumerStyleProps.className;
		$[6] = t2;
		$[7] = t3;
	} else {
		t2 = $[6];
		t3 = $[7];
	}
	const t4 = hideArrow ? tokenSchema.size.space.regular : tokenSchema.size.space.large;
	let t5;
	if ($[12] !== t4 || $[13] !== consumerStyleProps.style) {
		t5 = {
			"--popover-offset": t4,
			...consumerStyleProps.style
		};
		$[12] = t4;
		$[13] = consumerStyleProps.style;
		$[14] = t5;
	} else t5 = $[14];
	let t6;
	if ($[15] !== t2 || $[16] !== t3 || $[17] !== t5) {
		t6 = {
			...t2,
			className: t3,
			style: t5
		};
		$[15] = t2;
		$[16] = t3;
		$[17] = t5;
		$[18] = t6;
	} else t6 = $[18];
	return t6;
}
/**
* A low-level utility component for implementing things like info dialogs,
* menus and pickers. They should only ever be displayed on devices with small
* screens, for interfaces where popovers wouldn't be appropriate.
*/
var Tray = /*#__PURE__*/ (0, import_react.forwardRef)(function Tray(props, forwardedRef) {
	const $ = c(14);
	let children;
	let otherProps;
	let state;
	if ($[0] !== props) {
		({children, state, ...otherProps} = props);
		$[0] = props;
		$[1] = children;
		$[2] = otherProps;
		$[3] = state;
	} else {
		children = $[1];
		otherProps = $[2];
		state = $[3];
	}
	const wrapperRef = (0, import_react.useRef)(null);
	let t0;
	if ($[4] !== forwardedRef || $[5] !== props || $[6] !== wrapperRef || $[7] !== children) {
		t0 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TrayWrapper, {
			ref: forwardedRef,
			...props,
			wrapperRef,
			children
		});
		$[4] = forwardedRef;
		$[5] = props;
		$[6] = wrapperRef;
		$[7] = children;
		$[8] = t0;
	} else t0 = $[8];
	let t1;
	if ($[9] !== otherProps || $[10] !== state.isOpen || $[11] !== wrapperRef || $[12] !== t0) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(Overlay, {
			...otherProps,
			isOpen: state.isOpen,
			nodeRef: wrapperRef,
			children: t0
		});
		$[9] = otherProps;
		$[10] = state.isOpen;
		$[11] = wrapperRef;
		$[12] = t0;
		$[13] = t1;
	} else t1 = $[13];
	return t1;
});
var TrayWrapper = /*#__PURE__*/ (0, import_react.forwardRef)(function TrayWrapper(props, forwardedRef) {
	let { children, state, isFixedHeight, isOpen, wrapperRef } = props;
	let domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let { modalProps, underlayProps } = $5698867baeb53f4e$export$dbc0f175b25fb0fb({
		...props,
		isDismissable: true
	}, state, domRef);
	let styleProps = useStyleProps(props);
	let viewport = $6066a2c586ade9e1$export$d699905dd57c73ca();
	return /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapperRef,
		children: [/*#__PURE__*/ (0, import_jsx_runtime.jsx)(Blanket, {
			...underlayProps,
			isOpen
		}), /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
			className: css({
				boxSizing: "border-box",
				display: "flex",
				insetBlockStart: 0,
				insetInlineStart: 0,
				justifyContent: "center",
				pointerEvents: "none",
				position: "fixed",
				height: "100vh",
				width: "100%",
				zIndex: 2
			}),
			style: { height: viewport.height },
			children: /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
				...modalProps,
				...toDataAttributes({
					open: isOpen,
					fillScreen: isFixedHeight || void 0
				}),
				ref: domRef,
				style: Object.assign({}, isFixedHeight ? {
					height: `calc(${viewport.height}px - ${tokenSchema.size.space.xxlarge})`,
					top: tokenSchema.size.space.xxlarge
				} : {}, {
					maxHeight: `calc(${viewport.height}px - ${tokenSchema.size.space.xxlarge})`,
					paddingBottom: `max(calc(100vh - ${viewport.height}px), env(safe-area-inset-bottom))`
				}, styleProps.style),
				className: classNames(styleProps.className, css({
					backgroundColor: tokenSchema.color.background.surface,
					bottom: 0,
					maxWidth: "100vw",
					opacity: 0,
					outline: 0,
					pointerEvents: "auto",
					position: "absolute",
					transform: "translateY(100%)",
					width: "100%",
					zIndex: 2,
					[breakpointQueries$1.above.mobile]: {
						borderStartStartRadius: tokenSchema.size.radius.medium,
						borderStartEndRadius: tokenSchema.size.radius.medium,
						maxWidth: breakpoints.tablet
					},
					transition: transition(["opacity", "transform"], { easing: "easeIn" }),
					"&[data-open=\"true\"]": {
						opacity: 1,
						transform: `translateY(0)`,
						transition: transition(["opacity", "transform"], {
							easing: "easeOut",
							delay: "short"
						})
					}
				})),
				children
			})
		})]
	});
});
//#endregion
//#region node_modules/@keystar/ui/dist/keystar-ui-text-field.js
/** Internal component for default appearance and behaviour. */
var TextFieldPrimitive = /*#__PURE__*/ (0, import_react.forwardRef)(function TextFieldPrimitive(props, forwardedRef) {
	var _inputProps;
	const $ = c(66);
	let t0;
	let isDisabled;
	let inputWrapperProps;
	let inputProps;
	let autoFocus;
	let startElement;
	let endElement;
	let isRequired;
	let description;
	let descriptionProps;
	let errorMessage;
	let errorMessageProps;
	let label;
	let labelProps;
	let otherProps;
	if ($[0] !== props) {
		const { autoFocus: t1, description: t2, descriptionProps: t3, endElement: t4, errorMessage: t5, errorMessageProps: t6, id, inputProps: t7, inputWrapperProps: t8, isDisabled: t9, isMultiline: t10, isRequired: t11, label: t12, labelProps: t13, startElement: t14, ...t15 } = props;
		autoFocus = t1;
		description = t2;
		descriptionProps = t3;
		endElement = t4;
		errorMessage = t5;
		errorMessageProps = t6;
		inputProps = t7;
		inputWrapperProps = t8;
		isDisabled = t9;
		t0 = t10;
		isRequired = t11;
		label = t12;
		labelProps = t13;
		startElement = t14;
		otherProps = t15;
		$[0] = props;
		$[1] = t0;
		$[2] = isDisabled;
		$[3] = inputWrapperProps;
		$[4] = inputProps;
		$[5] = autoFocus;
		$[6] = startElement;
		$[7] = endElement;
		$[8] = isRequired;
		$[9] = description;
		$[10] = descriptionProps;
		$[11] = errorMessage;
		$[12] = errorMessageProps;
		$[13] = label;
		$[14] = labelProps;
		$[15] = otherProps;
	} else {
		t0 = $[1];
		isDisabled = $[2];
		inputWrapperProps = $[3];
		inputProps = $[4];
		autoFocus = $[5];
		startElement = $[6];
		endElement = $[7];
		isRequired = $[8];
		description = $[9];
		descriptionProps = $[10];
		errorMessage = $[11];
		errorMessageProps = $[12];
		label = $[13];
		labelProps = $[14];
		otherProps = $[15];
	}
	const isMultiline = t0 === void 0 ? false : t0;
	const InputElement = isMultiline ? "textarea" : "input";
	let t1;
	if ($[16] !== isDisabled) {
		t1 = { isDisabled };
		$[16] = isDisabled;
		$[17] = t1;
	} else t1 = $[17];
	const { hoverProps, isHovered } = $e969f22b6713ca4a$export$ae780daf29e6d456(t1);
	const inputClassName = useTextFieldStyles();
	const inputRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let t2;
	if ($[18] !== inputRef.current) {
		t2 = () => {
			var _inputRef$current;
			if (document.activeElement === inputRef.current) return;
			(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
		};
		$[18] = inputRef.current;
		$[19] = t2;
	} else t2 = $[19];
	const onIndicatorPressStart = t2;
	let t3;
	if ($[20] !== isDisabled || $[21] !== onIndicatorPressStart) {
		t3 = {
			isDisabled,
			onPressStart: onIndicatorPressStart,
			preventFocusOnPress: true
		};
		$[20] = isDisabled;
		$[21] = onIndicatorPressStart;
		$[22] = t3;
	} else t3 = $[22];
	const { pressProps } = $d27d541f9569d26d$export$45712eceda6fad21(t3);
	let t4;
	if ($[23] !== inputWrapperProps) {
		var _inputWrapperProps;
		t4 = classNames(css({
			display: "flex",
			flex: "1 1 auto",
			position: "relative",
			zIndex: 0
		}), (_inputWrapperProps = inputWrapperProps) === null || _inputWrapperProps === void 0 ? void 0 : _inputWrapperProps.className);
		$[23] = inputWrapperProps;
		$[24] = t4;
	} else t4 = $[24];
	let t5;
	if ($[25] !== props || $[26] !== isHovered || $[27] !== isMultiline) {
		t5 = toDataAttributes({
			adornment: getAdornmentType(props),
			hovered: isHovered || void 0,
			multiline: isMultiline || void 0
		});
		$[25] = props;
		$[26] = isHovered;
		$[27] = isMultiline;
		$[28] = t5;
	} else t5 = $[28];
	const t6 = (_inputProps = inputProps) === null || _inputProps === void 0 ? void 0 : _inputProps.className;
	let t7;
	if ($[29] !== inputClassName || $[30] !== t6) {
		t7 = classNames(inputClassName, t6);
		$[29] = inputClassName;
		$[30] = t6;
		$[31] = t7;
	} else t7 = $[31];
	let t8;
	if ($[32] !== props) {
		t8 = getAdornmentType(props);
		$[32] = props;
		$[33] = t8;
	} else t8 = $[33];
	const t9 = isMultiline ? 1 : void 0;
	let t10;
	if ($[34] !== InputElement || $[35] !== inputProps || $[36] !== t5 || $[37] !== t7 || $[38] !== t8 || $[39] !== inputRef || $[40] !== t9) {
		t10 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputElement, {
			...inputProps,
			...t5,
			className: t7,
			"data-adornment": t8,
			ref: inputRef,
			rows: t9
		});
		$[34] = InputElement;
		$[35] = inputProps;
		$[36] = t5;
		$[37] = t7;
		$[38] = t8;
		$[39] = inputRef;
		$[40] = t9;
		$[41] = t10;
	} else t10 = $[41];
	let t11;
	if ($[42] !== autoFocus || $[43] !== t10) {
		t11 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FocusRing, {
			autoFocus,
			isTextInput: true,
			children: t10
		});
		$[42] = autoFocus;
		$[43] = t10;
		$[44] = t11;
	} else t11 = $[44];
	let t12;
	if ($[45] !== inputClassName || $[46] !== pressProps) {
		t12 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(InputStateIndicator, {
			inputClassName,
			...pressProps
		});
		$[45] = inputClassName;
		$[46] = pressProps;
		$[47] = t12;
	} else t12 = $[47];
	let t13;
	if ($[48] !== inputWrapperProps || $[49] !== hoverProps || $[50] !== t4 || $[51] !== startElement || $[52] !== t11 || $[53] !== t12 || $[54] !== endElement) {
		t13 = /*#__PURE__*/ (0, import_jsx_runtime.jsxs)("div", {
			...inputWrapperProps,
			...hoverProps,
			className: t4,
			children: [
				startElement,
				t11,
				t12,
				endElement
			]
		});
		$[48] = inputWrapperProps;
		$[49] = hoverProps;
		$[50] = t4;
		$[51] = startElement;
		$[52] = t11;
		$[53] = t12;
		$[54] = endElement;
		$[55] = t13;
	} else t13 = $[55];
	let t14;
	if ($[56] !== isRequired || $[57] !== description || $[58] !== descriptionProps || $[59] !== errorMessage || $[60] !== errorMessageProps || $[61] !== label || $[62] !== labelProps || $[63] !== otherProps || $[64] !== t13) {
		t14 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(FieldPrimitive, {
			isRequired,
			description,
			descriptionProps,
			errorMessage,
			errorMessageProps,
			label,
			labelProps,
			...otherProps,
			children: t13
		});
		$[56] = isRequired;
		$[57] = description;
		$[58] = descriptionProps;
		$[59] = errorMessage;
		$[60] = errorMessageProps;
		$[61] = label;
		$[62] = labelProps;
		$[63] = otherProps;
		$[64] = t13;
		$[65] = t14;
	} else t14 = $[65];
	return t14;
});
function makeSiblingSelector(base) {
	return function siblingSelector(...selectors) {
		return selectors.map((s) => `.${base}${s} + &`).join(", ");
	};
}
var InputStateIndicator = ({ inputClassName, ...props }) => {
	const s = makeSiblingSelector(inputClassName);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)("div", {
		role: "presentation",
		...props,
		className: css({
			backgroundColor: tokenSchema.color.background.canvas,
			border: `${tokenSchema.size.border.regular} solid ${tokenSchema.color.alias.borderIdle}`,
			borderRadius: tokenSchema.size.radius.regular,
			cursor: "text",
			inset: 0,
			position: "absolute",
			transition: transition(["border-color", "box-shadow"]),
			zIndex: -1,
			[s("[data-hovered]")]: { borderColor: tokenSchema.color.alias.borderHovered },
			[s(":invalid", "[aria-invalid]")]: { borderColor: tokenSchema.color.alias.borderInvalid },
			[s(":focus")]: { borderColor: tokenSchema.color.alias.borderFocused },
			[s(":focus:not([readonly])")]: { boxShadow: `0 0 0 1px ${tokenSchema.color.alias.borderFocused}` },
			[s(":disabled", "[aria-disabled]")]: {
				backgroundColor: tokenSchema.color.alias.backgroundDisabled,
				borderColor: "transparent",
				cursor: "auto"
			}
		})
	});
};
function useTextFieldStyles() {
	return css({
		color: tokenSchema.color.foreground.neutral,
		flex: 1,
		fontFamily: tokenSchema.typography.fontFamily.base,
		fontSize: tokenSchema.typography.text.regular.size,
		fontWeight: tokenSchema.typography.fontWeight.regular,
		height: tokenSchema.size.element.regular,
		lineHeight: tokenSchema.typography.lineheight.small,
		outline: 0,
		overflow: "visible",
		paddingBlock: tokenSchema.size.space.small,
		paddingInline: tokenSchema.size.space.medium,
		position: "relative",
		textIndent: 0,
		textOverflow: "ellipsis",
		verticalAlign: "top",
		width: "100%",
		MozOsxFontSmoothing: "auto",
		WebkitFontSmoothing: "auto",
		"::placeholder": { color: tokenSchema.color.foreground.neutralTertiary },
		"&:disabled, &[aria-disabled]": {
			color: tokenSchema.color.alias.foregroundDisabled,
			"::placeholder": { color: tokenSchema.color.alias.foregroundDisabled }
		},
		"&::-webkit-search-cancel-button, &::-webkit-search-decoration": { WebkitAppearance: "none" },
		"&[data-multiline]": {
			height: "auto",
			lineHeight: tokenSchema.typography.lineheight.medium,
			minHeight: `calc(${tokenSchema.size.space.regular} * 2 + ${tokenSchema.typography.text.regular.size} * ${tokenSchema.typography.lineheight.medium} * 3)`,
			overflow: "auto",
			paddingBlock: tokenSchema.size.space.regular,
			resize: "none"
		}
	});
}
function getAdornmentType(props) {
	if (props.startElement && props.endElement) return "both";
	else if (props.startElement) return "start";
	else if (props.endElement) return "end";
	return "none";
}
function validateTextFieldProps(props) {
	return validateFieldProps(props);
}
var TextField = /*#__PURE__*/ (0, import_react.forwardRef)(function TextField(props, forwardedRef) {
	const $ = c(9);
	let t0;
	if ($[0] !== props) {
		t0 = validateTextFieldProps(props);
		$[0] = props;
		$[1] = t0;
	} else t0 = $[1];
	props = t0;
	const domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	const { labelProps, inputProps, descriptionProps, errorMessageProps } = $054f71d2330da2e3$export$712718f7aec83d5(props, domRef);
	let t1;
	if ($[2] !== domRef || $[3] !== props || $[4] !== labelProps || $[5] !== inputProps || $[6] !== descriptionProps || $[7] !== errorMessageProps) {
		t1 = /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextFieldPrimitive, {
			ref: domRef,
			...props,
			labelProps,
			inputProps,
			descriptionProps,
			errorMessageProps
		});
		$[2] = domRef;
		$[3] = props;
		$[4] = labelProps;
		$[5] = inputProps;
		$[6] = descriptionProps;
		$[7] = errorMessageProps;
		$[8] = t1;
	} else t1 = $[8];
	return t1;
});
var TextArea = /*#__PURE__*/ (0, import_react.forwardRef)(function TextArea({ onChange, ...props }, forwardedRef) {
	var _props$defaultValue;
	props = validateTextFieldProps(props);
	let domRef = $03e8ab2d84d7657a$export$4338b53315abf666(forwardedRef);
	let [inputValue, setInputValue] = $3e6197669829fe11$export$40bfa8c7b0832715(props.value, (_props$defaultValue = props.defaultValue) !== null && _props$defaultValue !== void 0 ? _props$defaultValue : "", () => {});
	let onHeightChange = (0, import_react.useCallback)(() => {
		let input = domRef.current;
		if (!props.height && input) {
			let prevOverflow = input.style.overflow;
			if (!("MozAppearance" in input.style)) input.style.overflow = "hidden";
			input.style.height = "auto";
			input.style.height = `${input.scrollHeight + (input.offsetHeight - input.clientHeight)}px`;
			input.style.overflow = prevOverflow;
		}
	}, [domRef, props.height]);
	(0, import_react.useLayoutEffect)(() => {
		if (domRef.current) onHeightChange();
	}, [
		onHeightChange,
		inputValue,
		domRef
	]);
	let { labelProps, inputProps, descriptionProps, errorMessageProps } = $054f71d2330da2e3$export$712718f7aec83d5({
		...props,
		onChange: $a4e76a5424781910$export$e08e3b67e392101e(onChange, setInputValue),
		inputElementType: "textarea"
	}, domRef);
	return /*#__PURE__*/ (0, import_jsx_runtime.jsx)(TextFieldPrimitive, {
		...props,
		ref: domRef,
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isMultiline: true
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/dialog/useDialog.mjs
function $13150e6629d46e45$export$d55e7ee900f34e93(props, ref) {
	let { role = "dialog" } = props;
	let titleId = $390e54f620492c70$export$b4cc09c592e8fdb8();
	titleId = props["aria-label"] ? void 0 : titleId;
	let isRefocusing = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (ref.current && !$23f2114a1b82827e$export$b4f377a2b6254582(ref.current)) {
			$f192c2f16961cbe0$export$80f3e147d781571c(ref.current);
			let timeout = setTimeout(() => {
				if ($23f2114a1b82827e$export$cd4e5573fbe2b576() === ref.current || $23f2114a1b82827e$export$cd4e5573fbe2b576() === document.body) {
					isRefocusing.current = true;
					if (ref.current) {
						ref.current.blur();
						$f192c2f16961cbe0$export$80f3e147d781571c(ref.current);
					}
					isRefocusing.current = false;
				}
			}, 500);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [ref]);
	$d7a937236970dc7f$export$14c98a7594375490();
	let hasWarned = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!hasWarned.current && ref.current) {
			let el = ref.current;
			let hasAriaLabel = el.hasAttribute("aria-label");
			let hasAriaLabelledby = el.hasAttribute("aria-labelledby");
			if (!hasAriaLabel && !hasAriaLabelledby) {
				console.warn("A dialog must have a title for accessibility. Either provide an aria-label or aria-labelledby prop, or render a heading element inside the dialog.");
				hasWarned.current = true;
			}
		}
	});
	return {
		dialogProps: {
			...$8e9d2fae0ecb9001$export$457c3d6518dd4c6f(props, { labelable: true }),
			role,
			tabIndex: -1,
			"aria-labelledby": props["aria-labelledby"] || titleId,
			onBlur: (e) => {
				if (isRefocusing.current) e.stopPropagation();
			}
		},
		titleProps: { id: titleId }
	};
}
//#endregion
export { KeystarProvider as $, HStack as A, $e8ac3c3f5d4bae7f$export$d6875122194c7b44 as At, ToggleButton as B, FieldPrimitive as C, $f282e36c29c025e8$export$f9d5c8beee7d008d as Ct, Divider as D, $cbf007e418543821$export$b0d6fa1ab32e3295 as Dt, Box as E, $cbf007e418543821$export$16a4697467175487 as Et, ActionButton as F, $58196c8d6a1f38fc$export$1c3ebcada18427bf as Ft, xIcon as G, useFieldButton as H, Button as I, $a46cf152bb926da5$export$a9b970dcc4ae71a9 as It, $240e9101ba2842f5$export$cb6e0bb50bc19463 as J, ProgressCircle as K, ButtonGroup as L, $a46cf152bb926da5$export$d10ae4f68404609a as Lt, VStack as M, $600b3cf69ae46262$export$90fc3a17d93f704c as Mt, minmax as N, $fe16bffc7a557bf0$export$7f54fc3180508a52 as Nt, Flex as O, $121970af65029459$export$f8aeda7b10753fa1 as Ot, $dc321dbb6473ef33$export$52210f68a14655d0 as P, $901761b40e390936$export$2bb74740c4e19def as Pt, ClientSideOnlyDocumentElement as Q, ClearButton as R, FieldMessage as S, $f192c2f16961cbe0$export$80f3e147d781571c as St, alertTriangleIcon as T, $b7115c395c64f7b5$export$4debdb1a3f0fa79e as Tt, $fd3c5e01e837dc20$export$8042c6c013fd5226 as U, actionButtonClassList as V, Icon as W, $e969f22b6713ca4a$export$ae780daf29e6d456 as X, $40d752843fab8930$export$dcf14c9974fe2767 as Y, $ac4318a9c075bb9f$export$ea18c227d4417cc3 as Z, $77844860df94ba23$export$ea8f71083e90600f as _, $0beb20c9744a2065$export$8467354a121f1b9f as _t, validateTextFieldProps as a, $0d47b37c475c5231$export$3351871ee4b288b8 as at, FieldDescription as b, $535772f9d2c1f38d$export$2d6ec8fc375ceafa as bt, Modal as c, $fd2148440a13ec26$export$dad6ae84456c676a as ct, Transition as d, $860f7da480e22816$export$b8473d3665f3a75a as dt, useProvider as et, Tray as f, $d1116acdf220c2da$export$13f3202a3e5ddd5 as ft, $3578607fe3d4b096$export$cfa2225e87938781 as g, $191c9b6d48a0a4e2$export$294aa081a6c6f55d as gt, $5698867baeb53f4e$export$dbc0f175b25fb0fb as h, $8296dad1a4c5e0dc$export$8f71654801c2f7cd as ht, TextFieldPrimitive as i, $970072cf4b13fde3$export$683480f191c0e3ea as it, ScrollView as j, $3274bf1495747a7b$export$5add1d006293d136 as jt, Grid as k, $cf2482eff2eeeec2$export$f12b703ca79dfbb1 as kt, Overlay as l, $fd2148440a13ec26$export$fc1a364ae1f3ff10 as lt, $081058010ef8962e$export$2317d149ed6f78c4 as m, $03e8ab2d84d7657a$export$4338b53315abf666 as mt, TextArea as n, $72abaeab4d80592f$export$9fc1347d4195ccb3 as nt, Blanket as o, $054f71d2330da2e3$export$712718f7aec83d5 as ot, $b3526bc71400be8d$export$d39e1813b3bdd0e1 as p, $d1116acdf220c2da$export$4c014de7c8940b4c as pt, $240e9101ba2842f5$export$7d15b64cf5a3a4c4 as q, TextField as r, $f11fb0bcf1b2687a$export$61c6a8c84e605fb6 as rt, DirectionIndicator as s, $fd2148440a13ec26$export$a763b9476acd3eb as st, $13150e6629d46e45$export$d55e7ee900f34e93 as t, useProviderProps as tt, Popover as u, $3e6197669829fe11$export$40bfa8c7b0832715 as ut, chevronDownIcon as v, $bb39c0fc1c19b34c$export$16792effe837dba3 as vt, validateFieldProps as w, $d27d541f9569d26d$export$45712eceda6fad21 as wt, FieldLabel as x, $535772f9d2c1f38d$export$c5251b9e124bf29 as xt, Field as y, $535772f9d2c1f38d$export$20e40289641fbbb6 as yt, FieldButton as z };
