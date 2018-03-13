export const pressure = {
    name: 'Pressure',
    units: {
        'Pa'   : [1],
        'bar'  : [1e-5],
        'mbar' : [1e-2],
        'Torr' : [760 / 101325],
        'mTorr': [760000 / 101325],
        'psi'  : [0.0254 * 0.0254 / 0.453592 / 9.80665],
        'inHg' : [760 / 101325 / 25.4],
    },
};
