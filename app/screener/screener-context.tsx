import { type } from 'os';
import { Context, createContext } from 'react';
import { AppMetadata, ScreenerDef } from '../app.store';
import { FeatureDef } from './screener-store';

export type ScreenerContextDef = {
    metadata: AppMetadata
    screenerDefs: ScreenerDef[]
    featureDefs: FeatureDef[]
}

const defaultContext = {
    metadata: {
        DATE: '',
        CURRENT_QT: '',
        LAST_QT: '',
    },
    screenerDefs: new Array<ScreenerDef>(),
    featureDefs: new Array<FeatureDef>()
}

export const ScreenerContext: Context<ScreenerContextDef> = createContext(defaultContext);