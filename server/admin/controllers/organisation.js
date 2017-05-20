'use strict';

let path = require('path');
let organiser = require('../../models/organiser');

/** A class represting the Admin Organisation uController */
class AdminOrganisationController {
  constructor() {

  }

  index(req, res) {
    console.log('[ADMIN] Organiser Index');
    organiser.getDatabasePromise('organisers').then((data) => {
      res.render(path.resolve(__dirname + '/../views/organisations/index'), {
        organisations: data.organisers
      });
    });
  }

  show(req, res) {
    console.log('[ADMIN] Organiser Show ', req.params.id);

    organiser.getMongooseModel().findOne({ 'id': req.params.id }, function (err, org) {
      if (err) {return;}

      res.render(path.resolve(__dirname + '/../views/organisations/show'), {
        organisation: org
      });
    });
  }

  new(req, res) {
    console.log('[ADMIN] Organiser new ');

    res.render(path.resolve(__dirname + '/../views/organisations/new'));
  }

  delete(req, res) {
    console.log('[ADMIN] Organiser delete ', req.params.id);

    let Organiser = organiser.getMongooseModel();

    Organiser.remove({ 'id': req.params.id}, function(err) {
      if (!err) {
        res.writeHead(302, {'Location': '/admin/organisations'});
        res.end();
      }
      else {
        console.log('[ADMIN] Organiser delete error', err);
      }
    });
  }

  create(req, res) {
    console.log('[ADMIN] Organiser Create');

    let Organiser = organiser.getMongooseModel();

    let apiURL = null;
    if (req.body.source === 'eventbrite') {
      apiURL = `https://www.eventbriteapi.com/v3/organizers/${req.body.id}/events/?status=live&order_by=start_desc`;
    }

    let org = new Organiser({
      id: req.body.id,
      name: req.body.name,
      twitterHandle: req.body.twitterHandle,
      logoURL: req.body.logoURL,
      website: req.body.website,
      apiURL: apiURL
    });

    let result = 'sucess';
    org.save(err => {
      if (err) {
        console.log(err);
        res.render(path.resolve(__dirname + '/../views/organisations/edit'), {
          organisation: org
        });
      } else {
        res.render(path.resolve(__dirname + '/../views/organisations/show/'), {
          organisation: org
        });
      }
    });
  }

  update(req, res) {
    console.log('[ADMIN] Organiser Update ', req.params.id);

    organiser.getMongooseModel().findOne({ 'id': req.params.id }, function (err, org) {
      if (err) {return;}

      org.id = req.body.id;
      org.name = req.body.name;
      org.twitterHandle = req.body.twitterHandle;
      org.logoURL = req.body.logoURL;
      org.website = req.body.website;
      org.apiURL = req.body.apiURL;

      org.save((err, updatedOrg) => {
        if (err) {return;}

        res.render(path.resolve(__dirname + '/../views/organisations/show'), {
          organisation: updatedOrg
        });
      });
    });
  }

  edit(req, res) {
    console.log('[ADMIN] Organiser Edit');

    organiser.getMongooseModel().findOne({ 'id': req.params.id }, function (err, org) {
      if (err) {return;}

      res.render(path.resolve(__dirname + '/../views/organisations/edit'), {
        organisation: org
      });
    });
  }
}

module.exports = new AdminOrganisationController();
