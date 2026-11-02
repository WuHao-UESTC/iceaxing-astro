import "./rolldown-runtime-DbVrKiKs.js";
import { t as require_react } from "./react-eZXm9bZy.js";
import { t as require_jsx_runtime } from "./jsx-runtime-hYFZm98l.js";
import "./keystar-ui-typography-C-wQCOMj.js";
import "./useDialog-DHBulEq_.js";
import { H as cloudImageToolbarIcon, Jt as text, c as CloudImagePreviewForNewEditor, wt as handleFile } from "./index-5d64e651-BRkFJ1WA.js";
import { v as require_dist } from "./base64-3538d789-DtKJQWSz.js";
import { t as integer } from "./index-dbe11bde-Bk_WnBiu.js";
//#region node_modules/@keystatic/core/dist/cloud-image-schema-2846cb3c.js
var cloudImageSchema = {
	src: text({
		label: "URL",
		validation: { length: { min: 1 } }
	}),
	alt: text({ label: "Alt text" }),
	height: integer({ label: "Height" }),
	width: integer({ label: "Width" })
};
require_react();
require_jsx_runtime();
require_dist();
function wrapper(config) {
	return {
		kind: "wrapper",
		...config
	};
}
function block(config) {
	return {
		kind: "block",
		...config
	};
}
function inline(config) {
	return {
		kind: "inline",
		...config
	};
}
function mark(config) {
	return {
		kind: "mark",
		...config
	};
}
function repeating(config) {
	var _config$validation$ch, _config$validation, _config$validation$ch2, _config$validation2;
	return {
		kind: "repeating",
		...config,
		children: Array.isArray(config.children) ? config.children : [config.children],
		validation: { children: {
			min: (_config$validation$ch = (_config$validation = config.validation) === null || _config$validation === void 0 || (_config$validation = _config$validation.children) === null || _config$validation === void 0 ? void 0 : _config$validation.min) !== null && _config$validation$ch !== void 0 ? _config$validation$ch : 0,
			max: (_config$validation$ch2 = (_config$validation2 = config.validation) === null || _config$validation2 === void 0 || (_config$validation2 = _config$validation2.children) === null || _config$validation2 === void 0 ? void 0 : _config$validation2.max) !== null && _config$validation$ch2 !== void 0 ? _config$validation$ch2 : Infinity
		} }
	};
}
function cloudImage(args) {
	return {
		kind: "block",
		label: args.label,
		schema: cloudImageSchema,
		NodeView: CloudImagePreviewForNewEditor,
		icon: cloudImageToolbarIcon,
		handleFile
	};
}
//#endregion
export { block, cloudImage, inline, mark, repeating, wrapper };
