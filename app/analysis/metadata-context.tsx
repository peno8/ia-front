import { Context, createContext } from 'react';
import { AppMetadata } from '../app.store';

export type MetadataContextDef = {
    metadata: AppMetadata
}

const defaultContext = {
    metadata: {
        DATE: '',
        CURRENT_QT: '',
        LAST_QT: '',
    }
}

export const MetadataContext: Context<MetadataContextDef> = createContext(defaultContext); // TODO: Move to Project Root