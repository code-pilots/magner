/**
 * Thanks to the https://github.com/editor-js/simple-image-tutorial/blob/master/simple-image.js
 * for this simple image Editorjs plugin tutorial
 */

import {
  BlockTool, API, BlockToolConstructorOptions, ToolConfig, BlockToolData,
} from '@editorjs/editorjs';

type OutputCodeBlock = BlockToolData<{url: string, caption: string}>;

export default class SimpleImage implements BlockTool {
  api: API;
  config: ToolConfig;
  readOnly: boolean;
  wrapper: HTMLElement|null;
  data: OutputCodeBlock;

  constructor ({
    data, api, config, readOnly,
  }: BlockToolConstructorOptions) {
    this.api = api;
    this.config = config || {};
    this.data = {
      url: data.url || '',
      caption: data.caption || '',
    };
    this.readOnly = readOnly;
    this.wrapper = null;
  }

  render () {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('simple-image');

    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption);
      return this.wrapper;
    }

    const input = document.createElement('input');
    input.classList.add('cdx-input');

    input.placeholder = this.config.placeholder || '';
    input.addEventListener('paste', (event) => {
      this._createImage(event.clipboardData?.getData('text') ?? '');
    });

    this.wrapper.appendChild(input);

    return this.wrapper;
  }

  _createImage (url: string, captionText?: string) {
    const image = document.createElement('img');
    const caption = document.createElement('div');

    image.src = url;
    caption.classList.add('cdx-input');
    caption.contentEditable = 'true';
    caption.innerHTML = captionText ?? '';

    if (this.wrapper) {
      this.wrapper.innerHTML = '';
      this.wrapper.appendChild(image);
      this.wrapper.appendChild(caption);
    }
  }

  save (blockContent: HTMLElement) {
    const image = blockContent.querySelector('img') as HTMLImageElement;
    const caption = blockContent.querySelector('[contenteditable]') as HTMLElement;

    return Object.assign(this.data, {
      url: image.src,
      caption: caption.innerHTML ?? '',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  validate (savedData: OutputCodeBlock) {
    return !!savedData.url.trim();
  }

  static get sanitize () {
    return {
      url: {},
      caption: {
        b: true,
        a: {
          href: true,
        },
        i: true,
      },
    };
  }

  static get toolbox () {
    return {
      title: 'Image',
      icon: `
        <svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg">
          <path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/>
        </svg>`,
    };
  }

  static get pasteConfig () {
    return {
      tags: ['IMG'],
      files: {
        mimeTypes: ['image/*'],
        extensions: ['gif', 'jpg', 'png'],
      },
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i,
      },
    };
  }

  onPaste (event: CustomEvent) {
    switch (event.type) {
      case 'tag':
        this._createImage(event.detail.data.src);
        break;
      case 'file':
        /* We need to read file here as base64 string */
        const reader = new FileReader(); // eslint-disable-line no-case-declarations

        reader.onload = (loadEvent) => {
          this._createImage(loadEvent.target?.result as string ?? '');
        };

        reader.readAsDataURL(event.detail.file);
        break;
      case 'pattern':
        this._createImage(event.detail.data);
        break;
      default: break;
    }
  }

  static get isReadOnlySupported () {
    return true;
  }
}
