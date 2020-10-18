import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import config from 'config'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

export default class UserController {
    async create(request: Request, response: Response) {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.boom.badRequest('One or more invalid fields', { fields: errors.array() });
        }

        const { email, firstName, lastName, password, createdAt } = request.body;

        try {
            let user = await User.findOne({ email })

            if (user) return response.boom.badRequest('User Already Exists')

            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);

            user = new User({ email, firstName, lastName, password: encryptedPassword, createdAt });

            await user.save()

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw response.boom.badImplementation(err.message)
                    response.json({ token })
                }
            )
        } catch (error) {
            response.boom.badImplementation('Server error')
        }
    }
}
