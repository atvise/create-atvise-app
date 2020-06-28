/*
 * This file was automatically generated from the json schema at
 * 'package/atvise-scripts/atviserc.schema.json'.
 *
 * Do not modify it directly, instead update the schema and run
 * 'node scripts/update-config-definition' to re-generated it.
 */

/**
 * A schema for .atviserc.json files.
 */
export interface Atviserc {
  /**
   * The host atvise server is running at
   */
  host?: string;
  /**
   * The ports atvise server is listening at
   */
  port?: {
    /**
     * atvise server's OPC-UA port
     */
    opc?: number;
    /**
     * atvise server's HTTP port
     */
    http?: number;
  };
  /**
   * Configuration for 'atvise-scripts deploy'
   */
  deploy?: {
    /**
     * The files to deploy
     */
    outPath?: string | string[];
  };
}
