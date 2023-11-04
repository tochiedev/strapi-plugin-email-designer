'use strict';
const _ = require('lodash');
const { htmlToText } = require('html-to-text');
const { isNil } = require('lodash');

/**
 * email-designer.js controller
 *
 * @description: A set of functions called "actions" of the `email-designer` plugin.
 */

module.exports = {
  /**
   * Get layout design action.
   *
   * @return {Object}
   */
  getLayouts: async (ctx) => {
    const layouts = await strapi.plugin('email-designer').service('layout').findMany();
    console.log('layouts: ', layouts);

    ctx.send(layouts);
  },

  /**
   * Get layout design action.
   *
   * @return {Object}
   */
  getLayout: async (ctx) => {
    const layout = await strapi.plugin('email-designer').service('layout').findOne({ id: ctx.params.layoutId });
    ctx.send(layout);
  },

  /**
   * Delete layout design action.
   *
   * @return {Object}
   */
  deleteLayout: async (ctx) => {
    await strapi.plugin('email-designer').service('layout').delete({ id: ctx.params.layoutId });
    ctx.send({ removed: true });
  },

  /**
   * Save layout design action.
   *
   * @return {Object}
   */
  saveLayout: async (ctx) => {
    console.log(ctx.request.body);
    let { layoutId } = ctx.params;

    const { layoutReferenceId, import: importLayout } = ctx.request.body;

    if (importLayout === true) {
      if (!isNil(layoutReferenceId)) {
        const foundLayout = await strapi.plugin('email-designer').service('layout').findOne({
          layoutReferenceId,
        });

        if (!_.isEmpty(foundLayout)) {
          if (layoutId === 'new') return ctx.badRequest('Layout reference ID is already taken');

          // override the existing entry with imported data
          layoutId = foundLayout.id;
        } else {
          layoutId = 'new';
        }
      } else {
        layoutId = 'new';
      }
    }

    try {
      const layout =
        layoutId === 'new'
          ? await strapi.plugin('email-designer').service('layout').create(ctx.request.body)
          : await strapi.plugin('email-designer').service('layout').update({ id: layoutId }, ctx.request.body);

      ctx.send(layout || {});
    } catch (error) {
      ctx.badRequest(null, error);
    }
  },

  /**
   * Duplicate a layout.
   *
   * @return {Object}
   */
  duplicateLayout: async (ctx) => {
    if (_.isEmpty(ctx.params.sourceLayoutId)) {
      return ctx.badRequest('No source layout Id given');
    }

    const { __v, _id, id, updatedAt, createdAt, ...toClone } = await strapi
      .plugin('email-designer')
      .service('layout')
      .findOne({ id: ctx.params.sourceLayoutId });

    if (toClone) {
      return strapi
        .plugin('email-designer')
        .service('layout')
        .create({ ...toClone, name: `${toClone.name} copy`, layoutReferenceId: null });
    }
    return null;
  },
};
