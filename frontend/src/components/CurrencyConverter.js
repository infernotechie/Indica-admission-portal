// components/CurrencyConverter.js
import React, { useEffect } from 'react';

const CurrencyConverter = () => {
  useEffect(() => {
    // Load OANDA script dynamically
    const script = document.createElement('script');
    script.src = "https://www.oanda.com/embedded/converter/get/b2FuZGFsYWN1c2VyLy9kZWZhdWx0/?lang=en";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="oanda_ecc" style={{ marginTop: '16px' }}>
      <span style={{ fontSize: '9px', color: '#000' }}>
        Currency Converter <a id="oanda_cc_link" style={{ color: '#000', fontSize: '9px' }} href="https://www.oanda.com/currency/converter/">by OANDA</a>
      </span>
    </div>
  );
};

export default CurrencyConverter;
