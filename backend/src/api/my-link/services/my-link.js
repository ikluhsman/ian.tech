'use strict';

/**
 * my-link service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::my-link.my-link');
