export interface IInitializeable {

  /**
   * The pre-initialization stage
   */
  preInitialize(): Promise<void>;

  /**
   * The initialization stage
   */
  initialize(): Promise<void>;

  /**
   * The post-initialization stage
   */
  postInitialize(): Promise<void>;

}