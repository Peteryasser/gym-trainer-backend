import { Controller, Post, Req, Res } from '@nestjs/common';
const { user_forgotPassword, user_resetPassword, user_add, user_changePassword } = require('../controller/user_controller');


@Controller('user')
export class RoutesController {
  @Post('/add')
  async addUser(@Req() req, @Res() res) {
    console.log("add");
    const result = await user_add(req.body.email, req.body.name, req.body.password);
    console.log(result);
    return res.json(result); 
  }

  @Post('/forgetPassword')
  async forgetPassword(@Req() req, @Res() res) {
    console.log("forget");
    const result = await user_forgotPassword(req.body.email);
    return res.json(result)
  }

  @Post('/resetPassword')
  async resetPassword(@Req() req, @Res() res) {
    console.log("reset");
    const result = await user_resetPassword(req.body.otp, req.body.password,req.body.confirmPassword);
    return res.json(result)
  }

  @Post('/changePassword')
  async changePassword(@Req() req, @Res() res) {
    console.log("change");
    const result = await user_changePassword(req.body.id,req.body.oldPassword, req.body.password,req.body.confirmPassword);
    return res.json(result)
  }



}

