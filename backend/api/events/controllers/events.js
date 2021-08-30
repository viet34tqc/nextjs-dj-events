const { sanitizeEntity } = require("strapi-utils");

("use strict");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Get events of logged in user
  async me(ctx) {
    // Get the user first
    const user = ctx.state.user;
    if (!user) {
      return ctx.badRequest(null, [
        { message: [{ id: "No authorization header was found" }] },
      ]);
    }

    // Then find all the events that belongs to this user
    const events = await strapi.services.events.find({ users_permissions_user: user.id });

    if (!events) {
      return ctx.notFound();
    }
    return sanitizeEntity(events, { model: strapi.models.events });
  },
};
