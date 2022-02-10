import * as userService from '../services/user.service';

const createRoot = async () => {
    const exists = await userService.getByEmail('root@devoltec.com');
    if (!exists) {
        await userService.create({
            email: 'root@devoltec.com',
            passw: 'root',
            name: 'Root',
            addresses: [
                {
                    email: 'balbert@devoltec.com'
                },
                {
                    email: 'boralbgra@gmail.com'
                }
            ],
            intervals: [
                {
                    date: new Date()
                }
            ]
        })
    }
}

/**
 * 
 */
export const initData = async () => {
    await createRoot();
}