
import { Request, Response } from 'express';
import { settingsService } from '../services/settingsService';

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await settingsService.getSettings();
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la récupération des paramètres' });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const settings = await settingsService.updateSettings(req.body);
    res.json({
      success: true,
      data: settings,
      message: 'Paramètres mis à jour avec succès'
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour des paramètres' });
  }
};
