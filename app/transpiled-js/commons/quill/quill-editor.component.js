"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Quill = require("quill");
var QuillEditorComponent = /** @class */ (function () {
    function QuillEditorComponent(elementRef) {
        this.elementRef = elementRef;
        this.emptyArray = [];
        this.defaultModules = {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'color': this.emptyArray.slice() }, { 'background': this.emptyArray.slice() }],
                [{ 'font': this.emptyArray.slice() }],
                [{ 'align': this.emptyArray.slice() }],
                ['clean'],
                ['link', 'image', 'video'] // link and image, video
            ]
        };
        this.onEditorCreated = new core_1.EventEmitter();
        this.onContentChanged = new core_1.EventEmitter();
        this.onSelectionChanged = new core_1.EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    QuillEditorComponent_1 = QuillEditorComponent;
    QuillEditorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
        var modules = this.modules || this.defaultModules;
        if (toolbarElem) {
            modules['toolbar'] = toolbarElem;
        }
        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
        this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');
        this.quillEditor = new Quill(this.editorElem, {
            modules: { modules: modules },
            placeholder: this.placeholder || 'Insert text here ...',
            readOnly: this.readOnly || false,
            theme: this.theme || 'snow',
            formats: this.formats
        });
        if (this.content) {
            this.quillEditor.pasteHTML(this.content);
        }
        this.onEditorCreated.emit(this.quillEditor);
        // mark model as touched if editor lost focus
        this.quillEditor.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChanged.emit({
                editor: _this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source,
                bounds: _this.bounds || document.body
            });
            if (!range) {
                _this.onModelTouched();
            }
        });
        // update model if text changes
        this.quillEditor.on('text-change', function (delta, oldDelta, source) {
            var html = _this.editorElem.children[0].innerHTML;
            var text = _this.quillEditor.getText();
            if (html === '<p><br></p>') {
                html = null;
            }
            _this.onModelChange(html);
            _this.onContentChanged.emit({
                editor: _this.quillEditor,
                html: html,
                text: text,
                delta: delta,
                oldDelta: oldDelta,
                source: source
            });
        });
    };
    QuillEditorComponent.prototype.ngOnChanges = function (changes) {
        if (changes['readOnly'] && this.quillEditor) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }
    };
    QuillEditorComponent.prototype.writeValue = function (currentValue) {
        this.content = currentValue;
        if (this.quillEditor) {
            if (currentValue) {
                this.quillEditor.pasteHTML(currentValue);
                return;
            }
            this.quillEditor.setText('');
        }
    };
    QuillEditorComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    QuillEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    QuillEditorComponent.prototype.validate = function () {
        if (!this.quillEditor) {
            return null;
        }
        var err = {}, valid = true;
        var textLength = this.quillEditor.getText().trim().length;
        if (this.minLength && textLength && textLength < this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };
            valid = false;
        }
        if (this.maxLength && textLength > this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };
            valid = false;
        }
        if (this.required && !textLength) {
            err.requiredError = {
                empty: true
            };
            valid = false;
        }
        return valid ? null : err;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuillEditorComponent.prototype, "theme", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuillEditorComponent.prototype, "modules", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuillEditorComponent.prototype, "readOnly", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], QuillEditorComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], QuillEditorComponent.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], QuillEditorComponent.prototype, "minLength", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], QuillEditorComponent.prototype, "required", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], QuillEditorComponent.prototype, "formats", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], QuillEditorComponent.prototype, "bounds", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], QuillEditorComponent.prototype, "onEditorCreated", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], QuillEditorComponent.prototype, "onContentChanged", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], QuillEditorComponent.prototype, "onSelectionChanged", void 0);
    QuillEditorComponent = QuillEditorComponent_1 = __decorate([
        core_1.Component({
            selector: 'quill-editor',
            template: "\n  <ng-content select=\"[quill-editor-toolbar]\"></ng-content>\n",
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return QuillEditorComponent_1; }),
                    multi: true
                }, {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return QuillEditorComponent_1; }),
                    multi: true
                }],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], QuillEditorComponent);
    return QuillEditorComponent;
    var QuillEditorComponent_1;
}());
exports.QuillEditorComponent = QuillEditorComponent;
//# sourceMappingURL=quill-editor.component.js.map