import { AgioCoreModule } from './agio-core.module';

describe('AgioCoreModule', () => {
  let agioCoreModule: AgioCoreModule;

  beforeEach(() => {
    agioCoreModule = new AgioCoreModule();
  });

  it('should create an instance', () => {
    expect(agioCoreModule).toBeTruthy();
  });
});
