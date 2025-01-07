import firebase_admin
from firebase_admin import credentials

cred = credentials.Certificate("path/to/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

{
  "type": "service_account",
  "project_id": "coco-f4b45",
  "private_key_id": "58408abc1b40b4658dc0abbc768c45f70c5724cf",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC3PRqMs6SdWiO+\nxwMfo/Araat40cGlE2rBWKIYoMUUWu1XOch1rwWiD3K1Jszqs5ldDK9JBu9jIHqb\nyOfzqaWmDze8cnlezumii4DdnFwiqDVK6VSCh75lFa990ESiJTvbxxoZtwAC1c02\nAwcvfwHGhelRJ7A8X+qcviVWeLsNTG4f/e0rJqBj0WGQxDhXzuRBbw+/+ye9gK4g\nfDnGc2+1pTScs12spgp8SQqiQHBSz5BAa5LG7iu6Xh0oFoDgg3LTXcG84Ge4mqau\nxd4YS/5LPUZKHN9wRKFCuHWbZIwTdHKbz3FUHoaJLEfEkvjquBXQdrqKrPP42NIQ\npaTVth1vAgMBAAECggEAEQe5zvfnRcSZ6+I9NRScfrxsdmcwUzJRyrR9JELU7kZh\nJqk1K1Lf+CbtZ0663tlgWJiUNfpSB2l+W7o5bJkIzz081ePhyeD7L+M9T9t3aLUv\nds3mz9bj6Csyy0OvDU7emFeR4m/yrVDHqMxxP4XTWWsauzMwGvxjJrw5ZicEY4Dd\nk5yWxV5iIrDm4xc5fzOusstGO6q8Jn1gnHNrqHI6DrAbqAaMmEU7WN2rXCHuCulk\nouPld4sfxIBx5DLTNbEnfg9toqjPof/bWanjLUERiyqcNBt0e0e8/CPonNaj9zWG\nsPYY/fC23dUHU+tbfURwrJ7yi5jWKQqjzjDVVx2UaQKBgQDs3c5TI0WJtJgUC42P\ng5PBUuKK593LQct/5XcRbXbnvx/xTGAEf6Z1iOJwbDwcBoWCTvMSpT6TJKvvuEdC\nyXIYV+CZCC5syOBTl1saBF/9AZNsWCfjsjLEgN/s1rxA2GtvsfcwCzxep0EEJxKv\nnvqp8JDX4KgXxbwHq9QI3nga7QKBgQDGClJ4SHjAOiu+v1XSCrF+tCEiE/c01xlf\nv4l2BfEJNNfLOwzW2cmsprJfIFFRyGzfqDvA1o4LLBFQrBdjuf/yEqEbVjyfUhkA\ncK1Y0DPXarEmHS1nY/Mre6lYh36GagDR4wt9mFS8TobkQMxCCmMv5XY07zmd9aHR\nzE9WnqXiSwKBgQCdEj0WzoX3WiWa7UpTR9p8UX1exYFDnv7WchDyIpe99/Szq4Tk\nls2IlVwrVurJXt272qS/0YpcQu4tShMfS7x4PhX3BQDcLJztcan857fLa/cZ2p+h\nE3Ms8ZUMVh2CFsGv0ODtIBZJYjnwCgUPJqpsdNVoAlcVZI9auuwhcX1NxQKBgQCk\nl4ebOIBDIxWgXt0wyHpkV8kBzZ4zaGJKVaIlWSLPCAAhhF5TYoZe29x7exya3/y8\nldGzn55GYsWxSpXV6Ixz4E/NrIqNz2nAF+W6Xq/3ZVD94FoQB93eUdSZI2Ngy1EL\nH6w5IhWqu4kYw1H/wSpWcFsh+4Dja3amKyv1Tb2IqQKBgDf9VC1bN1D1hLWxK5HC\ncW+MxiZZHFUsrnJHU0CYCiUVVBhIcXsb8j74OC+HBsj3s9/ZsKaiUJR97Rgo09Vy\nijskhoLzMN7U/Axo4k0QWRu8wOsvk1m1YZpAoC8sN/Rh2NzkMfCp0uReTSESIRxf\nB+8TwTgFpDHyF83pWMks+3oz\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-hox5u@coco-f4b45.iam.gserviceaccount.com",
  "client_id": "112430992127777655923",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hox5u%40coco-f4b45.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}