// Markery
export const getCenterIcon = () => {
    if (typeof window === 'undefined') return null;
    const L = require('leaflet');
  
    return new L.DivIcon({
      className: '',
      html: `
        <div style="
          width: 16px;
          height: 16px;
          background: #FFFFFF;
          border: 2px solid #000;
          border-radius: 50%;
          transform: translate(-50%, -50%);
        "></div>
      `,
    });
  };
  
  export const getTriangleIcon = (rating: number, highlight: boolean = false) => {
    if (typeof window === 'undefined') return null;
  
    const L = require('leaflet');
    let color = '';
  
    if (rating >= 4) {
      color = '#FF5733'; // Czerwony
    } else if (rating >= 3) {
      color = '#FFC300'; // Pomarańczowy
    } else if (rating >= 2) {
      color = '#3498DB'; // Niebieski
    } else {
      color = '#2ECC71'; // Zielony
    }
  
    const boxShadow = highlight
      ? 'box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6);'
      : '';
  
    return new L.DivIcon({
      className: '',
      html: `
        <div style="
          position: relative;
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-top: 30px solid ${color};
          transform: translate(-50%, -50%);
          ${boxShadow}
        ">
          <div style="
            position: absolute;
            top: -8px;
            left: -12px;
            width: 24px;
            height: 8px;
            background: ${color};
            border-radius: 50% 50% 0 0;
            border: 2px solid #FFFFFF;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          "></div>
        </div>
      `,
    });
  };