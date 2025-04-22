import Ajv from 'ajv';
import addFormats from 'ajv-formats';
const _ajv = new Ajv({ coerceTypes: true, $data: true });
export const objectIdRegExp = /^[0-9a-f]{24}$/;

addFormats(_ajv);
_ajv.addFormat('object_id', objectIdRegExp);

export const ajv = _ajv;
