'use strict';

/**
 * email-designer.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = ({ strapi }) => {
  return {
    /**
     * Promise to fetch a layout.
     * @return {Promise}
     */
    findOne(params) {
      return strapi.query('plugin::email-designer.layout-template').findOne({ where: params });
    },

    /**
     * Promise to fetch all layout.
     * @return {Promise}
     */
    findMany(params) {
      const layouts = strapi.query('plugin::email-designer.layout-template').findMany({ where: params });

      return layouts ?? [];
    },

    /**
     * Promise to add a template.
     * @return {Promise}
     */
    async create(values) {
      return strapi.query('plugin::email-designer.layout-template').create({ data: values });
    },

    /**
     * Promise to edit a layout.
     * @return {Promise}
     */
    async update(params, values) {
      // FIXME: ⬇︎ avoid duplicating templateReferenceId field
      return strapi.query('plugin::email-designer.layout-template').update({ where: params, data: values });
    },

    /**
     * Promise to remove a layout.
     * @return {Promise}
     */
    async delete(params) {
      return strapi.query('plugin::email-designer.layout-template').delete({ where: params });
    },
  };
};
