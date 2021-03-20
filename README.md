<h1 align="center">parcel-transformer-mustache</h1>
<p align="center">
  <a href="https://npmjs.org/package/@eirikb/parcel-transformer-mustache">
    <img src="https://img.shields.io/npm/v/@eirikb/parcel-transformer-mustache.svg">
  </a>
  <a href="https://github.com/eirikb/parcel-transformer-mustache/actions?query=workflow%3ACI">
    <img src="https://github.com/eirikb/parcel-transformer-mustache/workflows/CI/badge.svg">
  </a>
</p>

----

Mustache transformer for Parcel 2. Supports `.env`-file.

### Usage - config package

The [config package](https://www.npmjs.com/package/@eirikb/parcel-config-mustache) has default values set up so you need
less config in **.parcelrc**.

* Matches all \*.mustache.\* files.  
  Such as **manifest.mustache.xml**.  
  This pattern helps you IDE associate the file ending,  
  but it was also the only pattern I was able to use as Parcel 2 Namer.
* Matched files are renamed without **.mustache.**-part.  
  E.g., **manifest.mustache.xml** becomes **manifest.xml**.

Install:

```bash
npm i -D @eirikb/parcel-config-mustache
```

**.parcelrc**:

```json
{
  "extends": [
    "@parcel/config-default",
    "@eirikb/parcel-config-mustache"
  ]
}
```

Run:

```bash
parcel build manifest.mustache.xml
```

### Usage - transformer

This is how you can use the transformer directly.  
For example transforming **manifest.xml**:

Install:

```bash
npm i -D @eirikb/parcel-transformer-mustache
```

**.parcelrc**:

```json
{
  "extends": "@parcel/config-default",
  "transformers": {
    "manifest.xml": [
      "@eirikb/parcel-transformer-mustache"
    ]
  }
}
```

Run:

```bash
parcel build manifest.xml
```

Note: You can change `"manifest.xml"` in **.parcelrc** with anything you like, it also supports wildcards. Note that
this approach will not rename the file, e.g., if you input **file.mustache** it will be named **file.mustache** (in
dist).js

### URL

You can add URL to other assets, such as images by using `{{#url}}image.png{{/url}}`.

### .json-files

If you put a **.json**-file alongside your other file it should be included as view data:
**manifest.xml**  
or  
**manifest.mustache.xml**  
and  
**manifest.json**

