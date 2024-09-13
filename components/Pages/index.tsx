import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';

export default p => Component(p, Page);

const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles

  return (
    <div style={{ 
      direction: "rtl", 
      minHeight: "10vh",
      minWidth: "60vh",
      backgroundImage: "url('/t.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
    }}>
      <br-x />

      <Window 
        title={
          <div style={{
            fontSize: "2em",
            padding: "6px",
            borderRadius: "10px",
            color: "#ffffff",
            backgroundColor: "gray", 
            textAlign: "center",
          }}>Tether(USD)</div>
        } 
        
      
        
        style={{ 
          minHeight: 500,  
          width: "calc(40% - 40px)", 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(7px)",
          borderRadius: "15px",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <br/>
        <div style={{
          width: "80%", 
          height: "100px", 
          backgroundColor: "hsla(48.42 31.84% 35.1% / 0.7) ",
          borderRadius: "40px",
          textAlign: "center",
          fontSize: "1.5em",
          color: "#fff",          
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}>price: {(props.p.price as number).toLocaleString("eng-UK")}</div>

        <div style={{
          width: "80%", 
          height: "100px", 
          backgroundColor: "Charcoal", 
          borderRadius: "40px",
          textAlign: "center",
          fontSize: "1.5em",
          color: "#fff",          
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}>last 24h: { "%" +(parseFloat(props.p.diff24d) as number).toLocaleString("eng-UK")}</div>

        <div style={{
          width: "80%", 
          height: "100px", 
          backgroundColor: "hsla(60 22% 19.61% / 0.62)   ",
          borderRadius: "40px",
          textAlign: "center",
          fontSize: "1.5em",
          color: "#fff",          
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}>last 7d: { "%" +(parseFloat(props.p.diff7d) as number).toLocaleString("eng-UK")}</div>

        <div style={{
          width: "80%", 
          height: "100px", 
          backgroundColor: "hsl(0 0.48% 40.59%) ", 
          borderRadius: "40px",
          textAlign: "center",
          fontSize: "1.5em",
          color: "#fff",          
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>last 30d: { "%" +(parseFloat(props.p.diff30d) as number).toLocaleString("eng-UK")}</div>
      </Window>

      <div style={{
  position: "fixed",
  top: "10px",
  left: "0px",
  width: "120px", 
  height: "auto"
}}>
  <img src="/pioneears_logo.png" alt="pioneears Logo" style={{ width: "100%", height: "auto" }} />
</div>


  

    </div>
  );
}

export async function getServerSideProps(context) {

  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://api.tetherland.com/currencies")
  let data = await res.json()
  let p = data.data.currencies.USDT
  console.log("price", p)

  return {
    props: {
      data: global.QSON.stringify({
        p,
        session,
      })
    },
  }
}
