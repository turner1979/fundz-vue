export class FdzTokenService {
  generateToken () {
    return Math.random().toString(36).substr(2)
  }
}
