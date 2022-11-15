import { ElectronAPI } from '@electron-toolkit/preload'
import { API } from '../main/api'

declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
