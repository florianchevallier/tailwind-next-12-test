import { rest } from 'msw'
import translations from './fr.json';
import translationsEn from './en.json';
import translationsNl from './nl.json';
import translationsEs from './es.json';

export const handlers = [
  rest.get('https://my.backend/translations/fr', (req, res, ctx) => {
    return res(
      ctx.json(translations)
    )
  }),
  rest.get('https://my.backend/translations/en', (req, res, ctx) => {
    return res(
      ctx.json(translationsEn)
    )
  }),
  rest.get('https://my.backend/translations/nl', (req, res, ctx) => {
    return res(
      ctx.json(translationsNl)
    )
  }),
  rest.get('https://my.backend/translations/es', (req, res, ctx) => {
    return res(
      ctx.json(translationsEs)
    )
  }),
]