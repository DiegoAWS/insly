import React, { useState } from 'react'

function LocalTimer() {
  const dateTimeRef = React.useRef(null);
  const [showOverPrice, setShowOverPrice] = useState(false)

  React.useEffect(() => {

    const secondsTimer = setInterval(() => {

      if (dateTimeRef.current) {

        const currentDate = new Date();
        const currentHours = currentDate.getHours();
        const currentWeekDay = currentDate.getDay();
        if (currentWeekDay === 5 && currentHours >= 15 && currentHours < 20) {
          setShowOverPrice(true)
        }
          dateTimeRef.current.innerText = currentDate.toLocaleString();

        }
      }, 1000);
    return () => clearInterval(secondsTimer);
  }, [dateTimeRef]);

  return <>
    {
      showOverPrice && <span className="overprice">Friday from 17:00 to 20:00 - 13% base policy price!!!</span>
    }
    <span ref={dateTimeRef} />
  </>;
}

export default LocalTimer