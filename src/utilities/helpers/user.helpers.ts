import type { User, UserListItem } from '../models'

/** Maps raw JSONPlaceholder User to flat table DTO */
export const toUserListItem = (user: User): UserListItem => ({
  id: user.id,
  name: user.name,
  email: user.email,
  companyName: user.company.name,
  city: user.address.city,
  phone: user.phone,
  website: user.website,
})
