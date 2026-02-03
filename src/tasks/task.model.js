'use strict';

import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        maxLength: [150, 'El título no puede exceder 150 caracteres'],
    },

    description: {
        type: String,
        trim: true,
        maxLength: [500, 'La descripción no puede exceder 500 caracteres'],
    },

    status: {
        type: String,
        required: [true, 'El estado es obligatorio'],
        enum: {
            values: ['PENDIENTE', 'ENTREGADO'],
            message: 'Estado no válido',
        },
        default: 'PENDIENTE',
    },

    expireDate: {
        type: Date,
        required: [true, 'La fecha de vencimiento es obligatoria'],
    },

    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

taskSchema.index({ isActive: 1 });
taskSchema.index({ status: 1 });
taskSchema.index({ dueDate: 1 });

export default mongoose.model('Task', taskSchema);
