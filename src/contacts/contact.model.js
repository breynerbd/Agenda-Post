'use strict';

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre no puede tener más de 100 caracteres'],
    },

    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        maxLength: [100, 'El apellido no puede tener más de 100 caracteres'],
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^\S+@\S+\.\S+$/,
            'Por favor ingresa un correo válido',
        ],
    },

    phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true,
        maxLength: [20, 'El teléfono no puede exceder 20 caracteres'],
    },
    photo: {
        type: String,
        default: 'contacts/default_contact',
    },

    isActive: {
        type: Boolean,
        default: true,
    },
});

contactSchema.index({ isActive: 1 });
contactSchema.index({ email: 1 });
contactSchema.index({ email: 1, isActive: 1 });

export default mongoose.model('Contact', contactSchema);
