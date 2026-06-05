
import mongoose from 'mongoose'
import { db_name } from "../../constants.js"
import dns from 'dns'

dns.setServers(['1.1.1.1', '0.0.0.0'])

const normalizeMongoUri = (uri = '') => {
  const trimmed = uri.trim().replace(/\s+/g, '')
  if (!trimmed) return ''
  if (/^mongodb(\+srv)?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, '')
  }
  return `mongodb://${trimmed.replace(/\/+$/, '')}`
}

const ensureDatabaseInUri = (uri, dbName) => {
  const [beforeQuery, query] = uri.split('?')
  const normalizedBeforeQuery = beforeQuery.replace(/\/+$/, '')
  const pathSegments = normalizedBeforeQuery.split('/')

  // mongodb://host or mongodb+srv://host -> append database name
  // if a database is already present, keep it as-is
  if (pathSegments.length > 3 && pathSegments[3]) {
    return query ? `${normalizedBeforeQuery}?${query}` : normalizedBeforeQuery
  }

  const uriWithDb = `${normalizedBeforeQuery}/${dbName}`
  return query ? `${uriWithDb}?${query}` : uriWithDb
}

const dbConnect=async ()=>{
    try {
        const envUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb+srv://dgadmin:dgadmin2026@digiclassroom.oen9jsx.mongodb.net/?appName=DigiClassRoom'
        const normalizedUri = normalizeMongoUri(envUri)
        const connectionString = ensureDatabaseInUri(normalizedUri, db_name)
        const dbInstance = await mongoose.connect(connectionString)
        return dbInstance
    } catch (error) {
        throw error
    }
}

export { dbConnect }
