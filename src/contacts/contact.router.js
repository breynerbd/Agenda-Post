import { Router } from 'express';
import { uploadContactImage } from '../../middlewares/file-uploader.js';

import {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
} from './contact.controller.js';
import {
    validateCreateContact,
    validateUpdateContactRequest,
    validateGetContactById,
} from '../../middlewares/contact-validators.js';

const router = Router();

router.get('/', getContacts);
router.get('/:id', validateGetContactById, getContactById);

router.post(
    '/',
    uploadContactImage.single('image'),
    validateCreateContact,
    createContact
);

router.put(
    '/:id',
    uploadContactImage.single('image'),
    validateUpdateContactRequest,
    updateContact
);

router.delete('/:id', validateGetContactById, deleteContact);

export default router;
