import fetch from 'isomorphic-fetch'
import { config } from '../../config/config'
import { statusCodeToStatusMessage } from '../../helpers/status-code-to-status-message.helper'

export const verifyEmail = async (token: string) => {
  try {
    const response = await fetch(`${config.hangwomanApiREST}/email-verification/${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })

    const body = await response.json()

    if (!body) {
      return {
        status: 'error',
        message: 'Inesperated error ocurred',
      }
    }

    return {
      status: statusCodeToStatusMessage(response.status),
      message: body.message,
    }
  } catch {
    return {
      status: 'error',
      message: 'Inesperated error ocurred',
    }
  }
}
