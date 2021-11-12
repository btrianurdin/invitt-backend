import Config from "../config";

const link = (token: string) => `
  ${Config.resetPassworUrl}?token=${token}
`

const EmailTemplate = (email: string, token: string) => `
  <center>
    <div style="background-color: white;padding: 20px;font-family: Arial">
      <table>
        <tr>
          <td><img height="35" src="https://res.cloudinary.com/trianurdin/image/upload/v1634730528/invitt_assets/inviit_iqjt0k.png" alt="invitt logo" /></td>
        </tr>
        <tr>
          <td>
            <br />
            <h3>Halo, ${email.split("@")[0]}</h3>
            <p>Kamu baru saja meminta untuk melakukan perubahan password.</p>
            <p>Klik tombol di bawah ini untuk melanjutkan.</p>
            <div>
              <a href="${link(token)}" target="_blank" style="box-sizing: border-box;border-radius: 6px;text-decoration: none;text-align:center;color: white;background-color: #F037A5;padding: 15px 20px;display: inline-block;width: 100%"><b>Reset Password</b></a>
            </div>
            <p>Atau salin link berikut: </p>
            <div><a href="${link(token)}" target="_blank">${link(token)}</a></div>
          </td>
        </tr>
      </table>
    </div>
  </center>
`;

export default EmailTemplate;