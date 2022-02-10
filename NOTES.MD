```javascript
    // Exclude keys from user
    function exclude<User, Key extends keyof User>(
        user: User,
        ...keys: Key[]
        ): Omit<User, Key> {
        for (let key of keys) {
            delete user[key]
        }
        return user
    }

    function main() {
        const user = await prisma.user.findUnique({ where: 1 })
        const userWithoutPassword = exclude(user, 'password')
    }
```

Para crear clientes:

```json
{
    "name": "Blindecor",
    "cif" : "12345678X",
    "keywords": [{
        "name": "Blindecor"
    }]
}
```

Para crear software:

```json
{
    "name": "Veeam",
    "onlySubject" : true,
    "keywords": [{
        "name": "Veeam"
    }],
    "successKeywords": [{
        "name": "Success"
    }],
    "warningKeywords": [{
        "name": "Warning"
    }],
    "errorKeywords": [{
        "name": "Failed"
    }]
}
```

Para crear token secret:

```javascript
require('crypto').randomBytes(64).toString('hex')
```