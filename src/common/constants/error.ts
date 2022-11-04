export const ERROR = {
  REDIS: {
    CONFLICT: {
      message: 'This key already exists at the redis store',
      status: 409,
    },
    NOT_FOUND: {
      message: 'This key not found at the redis store',
      status: 404,
    },
  },
}
