import { analytics } from "./firebase"
import { Analytics, logEvent } from "firebase/analytics"

type AnalyticsEventParams = {
  [key: string]: any
}

export const sendAnalyticsEvent = (
  eventName: string,
  eventParams?: AnalyticsEventParams
) => {
  if (analytics) {
    logEvent(analytics as Analytics, eventName, eventParams)
  }
} 