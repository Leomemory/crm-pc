import type { AuthSceneVariant } from '../types/app'

interface AuthSceneConfig {
  initialSlideIndex: number
  panelTopOffset: number
}

export const AUTH_SCENES: Record<AuthSceneVariant, AuthSceneConfig> = {
  login: {
    initialSlideIndex: 0,
    panelTopOffset: 216,
  },
  register: {
    initialSlideIndex: 1,
    panelTopOffset: 48,
  },
  forgotPassword: {
    initialSlideIndex: 4,
    panelTopOffset: 129,
  },
}
