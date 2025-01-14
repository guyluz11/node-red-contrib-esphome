import {NodeAPI} from 'node-red';
import express from 'express';
import {discovery} from '../lib/utils';

module.exports = (RED: NodeAPI) => {
  const NODE_PATH = '/esphome/';

  RED.httpAdmin.post(NODE_PATH + 'discovery', async (req: express.Request, res: express.Response) => {
    discovery()
      .then((devices: Array<object>) => {
        res.json(devices);
      })
      .catch((e: Error) => {
        res.json(e);
      });
  });

  RED.httpAdmin.post(NODE_PATH + 'entities', async (req: express.Request, res: express.Response) => {
    const deviceNode = RED.nodes.getNode(req.body.deviceNode) as any;

    if (deviceNode) {
      res.json(deviceNode.entities);
    } else {
      res.json([]);
    }
  });
};
