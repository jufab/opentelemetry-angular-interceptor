import { TestBed } from '@angular/core/testing';
import { ZipkinExporterService } from './zipkin-exporter.service';
import { OTELCOL_CONFIG } from '../../../configuration/opentelemetry-config';
import { zipkinConfig, zipkinOtherConfig } from '../../../../../__mocks__/data/config.mock';
import { ExporterConfig, ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { mocked } from 'ts-jest/utils';

jest.mock('@opentelemetry/exporter-zipkin');

describe('ZipkinExporterService', () => {
  let zipkinExporterService: ZipkinExporterService;
  const mockedZipkinExporter = mocked(ZipkinExporter, true);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ZipkinExporterService,
        { provide: OTELCOL_CONFIG, useValue: zipkinConfig },
      ]
    });
    zipkinExporterService = TestBed.inject(ZipkinExporterService);
    mockedZipkinExporter.mockClear();
  });

  it('should be created', () => {
    expect(zipkinExporterService).toBeTruthy();
  });

  it('should generate a zipkinExporter', () => {
    const exporter = zipkinExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(ZipkinExporter);
    const mockedZipkinConfig: ExporterConfig = mockedZipkinExporter.mock.calls[0][0];
    expect(mockedZipkinConfig.url).toEqual('http://localhost');
    expect(mockedZipkinConfig.headers).toEqual({ test: 'test' });
  });

  it('should generate an other zipkinExporter', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        ZipkinExporterService,
        { provide: OTELCOL_CONFIG, useValue: zipkinOtherConfig },
      ]
    });
    zipkinExporterService = TestBed.inject(ZipkinExporterService);
    const exporter = zipkinExporterService.getExporter();
    expect(exporter).not.toBeNull();
    expect(exporter).toBeInstanceOf(ZipkinExporter);
    const mockedZipkinConfig: ExporterConfig = mockedZipkinExporter.mock.calls[0][0];
    expect(mockedZipkinConfig.headers).toBeUndefined();
    expect(mockedZipkinConfig.url).toBeUndefined();
  });

});
