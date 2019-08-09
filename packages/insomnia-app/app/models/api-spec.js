// @flow
import type { BaseModel } from './index';
import * as db from '../common/database';

export const name = 'ApiSpec';
export const type = 'ApiSpec';
export const prefix = 'spc';
export const canDuplicate = true;
export const canSync = true;

type BaseApiSpec = {
  name: string,
  contentType: 'json' | 'yaml',
  contents: string,
};

export type ApiSpec = BaseModel & BaseApiSpec;

export function init(): BaseApiSpec {
  return {
    name: 'API Spec',
    contents: '',
    contentType: 'yaml',
  };
}

export async function migrate(doc: ApiSpec): Promise<ApiSpec> {
  return doc;
}

export async function getOrCreateForParentId(
  workspaceId: string,
  patch: Object = {},
): Promise<ApiSpec> {
  const spec = await db.getWhere(type, { parentId: workspaceId });

  if (!spec) {
    return db.docCreate(type, { ...patch, parentId: workspaceId });
  }

  return spec;
}

export async function all(): Promise<Array<ApiSpec>> {
  return db.all(type);
}

export function update(apiSpec: ApiSpec, patch: Object): Promise<ApiSpec> {
  return db.docUpdate(apiSpec, patch);
}
