'use strict';

let path = require('path');
let organiser = require('../../models/organiser');

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
        this.index();
      }
      else {
        console.log('[ADMIN] Organiser delete error', err);
      }
    });
  }

  create(req, res) {
    console.log('[ADMIN] Organiser Create');

    let Organiser = organiser.getMongooseModel();

    let org = new Organiser({
      id: req.body.id,
      name: req.body.name,
      twitterHandle: req.body.twitterHandle,
      logoURL: req.body.logoURL,
      website: req.body.website,
      apiURL: null
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

      org.save(function (err, updatedOrg) {
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
